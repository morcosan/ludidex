import { AppearanceSection, FiltersSection, type Filters } from '@app-shared/components'
import { type ViewOption } from '@app-shared/utils/use-view-options'
import { ViewsSection } from '../../_shared/views-section'
import { type CharacterViewType } from './config'

interface SideFiltersProps extends ReactProps {
  filters: Filters
  otherFilters?: Filters
  viewType: CharacterViewType
  viewOptions: readonly ViewOption<CharacterViewType>[]
  onChangeFilters: (filters: Filters) => void
  onChangeView: (viewType: CharacterViewType) => void
}

export const SidePanel = (props: SideFiltersProps) => {
  const { filters, otherFilters, viewType, viewOptions, className, onChangeFilters, onChangeView } = props

  return (
    <div className={cx('px-xs-8 py-xs-4 gap-y-sm-5 flex flex-col', className)}>
      <FiltersSection filters={filters} otherFilters={otherFilters} onChange={onChangeFilters} />

      <ViewsSection viewType={viewType} viewOptions={viewOptions} onChangeView={onChangeView} />

      <AppearanceSection type="characters" className="pb-sm-9" />
    </div>
  )
}
