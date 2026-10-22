import { type DisplaySize } from '@app-shared/state/use-user-settings'
import { Button, SelectField, type SelectOption } from '@design-system'
import { useTranslation } from 'react-i18next'
import { type ListView, type ListViewOption } from './use-list-view'

interface SideFiltersProps {
  listView: ListView
  listViewOptions: ListViewOption[]
  displaySize: DisplaySize
  onChangeListView: (viewType: ListView) => void
  onChangeDisplaySize: (size: DisplaySize) => void
}

export const SideFilters = (props: SideFiltersProps) => {
  const { displaySize, listView, listViewOptions, onChangeDisplaySize, onChangeListView } = props
  const { t } = useTranslation()

  const sectionClass = cx('text-size-xs pb-xs-3 text-color-text-subtle tracking-wider uppercase')

  const displaySizeOptions: SelectOption[] = [
    { value: 'small', label: t('general.label.small') },
    { value: 'medium', label: t('general.label.medium') },
    { value: 'large', label: t('general.label.large') },
  ]

  return (
    <div className="px-xs-8 py-xs-4 gap-y-sm-5 flex h-full flex-col overflow-y-auto">
      {/* VIEW TYPE */}
      <div className="flex flex-col">
        <div className={sectionClass}>{t('general.label.view')}</div>

        <div className="gap-xs-0 flex flex-col">
          {listViewOptions.map(({ value, label, icon }) => (
            <Button
              key={value}
              variant="menu-default"
              size="lg"
              state={listView === value ? 'selected' : 'active'}
              className="w-full"
              onClick={() => onChangeListView(value)}
            >
              <span className="mr-xs-2 w-sm-0 flex-center flex">{icon}</span>
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* VIEW SETTINGS */}
      <div className="divide-color-border-on-glass flex flex-col divide-y">
        <div className={sectionClass}>{t('general.label.viewSettings')}</div>

        <div className="gap-xs-2 py-xs-3 flex items-center justify-between">
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
