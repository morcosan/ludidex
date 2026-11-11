import { Button } from '@design-system'
import { type ReactNode } from 'react'

export type FilterGroupOrder = 'name' | 'size' | 'auto'

interface FilterGroupProps<T extends string> {
  items: readonly T[]
  selection: readonly T[]
  order?: FilterGroupOrder
  surface?: 'glass' | 'paper'
  ariaLabel?: string
  renderLabel?: (item: T) => string
  renderIcon?: (item: T) => ReactNode
  className?: string
  onToggle?: (item: T) => void
}

export const FilterGroup = <T extends string>(props: FilterGroupProps<T>) => {
  const { ariaLabel, items, selection, order, surface = 'glass', renderIcon, renderLabel, className, onToggle } = props

  const getItemLabel = (item: T) => renderLabel?.(item) || item
  const sortedItems = (() => {
    if (order === 'size') {
      return [...items].sort((itemA, itemB) => getItemLabel(itemA).length - getItemLabel(itemB).length)
    }
    if (order === 'name') {
      return [...items].sort((itemA, itemB) => getItemLabel(itemA).localeCompare(getItemLabel(itemB)))
    }
    return items
  })()

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cx(
        'gap-xs-0 p-xs-0 min-h-button-h-lg flex flex-wrap items-center',
        'rounded-xl border',
        surface === 'glass'
          ? 'bg-color-bg-region border-color-border-inset'
          : 'bg-color-bg-field border-color-border-surface',
        className,
      )}
    >
      {sortedItems.map((item) => {
        return (
          <Button
            key={item}
            size="sm"
            state={selection.includes(item) ? 'selected' : 'active'}
            classNames={{ surface: 'pl-xs-3! pr-xs-4!', content: 'justify-start!' }}
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
