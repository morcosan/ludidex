import { useFilters, type FiltersProps } from '../_shared/use-filters'

export type FiltersBarProps = FiltersProps

export const FiltersBar = (props: FiltersBarProps) => {
  const { filters, type, surface = 'glass', className, onChange } = props
  const { renderSearch, renderElements, renderStatuses, renderWeapons, renderNations } = useFilters({
    filters,
    type,
    surface,
    onChange,
  })
  const filterClass = cx('rounded-max! gap-xs-0! py-0!')

  return (
    <div className={cx('gap-xs-5 flex flex-wrap items-center', className)}>
      {renderElements('auto', filterClass)}
      {renderStatuses('auto', filterClass)}
      {renderWeapons('auto', filterClass)}
      {renderNations('auto', filterClass)}
      {renderSearch()}
    </div>
  )
}
