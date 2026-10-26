import { PageSection } from '@app-shared/components'
import { type DisplaySize } from '@app-shared/state/types'
import { Button, SelectField, type SelectOption } from '@design-system'
import { useTranslation } from 'react-i18next'
import { type ViewOption, type ViewType } from './use-view-options'

interface SideFiltersProps extends ReactProps {
  viewType: ViewType
  viewOptions: ViewOption[]
  displaySize: DisplaySize
  onChangeView: (viewType: ViewType) => void
  onChangeDisplaySize: (size: DisplaySize) => void
}

export const SideFilters = (props: SideFiltersProps) => {
  const { displaySize, viewType, viewOptions, className, onChangeDisplaySize, onChangeView } = props
  const { t } = useTranslation()

  const displaySizeOptions: SelectOption[] = [
    { value: 'small', label: t('general.label.small') },
    { value: 'medium', label: t('general.label.medium') },
    { value: 'large', label: t('general.label.large') },
  ]

  return (
    <div className={cx('px-xs-8 py-xs-4 gap-y-sm-5 flex flex-col', className)}>
      {/* VIEW TYPES */}
      <PageSection title={t('general.label.view')} bodyClassName="gap-xs-0">
        {viewOptions.map(({ value, label, icon }) => (
          <Button
            key={value}
            variant="menu-default"
            size="md"
            state={viewType === value ? 'selected' : 'active'}
            className="w-full"
            onClick={() => onChangeView(value)}
          >
            <span className="mr-xs-2 w-sm-0 flex-center flex">{icon}</span>
            {label}
          </Button>
        ))}
      </PageSection>

      {/* VIEW SETTINGS */}
      <PageSection title={t('general.label.viewSettings')} className="min-h-md-5">
        {/* DISPLAY SIZE */}
        <div className="gap-xs-2 flex items-center justify-between">
          <span className="text-size-sm">{t('general.label.displaySize')}</span>
          <SelectField
            id="characters-display-size"
            size="sm"
            value={displaySize}
            options={displaySizeOptions}
            className="w-md-4"
            onChange={(value) => value && onChangeDisplaySize(value as DisplaySize)}
          />
        </div>
      </PageSection>
    </div>
  )
}
