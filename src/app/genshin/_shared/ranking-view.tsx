import { RatingIcon, StatusIcon } from '@app-shared/components'
import {
  CHARACTER_STATUSES,
  RATING_COLORS,
  RATING_LABELS,
  RATING_VALUES,
  STATUS_COLORS,
  TIER_LIST_COLORS,
  TIER_LIST_LABELS,
  TIER_LIST_VALUES,
} from '@app-shared/data'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { type ViewType } from '@app-shared/utils/use-view-options'
import { withAlpha } from '@app-shared/utils/various'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type RankValue = string | number | undefined

interface RankData<T> {
  key: string
  label: ReactNode
  items: T[]
  bgColor?: string
}

interface RankingViewProps<T> {
  items: T[]
  viewType: ViewType
  classNames: {
    row: string
    list: string
    content: string
  }
  getValue: (item: T, viewType: ViewType) => RankValue
  renderItem: (item: T) => ReactNode
}

export const RankingView = <T,>(props: RankingViewProps<T>) => {
  const { items, viewType, classNames, renderItem, getValue } = props
  const { t } = useTranslation()
  const preferences = useUserDataStore((state) => state.userData?.preferences)
  const ratingLabels = { ...RATING_LABELS, ...preferences?.ratingLabels }
  const tierListLabels = { ...TIER_LIST_LABELS, ...preferences?.tierListLabels }
  const labelClass = cx(classNames.row, classNames.list)

  const getNoTierData = (key: string): RankData<T> => ({
    key,
    label: <span>--</span>,
    items: items.filter((item) => getValue(item, viewType) === undefined),
  })

  const getRatingData = (): RankData<T>[] => [
    ...RATING_VALUES.map((value): RankData<T> => ({
      key: String(value),
      label: renderLabel(<RatingIcon value={value} large />, ratingLabels[value]),
      items: items.filter((item) => getValue(item, 'rating') === value),
      bgColor: withAlpha(RATING_COLORS[value], 0.7),
    })),
    getNoTierData('no-rating'),
  ]

  const getStatusData = (): RankData<T>[] => [
    ...CHARACTER_STATUSES.map((status): RankData<T> => ({
      key: status,
      label: renderLabel(<StatusIcon value={status} large className="text-color-white!" />, t(`game.label.${status}`)),
      items: items.filter((item) => getValue(item, 'status') === status),
      bgColor: withAlpha(STATUS_COLORS[status], 0.6),
    })),
    getNoTierData('no-status'),
  ]

  const getTierData = (): RankData<T>[] => [
    ...TIER_LIST_VALUES.map((value): RankData<T> => ({
      key: value,
      label: renderLabel(
        <span className="text-size-xxl mt-xs-1 ml-[-0.15em] leading-1 tracking-[-0.15em]">{value}</span>,
        tierListLabels[value],
      ),
      items: items.filter((item) => getValue(item, viewType) === value),
      bgColor: withAlpha(TIER_LIST_COLORS[value], 0.8),
    })),
    getNoTierData('no-tier'),
  ]

  const renderLabel = (icon: ReactNode, text: string) => (
    <span className="gap-y-xs-0 text-color-white font-weight-lg flex flex-col items-center text-center text-shadow-md">
      {icon}
      <span className="text-size-xs leading-sm tracking-wider">{text}</span>
    </span>
  )

  const tiers = viewType === 'rating' ? getRatingData() : viewType === 'status' ? getStatusData() : getTierData()

  return (
    <div className="divide-color-border-on-glass flex h-fit w-full flex-col divide-y">
      {tiers.map(({ key, label, items: tierItems, bgColor }) => (
        <div key={key} className={cx('flex items-start items-stretch', classNames.row)}>
          {/* TIER LABEL */}
          <div className="w-md-6 px-xs-2 border-color-border-on-glass relative flex items-start border-r">
            {bgColor && <span className="inset-xs-1 absolute -z-10 rounded-sm" style={{ backgroundColor: bgColor }} />}
            <div className={cx('flex-center mx-0! flex w-full', labelClass)}>{label}</div>
          </div>
          {/* ITEMS */}
          <ul className={classNames.content}>{tierItems.map(renderItem)}</ul>
        </div>
      ))}
    </div>
  )
}
