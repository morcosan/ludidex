import { LikeScore } from '@app-shared/components/like-score/like-score'
import { TierScore } from '@app-shared/components/tier-score/tier-score'
import { type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { MAX_LIKE_SCORE, MIN_LIKE_SCORE, TIER_SCORE_MARKS } from '@app-shared/data/settings'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { type DisplaySize } from '@app-shared/state/use-user-settings'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { CharacterItem } from './character-item'
import { type ListView } from './use-list-view'

interface TierGroup {
  key: string
  label: ReactNode
  characters: GenshinCharacter[]
}

interface DisplayClass {
  image: string
  list: string
  name: string
  tierRow: string
}

const DISPLAY_CLASSES: Record<DisplaySize, DisplayClass> = {
  small: {
    image: 'h-md-2 w-md-2',
    list: 'gap-xs-5 m-xs-5',
    name: 'w-md-2 text-size-xs',
    tierRow: 'min-h-md-5',
  },
  medium: {
    image: 'h-md-4 w-md-4',
    list: 'gap-xs-7 m-xs-6',
    name: 'w-md-4 text-size-xs',
    tierRow: 'min-h-md-7',
  },
  large: {
    image: 'h-md-7 w-md-7',
    list: 'gap-xs-9 m-xs-8',
    name: 'w-md-7 text-size-sm',
    tierRow: 'min-h-lg-0',
  },
}

interface CardListingProps {
  characters: GenshinCharacter[]
  viewType: ListView
  displaySize: DisplaySize
  selectedId?: string
  onClickItem: (character: GenshinCharacter) => void
}

export const CharacterListing = (props: CardListingProps) => {
  const { characters, viewType, displaySize, selectedId, onClickItem } = props
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData)

  const tierScores = Object.keys(TIER_SCORE_MARKS)
    .map(Number)
    .sort((a, b) => b - a)

  const getTierScore = (character: GenshinCharacter) => {
    const characterUserData = userData?.genshin.characters[character.id]
    if (viewType === 'tier-favorite') return characterUserData?.likeScore ?? 0
    if (viewType === 'tier-main-dps') return characterUserData?.tierScores?.mainDps ?? 0
    if (viewType === 'tier-sub-dps') return characterUserData?.tierScores?.subDps ?? 0
    if (viewType === 'tier-support') return characterUserData?.tierScores?.support ?? 0
    if (viewType === 'tier-exploration') return characterUserData?.tierScores?.exploration ?? 0
    if (viewType === 'tier-outfit') return characterUserData?.tierScores?.outfit ?? 0
    if (viewType === 'tier-personality') return characterUserData?.tierScores?.personality ?? 0
    return undefined
  }

  const tierGroups = ((): TierGroup[] => {
    if (viewType === 'default') return []
    if (viewType === 'tier-favorite') {
      return Array.from({ length: MAX_LIKE_SCORE - MIN_LIKE_SCORE + 1 }, (_, index) => MAX_LIKE_SCORE - index).map(
        (value): TierGroup => ({
          key: String(value),
          label: <LikeScore value={value} />,
          characters: characters.filter((character) => getTierScore(character) === value),
        }),
      )
    }
    return tierScores.map((score): TierGroup => ({
      key: String(score),
      label: <TierScore value={score} />,
      characters: characters.filter((character) => getTierScore(character) === score),
    }))
  })()

  const displayClass = DISPLAY_CLASSES[displaySize]
  const tierRowClass = cx('flex items-start items-stretch', displayClass.tierRow)
  const tierHeaderClass = cx('min-w-md-5 px-xs-2 border-color-border-on-glass flex items-start border-r')
  const tierLabelClass = cx('flex-center mx-0! flex', displayClass.tierRow, displayClass.list)
  const tierContentClass = cx('flex h-fit flex-1 flex-wrap', displayClass.list)

  const renderItem = (character: GenshinCharacter) => (
    <li key={character.id}>
      <CharacterItem
        character={character}
        imageClassName={displayClass.image}
        labelClassName={displayClass.name}
        selected={selectedId === character.id}
        onClick={onClickItem}
      />
    </li>
  )

  return (
    <div className="pr-xs-3 flex min-h-0 flex-1 overflow-y-auto">
      {characters.length === 0 ? (
        <p className="text-size-sm text-color-text-subtle">{t('game.status.empty')}</p>
      ) : viewType === 'default' ? (
        <ul className={cx('m-0! p-0!', tierContentClass)}>{characters.map(renderItem)}</ul>
      ) : (
        <div className="divide-color-border-on-glass flex h-fit flex-col divide-y">
          {/* TIERS */}
          {tierGroups.map(({ key, label, characters: tierCharacters }) => (
            <div key={key} className={tierRowClass}>
              <div className={tierHeaderClass}>
                <div className={tierLabelClass}>{label}</div>
              </div>
              <ul className={tierContentClass}>{tierCharacters.map(renderItem)}</ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
