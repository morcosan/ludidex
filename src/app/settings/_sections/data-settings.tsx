import { Button, Modal } from '@design-system'
import { type ChangeEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUserDataStore } from '@app-shared/state/use-user-data'

const USER_DATA_STORAGE_KEY = 'app-user-data'
type UserData = Record<string, unknown>

interface DataSummary {
  characters: number
  keys: number
  size: number
}

const getDataSummary = (data: UserData): DataSummary => {
  let keys = 0
  let characters = 0

  const countKeys = (value: unknown): void => {
    if (!value || typeof value !== 'object') return
    if (Array.isArray(value)) {
      value.forEach(countKeys)
      return
    }

    const entries = Object.entries(value)
    keys += entries.length
    entries.forEach(([, child]) => countKeys(child))
  }

  const characterData = data.genshin
  const characterRecords =
    characterData && typeof characterData === 'object' && !Array.isArray(characterData)
      ? (characterData as Record<string, unknown>).characters
      : undefined

  if (characterRecords && typeof characterRecords === 'object' && !Array.isArray(characterRecords)) {
    characters = Object.values(characterRecords).filter(
      (character) => !!character && typeof character === 'object' && Object.keys(character).length > 0,
    ).length
  }

  countKeys(data)

  return {
    characters,
    keys,
    size: new TextEncoder().encode(JSON.stringify(data)).byteLength,
  }
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(1)} KB`
}

const getDateStamp = (date: Date): string =>
  [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join(
    '-',
  )

const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value)

const isUserData = (value: unknown): value is UserData => {
  if (!isRecord(value)) return false

  const genshin = value.genshin
  if (!isRecord(genshin) || !isRecord(genshin.characters)) return false
  return Object.values(genshin.characters).every(isRecord)
}

const Summary = ({ summary }: { summary: DataSummary }) => {
  const { t } = useTranslation()

  return (
    <dl className="gap-xs-3 flex flex-col">
      <div className="flex justify-between gap-xs-3">
        <dt>{t('general.label.charactersWithData')}</dt>
        <dd>{summary.characters}</dd>
      </div>
      <div className="flex justify-between gap-xs-3">
        <dt>{t('general.label.dataKeys')}</dt>
        <dd>{summary.keys}</dd>
      </div>
      <div className="flex justify-between gap-xs-3">
        <dt>{t('general.label.dataSize')}</dt>
        <dd>{formatSize(summary.size)}</dd>
      </div>
    </dl>
  )
}

export const DataSettings = () => {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const loadUserData = useUserDataStore((state) => state.loadUserData)
  const [importData, setImportData] = useState<UserData | null>(null)
  const [currentData, setCurrentData] = useState<UserData>({})
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const exportData = () => {
    setError('')
    setNotice('')

    try {
      const data = localStorage.getItem(USER_DATA_STORAGE_KEY)
      if (!data) throw new Error('No user data to export')
      const now = new Date()
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `ludidex-data-${getDateStamp(now)}-${now.getTime()}.json`
      link.click()
      setTimeout(() => URL.revokeObjectURL(url), 0)
      setNotice(t('general.status.dataExported'))
    } catch {
      setError(t('general.status.dataExportFailed'))
    }
  }

  const selectImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setError('')
    setNotice('')

    try {
      const parsed: unknown = JSON.parse(await file.text())
      if (!isUserData(parsed)) {
        setError(t('general.status.invalidDataFile'))
        return
      }

      const stored = localStorage.getItem(USER_DATA_STORAGE_KEY)
      const current: unknown = stored ? JSON.parse(stored) : {}
      setCurrentData(isRecord(current) ? current : {})
      setImportData(parsed)
    } catch {
      setError(t('general.status.invalidDataFile'))
    }
  }

  const confirmImport = () => {
    if (!importData) return

    try {
      localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(importData))
      loadUserData()

      setImportData(null)
      setNotice(t('general.status.dataImported'))
      setError('')
    } catch {
      setError(t('general.status.dataImportFailed'))
    }
  }

  return (
    <>
      <div className="gap-xs-4 flex flex-wrap">
        <Button onClick={exportData}>{t('general.action.exportData')}</Button>
        <Button variant="optional" onClick={() => fileInputRef.current?.click()}>
          {t('general.action.importData')}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          aria-label={t('general.action.importData')}
          onChange={selectImportFile}
        />
      </div>
      {error && <p role="alert" className="mt-xs-3">{error}</p>}
      {notice && <p role="status" className="mt-xs-3">{notice}</p>}

      <Modal
        opened={importData !== null}
        title={t('general.label.importData')}
        width="lg"
        onClose={() => setImportData(null)}
        actions={
          <Button onClick={confirmImport} state="active">
            {t('general.action.replaceData')}
          </Button>
        }
      >
        {importData && (
          <div className="gap-xs-5 grid grid-cols-1 md:grid-cols-2">
            <section className="gap-xs-3 flex flex-col">
              <h2>{t('general.label.currentData')}</h2>
              <Summary summary={getDataSummary(currentData)} />
            </section>
            <section className="gap-xs-3 flex flex-col">
              <h2>{t('general.label.newData')}</h2>
              <Summary summary={getDataSummary(importData)} />
            </section>
          </div>
        )}
      </Modal>
    </>
  )
}
