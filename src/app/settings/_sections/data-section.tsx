import { PageSection } from '@app-shared/components'
import { type UserData } from '@app-shared/state/types'
import { parseUserData, USER_DATA_COOKIE_KEY, useUserDataStore } from '@app-shared/state/use-user-data'
import { getDateAsYYYYMMDD, getTimeAsHHMMSS } from '@app-shared/utils/various'
import { Button, wait } from '@design-system'
import { CircleCheckIcon, CircleXIcon, CloudDownloadIcon, CloudUploadIcon } from 'lucide-react'
import { type ChangeEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImportModal } from '../_partials/import-modal'
import { TextHighlight } from '../_partials/text-highlight'
import { type SectionProps } from '../_partials/types'

interface Message {
  type: 'error' | 'success'
  text: string
}

export const DataSection = (props: SectionProps) => {
  const { id, title, keyword, className } = props
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const replaceUserData = useUserDataStore((state) => state.replaceUserData)
  const [importData, setImportData] = useState<UserData | null>(null)
  const [exportMessage, setExportMessage] = useState<Message | null>(null)
  const [importMessage, setImportMessage] = useState<Message | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
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
      link.download = `ludidex-data--${getDateAsYYYYMMDD(now)}--${getTimeAsHHMMSS(now)}.json`
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
      const data = JSON.parse(await file.text())
      const parsed = parseUserData(data)
      setImportData(parsed)
      setIsModalOpen(true)
    } catch {
      await wait(1000) // Fake processing delay
      setImportData(null)
      setIsImporting(false)
      setImportMessage({ type: 'error', text: t('general.status.invalidDataFile') })
    }
  }

  const handleConfirmImport = async () => {
    if (!importData) return
    setIsProcessing(true)
    try {
      await wait(1000) // Fake processing delay
      replaceUserData(importData)
      setIsModalOpen(false)
      setImportMessage({ type: 'success', text: t('general.status.dataImported') })
    } catch {
      setImportMessage({ type: 'error', text: t('general.status.dataImportFailed') })
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsImporting(false)
    setIsProcessing(false)
  }

  const handleClosedModal = () => {
    setImportData(null)
    setIsModalOpen(false)
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
    <PageSection id={id} title={title} className={className} bodyClass="pt-xs-5 gap-xs-4 min-h-lg-0 flex flex-col">
      <div className="flex items-center">
        <TextHighlight text={t('general.label.exportData')} keyword={keyword} />:
        <Button state={isExporting ? 'loading' : 'active'} className="ml-xs-3" onClick={handleClickExport}>
          <CloudDownloadIcon aria-hidden className="h-xs-9 mr-xs-1" />
          <TextHighlight text={t('general.action.download')} keyword={keyword} />
        </Button>
        {renderMessage(exportMessage)}
      </div>

      <div className="flex items-center">
        <TextHighlight text={t('general.label.importData')} keyword={keyword} />:
        <Button
          state={isImporting ? 'loading' : 'active'}
          className="ml-xs-3"
          onClick={() => fileInputRef.current?.click()}
        >
          <CloudUploadIcon aria-hidden className="h-xs-9 mr-xs-1" />
          <TextHighlight text={t('general.action.upload')} keyword={keyword} />
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

      <ImportModal
        opened={isModalOpen}
        loading={isProcessing}
        importData={importData}
        onClose={handleCloseModal}
        onClosed={handleClosedModal}
        onConfirm={handleConfirmImport}
      />
    </PageSection>
  )
}
