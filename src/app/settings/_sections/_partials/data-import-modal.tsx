import { Button, Modal } from '@design-system'
import { useTranslation } from 'react-i18next'

export type UserData = Record<string, unknown>

interface DataSummary {
  characters: number
  keys: number
  size: number
}


interface DataImportModalProps {
  importData: UserData | null
  currentData: UserData
  isLoading: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
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

export const DataImportModal = ({
  importData,
  currentData,
  isLoading,
  onClose,
  onConfirm,
}: DataImportModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal
      opened={importData !== null}
      title={t('general.label.importData')}
      width="lg"
      onClose={onClose}
      actions={
        <Button onClick={onConfirm} state={isLoading ? 'loading' : 'active'}>
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
  )
}