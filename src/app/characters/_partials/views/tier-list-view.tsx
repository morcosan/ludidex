import { RatingField, StatusField, TierListField } from '@app-shared/components'
import { type GenshinCharacter } from '@app-shared/data/genshin/characters'
import {
  CHARACTER_STATUSES,
  RATING_LABELS,
  RATING_MAX_VALUE,
  RATING_MIN_VALUE,
  TIER_LIST_MARKS,
} from '@app-shared/data/settings'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { type ReactNode } from 'react'
import { type DisplayClass } from '../character-listing'
import { type ViewType } from '../use-view-options'

interface TierGroup {
  key: string
  label: ReactNode
  characters: GenshinCharacter[]
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
  const userData = useUserDataStore((state) => state.userData)
  const preferences = useUserDataStore((state) => state.userData?.preferences)
  const ratingLabels = { ...RATING_LABELS, ...preferences?.ratingLabels }

  const TIER_SCORES = Object.keys(TIER_LIST_MARKS)
    .map(Number)
    .sort((a, b) => b - a)

  const getTierScore = (character: GenshinCharacter) => {
    const characterUserData = userData?.genshin?.characters[character.id]
    if (viewType === 'rating') return characterUserData?.rating ?? 0
    if (viewType === 'tier-main-dps') return characterUserData?.tierLists?.mainDps ?? 0
    if (viewType === 'tier-sub-dps') return characterUserData?.tierLists?.subDps ?? 0
    if (viewType === 'tier-support') return characterUserData?.tierLists?.support ?? 0
    if (viewType === 'tier-exploration') return characterUserData?.tierLists?.exploration ?? 0
    if (viewType === 'tier-outfit') return characterUserData?.tierLists?.outfit ?? 0
    if (viewType === 'tier-personality') return characterUserData?.tierLists?.personality ?? 0
    return undefined
  }

  const tierGroups = ((): TierGroup[] => {
    if (viewType === 'rating') {
      return Array.from(
        { length: RATING_MAX_VALUE - RATING_MIN_VALUE + 1 },
        (_, index) => RATING_MAX_VALUE - index,
      ).map((value): TierGroup => ({
        key: String(value),
        label: <RatingField value={value} labels={ratingLabels} readonly />,
        characters: characters.filter((character) => getTierScore(character) === value),
      }))
    }
    if (viewType === 'status') {
      return [
        ...CHARACTER_STATUSES.map((status): TierGroup => ({
          key: status,
          label: <StatusField value={status} readonly />,
          characters: characters.filter((character) => userData?.genshin?.characters[character.id]?.status === status),
        })),
        {
          key: 'no-status',
          label: <StatusField readonly />,
          characters: characters.filter((character) => !userData?.genshin?.characters[character.id]?.status),
        },
      ]
    }
    return TIER_SCORES.map((score): TierGroup => ({
      key: String(score),
      label: <TierListField value={score} readonly />,
      characters: characters.filter((character) => getTierScore(character) === score),
    }))
  })()

  return (
    <div className="divide-color-border-on-glass flex h-fit flex-col divide-y">
      {tierGroups.map(({ key, label, characters: tierCharacters }) => (
        <div key={key} className={cx('flex items-start items-stretch', displayClass.tierRow)}>
          {/* TIER LABEL */}
          <div className="w-md-6 px-xs-2 border-color-border-on-glass flex items-start border-r">
            <div className={cx('mx-0! flex w-full items-center', displayClass.tierRow, displayClass.list)}>{label}</div>
          </div>
          {/* CHARACTERS */}
          <ul className={contentClass}>{tierCharacters.map(renderItem)}</ul>
        </div>
      ))}
    </div>
  )
}
