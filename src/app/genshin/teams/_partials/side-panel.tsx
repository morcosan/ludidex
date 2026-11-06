import { PageSection } from '@app-shared/components'
import { type ItemSize } from '@app-shared/state/types'
import { type ViewOption } from '@app-shared/utils/use-view-options'
import { SelectField, type SelectOption } from '@design-system'
import { useTranslation } from 'react-i18next'
import { ViewListing } from '../../_shared/view-listing'
import { type TeamViewType } from './config'

interface SideFiltersProps extends ReactProps {
  viewType: TeamViewType
  viewOptions: readonly ViewOption<TeamViewType>[]
  itemSize: ItemSize
  onChangeView: (viewType: TeamViewType) => void
  onChangeItemSize: (size: ItemSize) => void
}

export const SidePanel = (props: SideFiltersProps) => {
  const { itemSize, viewType, viewOptions, className, onChangeItemSize, onChangeView } = props
  const { t } = useTranslation()

  const itemSizeOptions: SelectOption[] = [
    { value: 'sm' satisfies ItemSize, label: t('general.label.small') },
    { value: 'md' satisfies ItemSize, label: t('general.label.medium') },
    { value: 'lg' satisfies ItemSize, label: t('general.label.large') },
  ]

  return (
    <div className={cx('px-xs-8 py-xs-4 gap-y-sm-5 flex flex-col', className)}>
      {/* VIEW TYPES */}
      <ViewListing viewType={viewType} viewOptions={viewOptions} onChangeView={onChangeView} />

      {/* VIEW SETTINGS */}
      <PageSection title={t('general.label.viewSettings')} className="min-h-md-5">
        {/* DISPLAY SIZE */}
        <div className="gap-xs-2 flex items-center justify-between">
          <span className="text-size-sm">{t('general.label.displaySize')}</span>
          <SelectField
            id="teams-item-size"
            size="sm"
            value={itemSize}
            options={itemSizeOptions}
            className="w-md-4"
            onChange={(value) => value && onChangeItemSize(value as ItemSize)}
          />
        </div>
      </PageSection>
    </div>
  )
}
