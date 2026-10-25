import { FavoriteField, TierListField } from '@app-shared/components'
import { type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { FAVORITE_LABELS, FAVORITE_MAX_VALUE, FAVORITE_MIN_VALUE, TIER_LIST_MARKS } from '@app-shared/data/settings'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { type ReactNode } from 'react'
import { type DisplayClass } from '../character-listing'
import { type View } from '../use-view-options'

interface TierGroup {
  key: string
  label: ReactNode
  characters: GenshinCharacter[]
}

interface TierViewProps {
  characters: GenshinCharacter[]
  view: View
  displayClass: DisplayClass
  contentClass: string
  renderItem: (character: GenshinCharacter) => ReactNode
}

export const TierView = (props: TierViewProps) => {
  const { characters, view, displayClass, contentClass, renderItem } = props
  const userData = useUserDataStore((state) => state.userData)
  const preferences = useUserDataStore((state) => state.userData?.preferences)
  const favoriteLabels = { ...FAVORITE_LABELS, ...preferences?.favoriteLabels }

  const TIER_SCORES = Object.keys(TIER_LIST_MARKS)
    .map(Number)
    .sort((a, b) => b - a)

  const getTierScore = (character: GenshinCharacter) => {
    const characterUserData = userData?.genshin?.characters[character.id]
    if (view === 'tier-favorite') return characterUserData?.favorite ?? 0
    if (view === 'tier-main-dps') return characterUserData?.tierLists?.mainDps ?? 0
    if (view === 'tier-sub-dps') return characterUserData?.tierLists?.subDps ?? 0
    if (view === 'tier-support') return characterUserData?.tierLists?.support ?? 0
    if (view === 'tier-exploration') return characterUserData?.tierLists?.exploration ?? 0
    if (view === 'tier-outfit') return characterUserData?.tierLists?.outfit ?? 0
    if (view === 'tier-personality') return characterUserData?.tierLists?.personality ?? 0
    return undefined
  }

  const tierGroups = ((): TierGroup[] => {
    if (view === 'tier-favorite') {
      return Array.from(
        { length: FAVORITE_MAX_VALUE - FAVORITE_MIN_VALUE + 1 },
        (_, index) => FAVORITE_MAX_VALUE - index,
      ).map((value): TierGroup => ({
        key: String(value),
        label: <FavoriteField value={value} labels={favoriteLabels} readonly />,
        characters: characters.filter((character) => getTierScore(character) === value),
      }))
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
            <div className={cx('mx-0! flex w-full', displayClass.tierRow, displayClass.list)}>{label}</div>
          </div>
          {/* CHARACTERS */}
          <ul className={contentClass}>{tierCharacters.map(renderItem)}</ul>
        </div>
      ))}
    </div>
  )
}
