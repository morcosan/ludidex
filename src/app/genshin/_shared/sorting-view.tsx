import { formatInteger, formatTime, isTimerFailed, roundValue } from '@app-shared/utils/various'
import { Fragment, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

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
  type: 'default' | 'percent' | 'timer'
  items: T[]
  itemsPool: T[]
  valueStep: number
  getValue: (item: T) => number | undefined
  renderItem: (item: T) => ReactNode
  sortOrder?: 'asc' | 'desc'
  classNames?: {
    row?: string
    content?: string
  }
}

export const SortingView = <T,>(props: SortingViewProps<T>) => {
  const { type, items, itemsPool, valueStep, sortOrder = 'desc', classNames = {}, getValue, renderItem } = props
  const { t } = useTranslation()

  const poolValues = itemsPool.map((item) => ({ item, value: getValue(item) }))
  const sortedPool = poolValues
    .filter(
      (entry): entry is SortedItem<T> => entry.value !== undefined && !(type === 'timer' && isTimerFailed(entry.value)),
    )
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
  const failedItems = type === 'timer' ? items.filter((item) => isTimerFailed(getValue(item))) : []
  const emptyItems = items.filter((item) => getValue(item) === undefined)

  const labelWrapperClass = cx('w-md-3 border-color-border-on-glass border-r')

  const renderLabel = (value?: number, label?: ReactNode, isStatic = false) => (
    <div className={cx('pr-xs-6 relative flex items-center justify-end', labelWrapperClass)}>
      <span className={cx('pr-xs-0', isStatic ? 'text-size-xs' : 'text-size-sm')}>
        {value === undefined ? (
          label
        ) : (
          <span className="font-family-mono">
            {type === 'timer' ? formatTime(value) : formatInteger(value, valueStep >= 1_000)}
            {type === 'percent' && <span className="ml-px">%</span>}
          </span>
        )}
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

      {failedItems.length > 0 && (
        <>
          {itemGroups.length > 0 && <div className={cx('h-md-3', labelWrapperClass)} />}
          {renderLabel(undefined, t('general.label.failed'), true)}
          <div className={cx('flex items-start items-stretch', classNames.row)}>
            <div className={labelWrapperClass} />
            <ul className={classNames.content}>{failedItems.map(renderItem)}</ul>
          </div>
        </>
      )}

      {emptyItems.length > 0 && (
        <>
          {(itemGroups.length > 0 || failedItems.length > 0) && <div className={cx('h-md-3', labelWrapperClass)} />}
          {renderLabel(undefined, t('general.label.empty'), true)}
          <div className={cx('flex items-start items-stretch', classNames.row)}>
            <div className={labelWrapperClass} />
            <ul className={classNames.content}>{emptyItems.map(renderItem)}</ul>
          </div>
        </>
      )}
    </div>
  )
}
