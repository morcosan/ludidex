import { PageSection } from '@app-shared/components'
import { USER_DATA_COOKIE_KEY, type UserData, useUserDataStore } from '@app-shared/state/use-user-data'
import { getDateAsYYYYMMDD } from '@app-shared/utils/various'
import { Button, wait } from '@design-system'
import { CircleCheckIcon, CircleXIcon, CloudDownloadIcon, CloudUploadIcon } from 'lucide-react'
import { type ChangeEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DataImportModal } from './_partials/data-import-modal'
import { type SectionProps } from './types'

interface Message {
  type: 'error' | 'success'
  text: string
}

const EMPTY_USER_DATA: UserData = { genshin: { characters: {} } }

const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value)

const isUserData = (value: unknown): value is UserData => {
  if (!isRecord(value)) return false

  const genshin = value.genshin
  if (!isRecord(genshin) || !isRecord(genshin.characters)) return false

  const isOptionalNumberRecord = (record: Record<string, unknown>, keys: string[]) =>
    keys.every((key) => record[key] === undefined || typeof record[key] === 'number')

  const isCharacterUserData = (character: unknown) => {
    if (!isRecord(character)) return false
    if (character.likeScore !== undefined && typeof character.likeScore !== 'number') return false

    const numberFields = {
      tierScores: ['mainDps', 'subDps', 'support', 'exploration', 'outfit', 'personality'],
      stats: ['level', 'hp', 'atk', 'def', 'critDmg', 'critRate', 'elemDmg', 'em', 'er'],
      talents: ['conLv', 'attackLv', 'skillLv', 'burstLv'],
    } as const

    for (const [key, fields] of Object.entries(numberFields)) {
      const record = character[key]
      if (record !== undefined && (!isRecord(record) || !isOptionalNumberRecord(record, [...fields]))) return false
    }

    return (
      character.tags === undefined ||
      (Array.isArray(character.tags) && character.tags.every((tag) => typeof tag === 'string'))
    )
  }

  return Object.values(genshin.characters).every(isCharacterUserData)
}

export const DataSection = ({ id, title, className }: SectionProps) => {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const replaceUserData = useUserDataStore((state) => state.replaceUserData)
  const [importData, setImportData] = useState<UserData | null>(null)
  const [currentData, setCurrentData] = useState<UserData>(EMPTY_USER_DATA)
  const [exportMessage, setExportMessage] = useState<Message | null>(null)
  const [importMessage, setImportMessage] = useState<Message | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleClickExport = async () => {
    setIsExporting(true)
    setExportMessage(null)
    try {
      await wait(2000) // Fake download delay
      const data = localStorage.getItem(USER_DATA_COOKIE_KEY)
      if (!data) throw null
      const now = new Date()
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `ludidex-data-${getDateAsYYYYMMDD(now)}-${now.getTime()}.json`
      link.click()
      setTimeout(() => URL.revokeObjectURL(url), 0)
      setExportMessage({ type: 'success', text: t('general.status.dataExported') })
    } catch {
      setExportMessage({ type: 'error', text: t('general.status.dataExportFailed') })
    } finally {
      setIsExporting(false)
    }
  }

  const handleSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setImportMessage(null)
    setIsImporting(true)

    try {
      const parsed = JSON.parse(await file.text())
      if (!isUserData(parsed)) {
        setImportMessage({ type: 'error', text: t('general.status.invalidDataFile') })
        return
      }
      const stored = localStorage.getItem(USER_DATA_COOKIE_KEY)
      const current = stored ? JSON.parse(stored) : {}
      setCurrentData(isUserData(current) ? current : EMPTY_USER_DATA)
      setImportData(parsed)
    } catch {
      setImportMessage({ type: 'error', text: t('general.status.invalidDataFile') })
    }
  }

  const handleConfirmImport = async () => {
    if (!importData) return
    setIsProcessing(true)
    try {
      await wait(1000) // Fake processing delay
      replaceUserData(importData)
      setImportData(null)
      setImportMessage({ type: 'success', text: t('general.status.dataImported') })
    } catch {
      setImportMessage({ type: 'error', text: t('general.status.dataImportFailed') })
    }
  }

  const handleCloseModal = () => {
    setImportData(null)
    setIsImporting(false)
    setIsProcessing(false)
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
        onChange={handleSelectFile}
      />

      <DataImportModal
        importData={importData}
        currentData={currentData}
        loading={isProcessing}
        onClose={handleCloseModal}
        onClosed={handleCloseModal}
        onConfirm={handleConfirmImport}
      />
    </PageSection>
  )
}
