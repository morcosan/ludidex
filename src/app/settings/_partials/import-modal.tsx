import { EMPTY_USER_DATA, type UserData } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { formatFileSize, getDataSize } from '@app-shared/utils/various'
import { Button, Modal } from '@design-system'
import { ArrowDownRightIcon, ArrowUpRightIcon, EqualApproximatelyIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface DataImportModalProps {
  opened: boolean
  loading: boolean
  importData: UserData | null
  onClose: () => void
  onClosed: () => void
  onConfirm: () => void | Promise<void>
}

const countDataValues = (value: unknown): number => {
  if (value === null || value === undefined) return 0
  if (typeof value !== 'object') return 1
  if (Array.isArray(value)) return value.reduce((count, item) => count + countDataValues(item), 0)
  return Object.values(value).reduce((count, child) => count + countDataValues(child), 0)
}

const getDataSummary = (data: UserData) => ({
  characters: Object.values(data.genshin?.characters ?? {}).filter((char) => countDataValues(char) > 0).length,
  preferences: countDataValues(data.preferences),
  values: countDataValues({ genshin: data.genshin }),
  size: getDataSize(data),
})

export const ImportModal = (props: DataImportModalProps) => {
  const { opened, loading, importData, onClose, onConfirm, onClosed } = props
  const { t } = useTranslation()
  const currentData = useUserDataStore((state) => state.userData) ?? EMPTY_USER_DATA
  const importSummary = importData ? getDataSummary(importData) : null
  const currentSummary = getDataSummary(currentData)

  const renderArrow = (diff: number) => {
    if (diff > 0) {
      return <ArrowUpRightIcon strokeWidth={3} aria-hidden className="h-xs-6 text-color-success-card-text" />
    }
    if (diff < 0) {
      return <ArrowDownRightIcon strokeWidth={3} aria-hidden className="h-xs-6 text-color-button-caution-text" />
    }
    return <EqualApproximatelyIcon aria-hidden className="h-xs-6 text-color-text-subtle" />
  }

  return (
    <Modal
      opened={opened}
      title={t('general.label.importData')}
      width="sm"
      actions={
        <Button variant="danger" state={loading ? 'loading' : 'active'} onClick={onConfirm}>
          {t('general.action.replaceData')}
        </Button>
      }
      onClose={onClose}
      onClosed={onClosed}
    >
      {importSummary && (
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-left">
              <th />
              <th className="w-md-3 pb-xs-3">{t('general.label.current')}</th>
              <th className="w-md-0" />
              <th className="w-md-3 pb-xs-3">{t('general.label.uploaded')}</th>
            </tr>
          </thead>
          <tbody className="divide-color-border-subtle divide-y">
            <tr>
              <td className="py-xs-2">{t('general.label.dataSize')}</td>
              <td className="py-xs-2">{formatFileSize(currentSummary.size)}</td>
              <td className="py-xs-2">{renderArrow(importSummary.size - currentSummary.size)}</td>
              <td className="py-xs-2">{formatFileSize(importSummary.size)}</td>
            </tr>
            <tr>
              <td className="py-xs-2">{t('general.label.dataValues')}</td>
              <td className="py-xs-2">{currentSummary.values}</td>
              <td className="py-xs-2">{renderArrow(importSummary.values - currentSummary.values)}</td>
              <td className="py-xs-2">{importSummary.values}</td>
            </tr>
            <tr>
              <td className="py-xs-2">{t('general.label.characters')}</td>
              <td className="py-xs-2">{currentSummary.characters}</td>
              <td className="py-xs-2">{renderArrow(importSummary.characters - currentSummary.characters)}</td>
              <td className="py-xs-2">{importSummary.characters}</td>
            </tr>
            <tr>
              <td className="py-xs-2">{t('general.label.preferences')}</td>
              <td className="py-xs-2">{currentSummary.preferences}</td>
              <td className="py-xs-2">{renderArrow(importSummary.preferences - currentSummary.preferences)}</td>
              <td className="py-xs-2">{importSummary.preferences}</td>
            </tr>
          </tbody>
        </table>
      )}
    </Modal>
  )
}
