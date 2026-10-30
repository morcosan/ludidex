import { RatingIcon, StatusIcon } from '@app-shared/components'
import { type GenshinCharacter } from '@app-shared/data/genshin/characters'
import {
  CHARACTER_STATUSES,
  RATING_COLORS,
  RATING_LABELS,
  RATING_VALUES,
  STATUS_COLORS,
  TIER_LIST_COLORS,
  TIER_LIST_LABELS,
  TIER_LIST_VALUES,
} from '@app-shared/data/settings'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { withAlpha } from '@app-shared/utils/various'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { type DisplayClass } from '../character-listing'
import { type ViewType } from '../use-view-options'

type ValueFn = (character: GenshinCharacter) => unknown

interface TierData {
  key: string
  label: ReactNode
  chars: GenshinCharacter[]
  bgColor?: string
}

interface TierViewProps {
  characters: GenshinCharacter[]
  viewType: ViewType
  displayClass: DisplayClass
  contentClass: string
  renderItem: (character: GenshinCharacter) => ReactNode
}

export const TierListView = (props: TierViewProps) => {
  const { characters, viewType, displayClass, contentClass, renderItem } = props
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData)
  const preferences = useUserDataStore((state) => state.userData?.preferences)
  const ratingLabels = { ...RATING_LABELS, ...preferences?.ratingLabels }
  const tierListLabels = { ...TIER_LIST_LABELS, ...preferences?.tierListLabels }
  const labelClass = cx(displayClass.row, displayClass.list)

  const getRatingValue = (character: GenshinCharacter) => userData?.genshin?.characters[character.id]?.rating
  const getStatusValue = (character: GenshinCharacter) => userData?.genshin?.characters[character.id]?.status
  const getTierValue = (character: GenshinCharacter) => {
    const characterUserData = userData?.genshin?.characters[character.id]
    if (viewType === 'tier-main-dps') return characterUserData?.tierLists?.mainDps
    if (viewType === 'tier-sub-dps') return characterUserData?.tierLists?.subDps
    if (viewType === 'tier-support') return characterUserData?.tierLists?.support
    if (viewType === 'tier-exploration') return characterUserData?.tierLists?.exploration
    if (viewType === 'tier-outfit') return characterUserData?.tierLists?.outfit
    if (viewType === 'tier-personality') return characterUserData?.tierLists?.personality
    return undefined
  }

  const getRatingData = (): TierData[] => [
    ...RATING_VALUES.map((value): TierData => ({
      key: String(value),
      label: renderLabel(<RatingIcon value={value} large />, ratingLabels[value]),
      chars: characters.filter((character) => getRatingValue(character) === value),
      bgColor: withAlpha(RATING_COLORS[value], 0.7),
    })),
    getNoTierData('no-rating', getRatingValue),
  ]

  const getStatusData = (): TierData[] => [
    ...CHARACTER_STATUSES.map((status): TierData => ({
      key: status,
      label: renderLabel(<StatusIcon value={status} large className="text-color-white!" />, t(`game.label.${status}`)),
      chars: characters.filter((character) => getStatusValue(character) === status),
      bgColor: withAlpha(STATUS_COLORS[status], 0.6),
    })),
    getNoTierData('no-status', getStatusValue),
  ]

  const getTierData = (): TierData[] => [
    ...TIER_LIST_VALUES.map((value): TierData => ({
      key: value,
      label: renderLabel(
        <span className="text-size-xxl mt-xs-1 ml-[-0.15em] leading-1 tracking-[-0.15em]">{value}</span>,
        tierListLabels[value],
      ),
      chars: characters.filter((character) => getTierValue(character) === value),
      bgColor: withAlpha(TIER_LIST_COLORS[value], 0.8),
    })),
    getNoTierData('no-tier', getTierValue),
  ]

  const getNoTierData = (key: string, valueFn: ValueFn): TierData => ({
    key,
    label: <span>--</span>,
    chars: characters.filter((char) => valueFn(char) === undefined),
  })

  const renderLabel = (icon: ReactNode, text: string) => (
    <span className="gap-y-xs-0 text-color-white font-weight-lg flex flex-col items-center text-center text-shadow-md">
      {icon}
      <span className="text-size-xs leading-sm tracking-wider">{text}</span>
    </span>
  )

  const tiers = viewType === 'rating' ? getRatingData() : viewType === 'status' ? getStatusData() : getTierData()

  return (
    <div className="divide-color-border-on-glass flex h-fit w-full flex-col divide-y">
      {tiers.map(({ key, label, chars, bgColor }) => (
        <div key={key} className={cx('flex items-start items-stretch', displayClass.row)}>
          {/* TIER LABEL */}
          <div className="w-md-6 px-xs-2 border-color-border-on-glass relative flex items-start border-r">
            {bgColor && <span className="inset-xs-1 absolute -z-10 rounded-sm" style={{ backgroundColor: bgColor }} />}
            <div className={cx('flex-center mx-0! flex w-full', labelClass)}>{label}</div>
          </div>
          {/* CHARACTERS */}
          <ul className={contentClass}>{chars.map(renderItem)}</ul>
        </div>
      ))}
    </div>
  )
}
