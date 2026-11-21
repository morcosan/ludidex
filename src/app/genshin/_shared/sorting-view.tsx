import { formatInteger, formatTime, roundValue } from '@app-shared/utils/various'
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
  getValue: (item: T) => number | null | undefined
  renderItem: (item: T) => ReactNode
  sortOrder?: 'asc' | 'desc'
  labelType?: 'percent' | 'time'
  nullLabel?: ReactNode
  classNames?: {
    row?: string
    content?: string
  }
}

export const SortingView = <T,>(props: SortingViewProps<T>) => {
  const {
    items,
    itemsPool,
    valueStep,
    labelType,
    sortOrder = 'desc',
    nullLabel = '--',
    classNames = {},
    getValue,
    renderItem,
  } = props

  const poolValues = itemsPool.map((item) => ({ item, value: getValue(item) }))
  const nullPool = poolValues.filter((entry) => entry.value === null)
  const sortedPool = poolValues
    .filter((entry): entry is SortedItem<T> => entry.value !== undefined && entry.value !== null)
    .toSorted((itemA, itemB) => (sortOrder === 'asc' ? itemA.value - itemB.value : itemB.value - itemA.value))

  const poolGroups = sortedPool.reduce<SortGroup<T>[]>((result, { item, value }) => {
    const stepValue = roundValue(value, 'down', valueStep)
    const groupValue = sortOrder === 'asc' ? stepValue : stepValue + valueStep
    const lastGroup = result.at(-1)

    if (lastGroup?.value === groupValue) lastGroup.items.push(item)
    else result.push({ key: String(groupValue), value: groupValue, items: [item] })

    return result
  }, [])

  const lastValue = sortedPool.at(-1)?.value
  const endValue =
    lastValue === undefined
      ? 0
      : sortOrder === 'asc'
        ? roundValue(lastValue, 'down', valueStep) + valueStep
        : Math.min(0, roundValue(lastValue, 'down', valueStep))

  const visibleItems = new Set(items)
  const itemGroups = poolGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) => visibleItems.has(item)),
  }))
  const nullItems = nullPool.map(({ item }) => item).filter((item) => visibleItems.has(item))

  const labelWrapperClass = cx('w-md-3 border-color-border-on-glass border-r')

  const renderLabel = (value?: number) => (
    <div className={cx('pr-xs-6 relative flex items-center justify-end', labelWrapperClass)}>
      <span className="text-size-sm pr-xs-0">
        <span className="font-family-mono">
          {value === undefined ? (
            nullLabel
          ) : (
            <>
              {labelType === 'time' ? formatTime(value) : formatInteger(value, valueStep >= 1_000)}
              {labelType === 'percent' && <span className="ml-px">%</span>}
            </>
          )}
        </span>
      </span>
      <span className="bg-color-border-on-glass w-xs-3 absolute top-1/2 right-0 h-px" />
    </div>
  )

  return (
    <div className="flex h-fit flex-col">
      {itemGroups.length > 0 && renderLabel(itemGroups[0].value)}

      {itemGroups.map(({ key, items: groupItems }, index) => (
        <Fragment key={key}>
          <div className={cx('flex items-start items-stretch', classNames.row)}>
            <div className={labelWrapperClass} />
            <ul className={classNames.content}>{groupItems.map(renderItem)}</ul>
          </div>
          {renderLabel(itemGroups[index + 1]?.value ?? endValue)}
        </Fragment>
      ))}

      {nullItems.length > 0 && (
        <>
          {itemGroups.length > 0 && <div className={cx('h-md-3', labelWrapperClass)} />}
          {renderLabel()}
          <div className={cx('flex items-start items-stretch', classNames.row)}>
            <div className={labelWrapperClass} />
            <ul className={classNames.content}>{nullItems.map(renderItem)}</ul>
          </div>
        </>
      )}
    </div>
  )
}
