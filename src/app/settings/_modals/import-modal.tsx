import { type UserData } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { EMPTY_USER_DATA } from '@app-shared/state/utils'
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

const getTagValues = (data: UserData): string[] => {
  return [
    ...Object.values(data.genshin?.teams ?? {}).flatMap((team) => team.tags ?? []),
    ...Object.values(data.genshin?.characters ?? {}).flatMap((character) => character?.tags ?? []),
  ].filter(Boolean)
}

const getDataSummary = (data: UserData) => {
  const characters = Object.values(data.genshin?.characters ?? {}).filter((char) => char !== undefined)
  const teams = Object.values(data.genshin?.teams ?? {}).filter((team) => team !== undefined)
  const domains = Object.values(data.genshin?.domains ?? {}).filter((domain) => domain !== undefined)
  const tagValues = getTagValues(data)

  return {
    size: getDataSize(data),
    values: countDataValues({ genshin: data.genshin }),
    tagValues: tagValues.length,
    notesValues: countDataValues([
      ...characters.map((char) => char.notes),
      ...teams.map((team) => team.notes),
      ...domains.map((domain) => domain.notes),
    ]),
    tierListValues: countDataValues([
      ...characters.map((char) => char.tierLists),
      ...teams.map((team) => team.tierLists),
    ]),
    statsValues: countDataValues(characters.map((char) => char.stats)),
    trialValues: countDataValues(teams.map((team) => team.trials)),
    uniqueChars: characters.filter((char) => countDataValues(char) > 0).length,
    uniqueTeams: teams.length,
    uniqueDomains: domains.length,
    uniqueTags: new Set(tagValues).size,
    preferences: countDataValues(data.preferences),
  }
}

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
              <td className="py-xs-2">{t('general.format.totalValues', { category: t('game.label.tags') })}</td>
              <td className="py-xs-2">{currentSummary.tagValues}</td>
              <td className="py-xs-2">{renderArrow(importSummary.tagValues - currentSummary.tagValues)}</td>
              <td className="py-xs-2">{importSummary.tagValues}</td>
            </tr>
            <tr>
              <td className="py-xs-2">{t('general.format.totalValues', { category: t('game.label.notes') })}</td>
              <td className="py-xs-2">{currentSummary.notesValues}</td>
              <td className="py-xs-2">{renderArrow(importSummary.notesValues - currentSummary.notesValues)}</td>
              <td className="py-xs-2">{importSummary.notesValues}</td>
            </tr>
            <tr>
              <td className="py-xs-2">{t('general.format.totalValues', { category: t('game.label.tierLists') })}</td>
              <td className="py-xs-2">{currentSummary.tierListValues}</td>
              <td className="py-xs-2">{renderArrow(importSummary.tierListValues - currentSummary.tierListValues)}</td>
              <td className="py-xs-2">{importSummary.tierListValues}</td>
            </tr>
            <tr>
              <td className="py-xs-2">{t('general.format.totalValues', { category: t('game.label.stats') })}</td>
              <td className="py-xs-2">{currentSummary.statsValues}</td>
              <td className="py-xs-2">{renderArrow(importSummary.statsValues - currentSummary.statsValues)}</td>
              <td className="py-xs-2">{importSummary.statsValues}</td>
            </tr>
            <tr>
              <td className="py-xs-2">{t('general.format.totalValues', { category: t('game.label.trials') })}</td>
              <td className="py-xs-2">{currentSummary.trialValues}</td>
              <td className="py-xs-2">{renderArrow(importSummary.trialValues - currentSummary.trialValues)}</td>
              <td className="py-xs-2">{importSummary.trialValues}</td>
            </tr>
            <tr>
              <td className="py-xs-2">{t('general.label.uniqueCharacters')}</td>
              <td className="py-xs-2">{currentSummary.uniqueChars}</td>
              <td className="py-xs-2">{renderArrow(importSummary.uniqueChars - currentSummary.uniqueChars)}</td>
              <td className="py-xs-2">{importSummary.uniqueChars}</td>
            </tr>
            <tr>
              <td className="py-xs-2">{t('general.label.uniqueTeams')}</td>
              <td className="py-xs-2">{currentSummary.uniqueTeams}</td>
              <td className="py-xs-2">{renderArrow(importSummary.uniqueTeams - currentSummary.uniqueTeams)}</td>
              <td className="py-xs-2">{importSummary.uniqueTeams}</td>
            </tr>
            <tr>
              <td className="py-xs-2">{t('general.label.uniqueDomains')}</td>
              <td className="py-xs-2">{currentSummary.uniqueDomains}</td>
              <td className="py-xs-2">{renderArrow(importSummary.uniqueDomains - currentSummary.uniqueDomains)}</td>
              <td className="py-xs-2">{importSummary.uniqueDomains}</td>
            </tr>
            <tr>
              <td className="py-xs-2">{t('general.label.uniqueTags')}</td>
              <td className="py-xs-2">{currentSummary.uniqueTags}</td>
              <td className="py-xs-2">{renderArrow(importSummary.uniqueTags - currentSummary.uniqueTags)}</td>
              <td className="py-xs-2">{importSummary.uniqueTags}</td>
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
