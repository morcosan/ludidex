import { type DisplaySize } from '@app-shared/state/use-user-settings'
import { Button, SelectField, type SelectOption } from '@design-system'
import { useTranslation } from 'react-i18next'
import { type View, type ViewOption } from './use-view-options'

interface SideFiltersProps extends ReactProps {
  view: View
  viewOptions: ViewOption[]
  displaySize: DisplaySize
  onChangeView: (view: View) => void
  onChangeDisplaySize: (size: DisplaySize) => void
}

export const SideFilters = (props: SideFiltersProps) => {
  const { displaySize, view, viewOptions, className, onChangeDisplaySize, onChangeView } = props
  const { t } = useTranslation()

  const sectionClass = cx('text-size-xs pb-xs-3 text-color-text-subtle tracking-wider uppercase')

  const displaySizeOptions: SelectOption[] = [
    { value: 'small', label: t('general.label.small') },
    { value: 'medium', label: t('general.label.medium') },
    { value: 'large', label: t('general.label.large') },
  ]

  return (
    <div className={cx('px-xs-8 py-xs-4 gap-y-sm-5 flex flex-col', className)}>
      {/* VIEW TYPE */}
      <div className="divide-color-border-on-glass flex flex-col divide-y">
        <div className={sectionClass}>{t('general.label.view')}</div>

        <div className="gap-xs-0 py-xs-3 flex flex-col">
          {viewOptions.map(({ value, label, icon }) => (
            <Button
              key={value}
              variant="menu-default"
              size="md"
              state={view === value ? 'selected' : 'active'}
              className="w-full"
              onClick={() => onChangeView(value)}
            >
              <span className="mr-xs-2 w-sm-0 flex-center flex">{icon}</span>
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* VIEW SETTINGS */}
      <div className="divide-color-border-on-glass min-h-md-5 flex flex-col divide-y">
        <div className={sectionClass}>{t('general.label.viewSettings')}</div>

        <div className="gap-xs-2 py-xs-3 flex items-center justify-between">
          {/* DISPLAY SIZE */}
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
      </div>
    </div>
  )
}
