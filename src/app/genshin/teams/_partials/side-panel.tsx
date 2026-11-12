import { AppearanceSection, FiltersSection, type Filters } from '@app-shared/components'
import { type ViewOption } from '@app-shared/utils/use-view-options'
import { ViewsSection } from '../../_shared/views-section'
import { type TeamViewType } from './config'

interface SideFiltersProps extends ReactProps {
  filters: Filters
  otherFilters?: Filters
  viewType: TeamViewType
  viewOptions: readonly ViewOption<TeamViewType>[]
  onChangeFilters: (filters: Filters) => void
  onChangeView: (viewType: TeamViewType) => void
}

export const SidePanel = (props: SideFiltersProps) => {
  const { filters, otherFilters, viewType, viewOptions, className, onChangeFilters, onChangeView } = props

  return (
    <div className={cx('px-xs-8 py-xs-4 gap-y-sm-5 flex flex-col', className)}>
      <FiltersSection filters={filters} otherFilters={otherFilters} onChange={onChangeFilters} />

      <ViewsSection viewType={viewType} viewOptions={viewOptions} onChangeView={onChangeView} />

      <AppearanceSection type="teams" className="min-h-md-5" />
    </div>
  )
}
