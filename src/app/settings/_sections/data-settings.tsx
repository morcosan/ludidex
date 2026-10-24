import { useUserDataStore } from '@app-shared/state/use-user-data'
import { Button } from '@design-system'
import { CloudDownloadIcon, CloudUploadIcon } from 'lucide-react'
import { type ChangeEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DataImportModal, type UserData } from './_partials/data-import-modal'

const USER_DATA_STORAGE_KEY = 'app-user-data'

interface Message {
  type: 'error' | 'success'
  text: string
}

const getDateStamp = (date: Date): string =>
  [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-')

const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value)

const isUserData = (value: unknown): value is UserData => {
  if (!isRecord(value)) return false

  const genshin = value.genshin
  if (!isRecord(genshin) || !isRecord(genshin.characters)) return false
  return Object.values(genshin.characters).every(isRecord)
}

export const DataSettings = () => {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const loadUserData = useUserDataStore((state) => state.loadUserData)
  const [importData, setImportData] = useState<UserData | null>(null)
  const [currentData, setCurrentData] = useState<UserData>({})
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const handleClickExport = () => {
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
    <div className="gap-xs-3 flex flex-col">
      <div className="gap-xs-9 flex">
        <Button variant="menu-default" size="lg" className="w-fit" onClick={handleClickExport}>
          <CloudDownloadIcon aria-hidden className="h-xs-9 mr-xs-1" />
          {t('general.action.exportData')}
        </Button>

        {error && (
          <p role="alert" className="mt-xs-3">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="mt-xs-3">
            {notice}
          </p>
        )}
      </div>

      <div className="gap-xs-9 flex">
        <Button variant="menu-default" size="lg" className="w-fit" onClick={() => fileInputRef.current?.click()}>
          <CloudUploadIcon aria-hidden className="h-xs-9 mr-xs-1" />
          {t('general.action.importData')}
        </Button>

        {error && (
          <p role="alert" className="mt-xs-3">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="mt-xs-3">
            {notice}
          </p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        aria-label={t('general.action.importData')}
        onChange={selectImportFile}
      />

      <DataImportModal
        importData={importData}
        currentData={currentData}
        onClose={() => setImportData(null)}
        onConfirm={confirmImport}
      />
    </div>
  )
}
