import { PageSection } from '@app-shared/components'
import { type ItemSize } from '@app-shared/state/types'
import { useUserSettingsStore } from '@app-shared/state/use-user-settings'
import { type ViewOption } from '@app-shared/utils/use-view-options'
import { SelectField, type SelectOption } from '@design-system'
import { useTranslation } from 'react-i18next'
import { ViewListing } from '../../_shared/view-listing'
import { type TeamViewType } from './config'

interface SideFiltersProps extends ReactProps {
  viewType: TeamViewType
  viewOptions: readonly ViewOption<TeamViewType>[]
  onChangeView: (viewType: TeamViewType) => void
}

export const SidePanel = (props: SideFiltersProps) => {
  const { viewType, viewOptions, className, onChangeView } = props
  const { t } = useTranslation()
  const userSettings = useUserSettingsStore((state) => state.userSettings)
  const updateUserSettings = useUserSettingsStore((state) => state.updateUserSettings)

  const itemSizeOptions: SelectOption<ItemSize>[] = [
    { value: 'sm', label: t('general.label.small') },
    { value: 'md', label: t('general.label.medium') },
    { value: 'lg', label: t('general.label.large') },
  ]

  return (
    <div className={cx('px-xs-8 py-xs-4 gap-y-sm-5 flex flex-col', className)}>
      {/* VIEW TYPES */}
      <ViewListing viewType={viewType} viewOptions={viewOptions} onChangeView={onChangeView} />

      {/* APPEARANCE */}
      <PageSection title={t('general.label.appearance')} className="min-h-md-5">
        {/* ITEM SIZE */}
        <div className="gap-xs-2 flex items-center justify-between">
          <span className="text-size-sm">{t('general.label.itemSize')}</span>
          <SelectField
            id="teams-item-size"
            size="sm"
            value={userSettings.teamItemSize}
            options={itemSizeOptions}
            className="w-md-4"
            onChange={(value) => value && updateUserSettings({ teamItemSize: value as ItemSize })}
          />
        </div>
      </PageSection>
    </div>
  )
}
