import { FiltersBar, type Filters } from '@app-shared/components'
import { type ViewOption, type ViewType } from '@app-shared/utils/use-view-options'
import { type ReactNode } from 'react'
import { PageHeader } from './page-header'
import { SidePanel } from './side-panel'

interface PageTemplateProps<T extends ViewType> extends ReactProps {
  type: 'characters' | 'teams' | 'domains'
  title: string
  itemsCount: number
  filtersCount: number
  topBarFilters: Filters
  sectionFilters: Filters
  search?: string
  viewLabel?: string
  viewType?: T
  viewOptions?: readonly ViewOption<T>[]
  leftSide: ReactNode
  rightSide: ReactNode
  onChangeFilters?: (filters: Filters) => void
  onChangeView?: (viewType: T) => void
}

export const PageTemplate = <T extends ViewType>(props: PageTemplateProps<T>) => {
  const {
    filtersCount,
    itemsCount,
    leftSide,
    rightSide,
    search,
    sectionFilters,
    title,
    topBarFilters,
    type,
    viewLabel,
    viewOptions,
    viewType,
    onChangeFilters,
    onChangeView,
  } = props

  return (
    <div className="flex h-full">
      <div className="relative flex h-full flex-1 flex-col">
        <FiltersBar
          type={type}
          filters={topBarFilters}
          className="mb-xs-5 justify-between"
          onChange={onChangeFilters}
        />

        <PageHeader
          title={title}
          count={itemsCount}
          viewLabel={viewLabel}
          filtersCount={filtersCount}
          search={search}
        />

        {leftSide}
      </div>

      <div className="w-character-card mx-xs-3 relative h-full">
        <SidePanel
          type={type}
          filters={sectionFilters}
          otherFilters={topBarFilters}
          viewType={viewType}
          viewOptions={viewOptions}
          className="-mr-xs-3 pr-xs-3 h-full overflow-y-auto"
          onChangeFilters={onChangeFilters}
          onChangeView={onChangeView}
        />

        {rightSide}
      </div>
    </div>
  )
}
