import { Button } from '@design-system'
import { type ReactNode } from 'react'

interface FilterGroupProps<T extends string> {
  items: readonly T[]
  selection: readonly T[]
  order?: 'length' | 'alphabetical'
  surface?: 'glass' | 'paper'
  ariaLabel?: string
  getLabel?: (item: T) => string
  renderIcon?: (item: T) => ReactNode
  onToggle?: (item: T) => void
}

export const FilterGroup = <T extends string>(props: FilterGroupProps<T>) => {
  const { ariaLabel, items, selection, order, surface = 'glass', renderIcon, getLabel, onToggle } = props

  const groupClass = cx(
    'gap-xs-1 p-xs-1 flex flex-wrap',
    'rounded-xl border',
    surface === 'glass'
      ? 'bg-color-bg-region border-color-border-inset'
      : 'bg-color-bg-field border-color-border-surface',
  )

  const getItemLabel = (item: T) => getLabel?.(item) || item
  const sortedItems = (() => {
    if (order === 'length') {
      return [...items].sort((itemA, itemB) => getItemLabel(itemA).length - getItemLabel(itemB).length)
    }
    if (order === 'alphabetical') {
      return [...items].sort((itemA, itemB) => getItemLabel(itemA).localeCompare(getItemLabel(itemB)))
    }
    return items
  })()

  return (
    <div role="group" aria-label={ariaLabel} className={groupClass}>
      {sortedItems.map((item) => {
        return (
          <Button
            key={item}
            size="sm"
            state={selection.includes(item) ? 'selected' : 'active'}
            classNames={{ content: 'justify-start!' }}
            onClick={() => onToggle?.(item)}
          >
            {renderIcon?.(item)}
            <span className="min-w-0 truncate">{getItemLabel(item)}</span>
          </Button>
        )
      })}
    </div>
  )
}
