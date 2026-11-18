import { AppearanceSection, FiltersSection, type Filters } from '@app-shared/components'
import { type ViewOption, type ViewType } from '@app-shared/utils/use-view-options'
import { ViewsSection } from './views-section'

interface SidePanelProps<T extends ViewType> extends ReactProps {
  type: 'characters' | 'teams' | 'domains'
  filters: Filters
  otherFilters?: Filters
  viewType?: T
  viewOptions?: readonly ViewOption<T>[]
  onChangeFilters?: (filters: Filters) => void
  onChangeView?: (viewType: T) => void
}

export const SidePanel = <T extends ViewType>(props: SidePanelProps<T>) => {
  const { type, filters, otherFilters, className, onChangeFilters, onChangeView } = props

  return (
    <div className={cx('px-xs-8 py-xs-4 gap-y-sm-5 flex flex-col', className)}>
      <FiltersSection type={type} filters={filters} otherFilters={otherFilters} onChange={onChangeFilters} />

      {props.viewOptions && props.viewType !== undefined && (
        <ViewsSection viewType={props.viewType} viewOptions={props.viewOptions} onChangeView={onChangeView} />
      )}

      <AppearanceSection type={type} className={type === 'characters' ? 'pb-sm-9' : 'min-h-md-5'} />
    </div>
  )
}
