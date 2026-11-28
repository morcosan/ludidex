import { FiltersBar, ListHeader, type Filters } from '@app-shared/components'
import { type ViewOption, type ViewType } from '@app-shared/utils/use-view-options'
import { Button } from '@design-system'
import { type ReactNode } from 'react'
import { SidePanel } from './side-panel'

interface PageTemplateProps<T extends ViewType> extends ReactProps {
  type: 'characters' | 'teams' | 'domains'
  title: string
  itemCount: number
  filterCount: number
  topBarFilters: Filters
  sectionFilters: Filters
  search?: string
  viewLabel?: string
  viewType?: T
  viewOptions?: readonly ViewOption<T>[]
  tabOptions?: readonly { value: string; label: string }[]
  activeTab?: string
  leftSide: ReactNode
  rightSide: ReactNode
  onChangeFilters?: (filters: Filters) => void
  onChangeTab?: (value: string) => void
  onChangeView?: (viewType: T) => void
}

export const PageTemplate = <T extends ViewType>(props: PageTemplateProps<T>) => {
  const {
    filterCount,
    itemCount,
    leftSide,
    rightSide,
    search,
    sectionFilters,
    tabOptions,
    activeTab,
    title,
    topBarFilters,
    type,
    viewLabel,
    viewOptions,
    viewType,
    onChangeFilters,
    onChangeTab,
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

        <ListHeader
          title={title}
          itemCount={itemCount}
          viewLabel={viewLabel}
          filterCount={filterCount}
          search={search}
        />

        {tabOptions && tabOptions.length > 0 && (
          <div className="gap-xs-2 mb-xs-4 mt-sm-0 flex flex-wrap">
            {tabOptions.map((option) => (
              <Button
                key={option.value}
                size="sm"
                state={activeTab === option.value ? 'selected' : 'active'}
                onClick={() => onChangeTab?.(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        )}

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
