import { LikeScore } from '@app-shared/components/like-score/like-score'
import { TierScore } from '@app-shared/components/tier-score/tier-score'
import { type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { MAX_LIKE_SCORE, MIN_LIKE_SCORE, TIER_SCORES } from '@app-shared/data/settings'
import { type DisplaySize } from '@app-shared/state/use-user-config'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { CharacterCard } from './character-card'
import { type ViewMode } from './side-filters'

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
  displaySize: DisplaySize
  viewMode: ViewMode
  selectedId?: string
  onCardClick: (character: GenshinCharacter) => void
}

export const CharacterListing = (props: CardListingProps) => {
  const { characters, displaySize, viewMode, selectedId, onCardClick } = props
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData)

  const getTierScore = (character: GenshinCharacter) => {
    const characterUserData = userData?.genshin.characters[character.id]
    if (viewMode === 'tier-like-score') return characterUserData?.likeScore ?? 0
    if (viewMode === 'tier-main-dps') return characterUserData?.tierScores?.mainDps
    if (viewMode === 'tier-sub-dps') return characterUserData?.tierScores?.subDps
    if (viewMode === 'tier-support') return characterUserData?.tierScores?.support
    if (viewMode === 'tier-exploration') return characterUserData?.tierScores?.exploration
    if (viewMode === 'tier-outfit') return characterUserData?.tierScores?.outfit
    return undefined
  }

  const tierGroups = ((): TierGroup[] => {
    if (viewMode === 'default') return []
    if (viewMode === 'tier-like-score') {
      return Array.from({ length: MAX_LIKE_SCORE - MIN_LIKE_SCORE + 1 }, (_, index) => MAX_LIKE_SCORE - index).map(
        (value): TierGroup => ({
          key: String(value),
          label: <LikeScore value={value} />,
          characters: characters.filter((character) => getTierScore(character) === value),
        }),
      )
    }
    return TIER_SCORES.map((tier, index): TierGroup => ({
      key: tier,
      label: <TierScore value={tier} />,
      characters: characters.filter((character) => getTierScore(character) === index),
    }))
  })()
  const noTierCharacters = viewMode === 'default' ? [] : characters.filter((char) => getTierScore(char) === undefined)

  const displayClass = DISPLAY_CLASSES[displaySize]
  const tierRowClass = cx('flex items-start items-stretch', displayClass.tierRow)
  const tierHeaderClass = cx('min-w-md-5 px-xs-2 border-color-border-subtle flex items-start border-r')
  const tierLabelClass = cx('flex-center mx-0! flex', displayClass.tierRow, displayClass.list)
  const tierContentClass = cx('flex h-fit flex-1 flex-wrap', displayClass.list)

  const renderCharacter = (character: GenshinCharacter) => (
    <li key={character.id}>
      <CharacterCard
        character={character}
        imageClassName={displayClass.image}
        labelClassName={displayClass.name}
        selected={selectedId === character.id}
        onClick={onCardClick}
      />
    </li>
  )

  return (
    <div className="pr-xs-3 flex min-h-0 flex-1 overflow-y-auto">
      {characters.length === 0 ? (
        <p className="text-size-sm text-color-text-subtle">{t('game.status.empty')}</p>
      ) : viewMode === 'default' ? (
        <ul className={cx('m-0! p-0!', tierContentClass)}>{characters.map(renderCharacter)}</ul>
      ) : (
        <div className="relative h-fit">
          <div className="divide-color-border-subtle flex flex-col divide-y">
            {/* TIERS */}
            {tierGroups.map(({ key, label, characters: tierCharacters }) => (
              <div key={key} className={tierRowClass}>
                <div className={tierHeaderClass}>
                  <div className={tierLabelClass}>{label}</div>
                </div>
                <ul className={tierContentClass}>{tierCharacters.map(renderCharacter)}</ul>
              </div>
            ))}

            {/* NO TIER */}
            {noTierCharacters.length > 0 && (
              <div className={tierRowClass}>
                <div className={tierHeaderClass}>
                  <div className={tierLabelClass}>
                    <TierScore />
                  </div>
                </div>
                <ul className={tierContentClass}>{noTierCharacters.map(renderCharacter)}</ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
