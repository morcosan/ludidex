import { formatInteger, roundValue } from '@app-shared/utils/various'
import { Fragment, type ReactNode } from 'react'

interface SortGroup<T> {
  key: string
  value: number
  items: T[]
}

interface SortedItem<T> {
  item: T
  value: number
}

interface SortingViewProps<T> {
  items: T[]
  itemsPool: T[]
  valueStep: number
  percent: boolean
  emptyText: ReactNode
  classNames: {
    row: string
    content: string
  }
  getValue: (item: T) => number | undefined
  renderItem: (item: T) => ReactNode
}

export const SortingView = <T,>(props: SortingViewProps<T>) => {
  const { items, itemsPool, valueStep, percent, emptyText, classNames, getValue, renderItem } = props

  const sortedPool = itemsPool
    .map((item): SortedItem<T> | undefined => {
      const value = getValue(item)
      return value === undefined ? undefined : { item, value }
    })
    .filter((entry): entry is SortedItem<T> => entry !== undefined)
    .toSorted((itemA, itemB) => itemB.value - itemA.value)

  const poolGroups = sortedPool.reduce<SortGroup<T>[]>((result, { item, value }) => {
    const groupValue = roundValue(value, 'down', valueStep) + valueStep
    const lastGroup = result.at(-1)

    if (lastGroup?.value === groupValue) lastGroup.items.push(item)
    else result.push({ key: String(groupValue), value: groupValue, items: [item] })

    return result
  }, [])

  const lowestValue = sortedPool.at(-1)?.value
  const floorValue = lowestValue === undefined ? 0 : Math.min(0, roundValue(lowestValue, 'down', valueStep))

  const visibleItems = new Set(items)
  const itemGroups = poolGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) => visibleItems.has(item)),
  }))

  const hasItems = itemGroups.some((group) => group.items.length > 0)

  const labelWrapperClass = cx('w-md-3 border-color-border-on-glass border-r')

  const renderLabel = (value: number, key: string) => (
    <div key={key} className={cx('pr-xs-6 relative flex items-center justify-end', labelWrapperClass)}>
      <span className="text-size-sm pr-xs-0">
        <span className="font-family-mono">{formatInteger(value, valueStep >= 1_000)}</span>
        {percent && <span className="ml-px">%</span>}
      </span>
      <span className="bg-color-border-on-glass w-xs-3 absolute top-1/2 right-0 h-px" />
    </div>
  )

  if (!hasItems) return <p className="text-size-sm text-color-text-subtle">{emptyText}</p>
  return (
    <div className="flex h-fit flex-col">
      {itemGroups.length > 0 && renderLabel(itemGroups[0].value, 'sorting-label-top')}

      {itemGroups.map(({ key, items: groupItems }, index) => (
        <Fragment key={key}>
          <div className={cx('flex items-start items-stretch', classNames.row)}>
            <div className={labelWrapperClass} />
            <ul className={classNames.content}>{groupItems.map(renderItem)}</ul>
          </div>
          {renderLabel(itemGroups[index + 1]?.value ?? floorValue, `sorting-label-${key}`)}
        </Fragment>
      ))}
    </div>
  )
}
