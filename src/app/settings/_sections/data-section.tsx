import { PageSection } from '@app-shared/components'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { Button, wait } from '@design-system'
import { CircleCheckIcon, CircleXIcon, CloudDownloadIcon, CloudUploadIcon } from 'lucide-react'
import { type ChangeEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DataImportModal, type UserData } from './_partials/data-import-modal'
import { type SectionProps } from './types'

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

export const DataSection = ({ id, title, className }: SectionProps) => {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const loadUserData = useUserDataStore((state) => state.loadUserData)
  const [importData, setImportData] = useState<UserData | null>(null)
  const [currentData, setCurrentData] = useState<UserData>({})
  const [exportMessage, setExportMessage] = useState<Message | null>(null)
  const [importMessage, setImportMessage] = useState<Message | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  const handleClickExport = async () => {
    setIsExporting(true)
    setExportMessage(null)
    try {
      await wait(2000) // Fake download delay
      const data = localStorage.getItem(USER_DATA_STORAGE_KEY)
      if (!data) throw null
      const now = new Date()
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `ludidex-data-${getDateStamp(now)}-${now.getTime()}.json`
      link.click()
      setTimeout(() => URL.revokeObjectURL(url), 0)
      setExportMessage({ type: 'success', text: t('general.status.dataExported') })
    } catch {
      setExportMessage({ type: 'error', text: t('general.status.dataExportFailed') })
    } finally {
      setIsExporting(false)
    }
  }

  const selectImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setImportMessage(null)
    setIsImporting(true)

    try {
      const parsed: unknown = JSON.parse(await file.text())
      if (!isUserData(parsed)) {
        setImportMessage({ type: 'error', text: t('general.status.invalidDataFile') })
        return
      }

      const stored = localStorage.getItem(USER_DATA_STORAGE_KEY)
      const current: unknown = stored ? JSON.parse(stored) : {}
      setCurrentData(isRecord(current) ? current : {})
      setImportData(parsed)
    } catch {
      setImportMessage({ type: 'error', text: t('general.status.invalidDataFile') })
    } finally {
      setIsImporting(false)
    }
  }

  const confirmImport = async () => {
    if (!importData) return

    setIsImporting(true)
    try {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
      localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(importData))
      loadUserData()

      setImportData(null)
      setImportMessage({ type: 'success', text: t('general.status.dataImported') })
    } catch {
      setImportMessage({ type: 'error', text: t('general.status.dataImportFailed') })
    } finally {
      setIsImporting(false)
    }
  }

  const renderMessage = (message: Message | null) => {
    const isError = message?.type === 'error'
    return (
      message && (
        <p
          role={isError ? 'alert' : 'status'}
          className={cx(
            'ml-xs-5 text-size-sm px-xs-3 py-xs-1 flex items-center rounded-sm',
            isError
              ? 'text-color-button-caution-text bg-color-button-caution-bg-press'
              : 'text-color-success-card-text bg-color-success-card-bg',
          )}
        >
          {isError ? (
            <CircleXIcon aria-hidden className="h-xs-8 mr-xs-0 -ml-xs-0" />
          ) : (
            <CircleCheckIcon aria-hidden className="h-xs-8 mr-xs-0 -ml-xs-0" />
          )}
          {message.text}
        </p>
      )
    )
  }

  return (
    <PageSection id={id} title={title} className={className} bodyClassName="pt-xs-5 min-h-lg-0 gap-xs-4 flex flex-col">
      <div className="flex items-center">
        <span>{t('general.label.exportData')}:</span>
        <Button className="ml-xs-3" state={isExporting ? 'loading' : 'active'} onClick={handleClickExport}>
          <CloudDownloadIcon aria-hidden className="h-xs-9 mr-xs-1" />
          {t('general.action.download')}
        </Button>
        {renderMessage(exportMessage)}
      </div>

      <div className="flex items-center">
        <span>{t('general.label.importData')}:</span>
        <Button
          className="ml-xs-3"
          state={isImporting ? 'loading' : 'active'}
          onClick={() => fileInputRef.current?.click()}
        >
          <CloudUploadIcon aria-hidden className="h-xs-9 mr-xs-1" />
          {t('general.action.upload')}
        </Button>
        {renderMessage(importMessage)}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        aria-label={t('general.action.upload')}
        onChange={selectImportFile}
      />

      <DataImportModal
        importData={importData}
        currentData={currentData}
        loading={isImporting}
        onClose={() => setImportData(null)}
        onConfirm={confirmImport}
      />
    </PageSection>
  )
}
