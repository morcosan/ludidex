import { LikeScore } from '@app-shared/components/like-score/like-score'
import { TierScore } from '@app-shared/components/tier-score/tier-score'
import { type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { MAX_LIKE_SCORE, MIN_LIKE_SCORE, TIER_SCORE_MARKS } from '@app-shared/data/settings'
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

  const TIER_SCORES = Object.keys(TIER_SCORE_MARKS)
    .map(Number)
    .sort((a, b) => b - a)

  const getTierScore = (character: GenshinCharacter) => {
    const characterUserData = userData?.genshin.characters[character.id]
    if (view === 'tier-favorite') return characterUserData?.likeScore ?? 0
    if (view === 'tier-main-dps') return characterUserData?.tierScores?.mainDps ?? 0
    if (view === 'tier-sub-dps') return characterUserData?.tierScores?.subDps ?? 0
    if (view === 'tier-support') return characterUserData?.tierScores?.support ?? 0
    if (view === 'tier-exploration') return characterUserData?.tierScores?.exploration ?? 0
    if (view === 'tier-outfit') return characterUserData?.tierScores?.outfit ?? 0
    if (view === 'tier-personality') return characterUserData?.tierScores?.personality ?? 0
    return undefined
  }

  const tierGroups = ((): TierGroup[] => {
    if (view === 'tier-favorite') {
      return Array.from({ length: MAX_LIKE_SCORE - MIN_LIKE_SCORE + 1 }, (_, index) => MAX_LIKE_SCORE - index).map(
        (value): TierGroup => ({
          key: String(value),
          label: <LikeScore value={value} />,
          characters: characters.filter((character) => getTierScore(character) === value),
        }),
      )
    }
    return TIER_SCORES.map((score): TierGroup => ({
      key: String(score),
      label: <TierScore value={score} />,
      characters: characters.filter((character) => getTierScore(character) === score),
    }))
  })()

  return (
    <div className="divide-color-border-on-glass flex h-fit flex-col divide-y">
      {tierGroups.map(({ key, label, characters: tierCharacters }) => (
        <div key={key} className={cx('flex items-start items-stretch', displayClass.tierRow)}>
          {/* TIER LABEL */}
          <div className="min-w-md-5 px-xs-2 border-color-border-on-glass flex items-start border-r">
            <div className={cx('flex-center mx-0! flex', displayClass.tierRow, displayClass.list)}>{label}</div>
          </div>
          {/* CHARACTERS */}
          <ul className={contentClass}>{tierCharacters.map(renderItem)}</ul>
        </div>
      ))}
    </div>
  )
}
