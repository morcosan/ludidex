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

  return (
    <div className={cx('gap-xs-5 flex flex-wrap items-center', className)}>
      {renderElements('auto', 'rounded-max!')}
      {renderStatuses('auto', 'rounded-max!')}
      {renderWeapons('auto', 'rounded-max!')}
      {renderNations('auto', 'rounded-max!')}
      {renderSearch()}
    </div>
  )
}
