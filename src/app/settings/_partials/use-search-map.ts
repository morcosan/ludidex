import { type ParseKeys } from 'i18next'
import { useTranslation } from 'react-i18next'

const SECTION_TRANSLATION_KEYS: Record<string, ParseKeys[]> = {
  prefs: [
    //
    'general.action.editLabels',
    'general.label.ratingLabels',
    'general.label.preferences',
  ],
  data: [
    'general.action.download',
    'general.action.replaceData',
    'general.action.upload',
    'general.label.characters',
    'general.label.current',
    'general.label.dataExportImport',
    'general.label.dataSize',
    'general.label.dataValues',
    'general.label.exportData',
    'general.label.importData',
    'general.label.uploaded',
    'general.status.dataExportFailed',
    'general.status.dataExported',
    'general.status.dataImportFailed',
    'general.status.dataImported',
    'general.status.invalidDataFile',
  ],
}

export const useSearchMap = () => {
  const { t } = useTranslation()

  return Object.fromEntries(
    Object.entries(SECTION_TRANSLATION_KEYS).map(([sectionId, translationKeys]) => [
      sectionId,
      translationKeys.map((key) => t(key)),
    ]),
  )
}
