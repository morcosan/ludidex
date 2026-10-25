import { CHARACTERS, type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { type GenshinCharacterUserData } from '@app-shared/data/genshin/user-data'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { Fragment, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { type DisplayClass } from '../character-listing'
import { type View } from '../use-view-options'
import { formatNumber, formatPercent, roundValue } from './utils'

type RankView = Extract<View, `rank-${string}`>
type CharUserData = GenshinCharacterUserData

interface RankGroup {
  key: string
  value: number
  characters: GenshinCharacter[]
}
interface RankAxis {
  rankGroups: RankGroup[]
  floorValue: number
  formatValue: (value: number) => string
}
interface RankedCharacter {
  character: GenshinCharacter
  value: number
}
interface ViewConfig {
  step: number
  getValue: (character: GenshinCharacter, userData?: CharUserData) => number | undefined
  formatValue: (value: number) => string
}

const getStatValue = (stat: keyof NonNullable<CharUserData['stats']>) => {
  return (_: GenshinCharacter, userData?: CharUserData) => userData?.stats?.[stat]
}
const VIEW_CONFIGS: Record<RankView, ViewConfig> = {
  'rank-level': { step: 5, getValue: getStatValue('level'), formatValue: formatNumber },
  'rank-hp': { step: 5000, getValue: getStatValue('hp'), formatValue: formatNumber },
  'rank-atk': { step: 100, getValue: getStatValue('atk'), formatValue: formatNumber },
  'rank-def': { step: 100, getValue: getStatValue('def'), formatValue: formatNumber },
  'rank-em': { step: 100, getValue: getStatValue('em'), formatValue: formatNumber },
  'rank-er': { step: 10, getValue: getStatValue('er'), formatValue: formatPercent },
  'rank-crit-rate': { step: 10, getValue: getStatValue('critRate'), formatValue: formatPercent },
  'rank-crit-dmg': { step: 10, getValue: getStatValue('critDmg'), formatValue: formatPercent },
  'rank-base-attack': { step: 10, getValue: (char) => char.na1HitDmg[1] || undefined, formatValue: formatPercent },
}

interface RankingProps {
  characters: GenshinCharacter[]
  view: View
}

const useRanking = (props: RankingProps): RankAxis => {
  const { characters, view } = props
  const userData = useUserDataStore((state) => state.userData)

  const config = VIEW_CONFIGS[view as RankView]

  const rankedChars = CHARACTERS.map((character): RankedCharacter | undefined => {
    const value = config.getValue(character, userData?.genshin?.characters[character.id])
    return value === undefined ? undefined : { character, value }
  })
    .filter((entry): entry is RankedCharacter => entry !== undefined)
    .toSorted((charA, charB) => charB.value - charA.value)

  const groups = rankedChars.reduce<RankGroup[]>((result, { character, value }) => {
    const groupValue = roundValue(value, 'up', config.step)
    const lastGroup = result.at(-1)

    if (lastGroup?.value === groupValue) lastGroup.characters.push(character)
    else result.push({ key: String(groupValue), value: groupValue, characters: [character] })

    return result
  }, [])

  const visibleIds = new Set(characters.map(({ id }) => id))
  const lowestValue = rankedChars.at(-1)?.value
  const floorValue = lowestValue === undefined ? 0 : roundValue(lowestValue, 'down', config.step)

  return {
    rankGroups: groups.map((group) => ({
      ...group,
      characters: group.characters.filter(({ id }) => visibleIds.has(id)),
    })),
    floorValue,
    formatValue: config.formatValue,
  }
}

interface RankViewProps {
  characters: GenshinCharacter[]
  view: View
  displayClass: DisplayClass
  contentClass: string
  renderItem: (character: GenshinCharacter) => ReactNode
}

export const RankView = (props: RankViewProps) => {
  const { characters, view, displayClass, contentClass, renderItem } = props
  const { t } = useTranslation()
  const { rankGroups, floorValue, formatValue } = useRanking({ characters, view })
  const hasCharacters = rankGroups.some((group) => group.characters.length > 0)

  const renderLabel = (value: number, key: string) => (
    <div key={key} className="flex">
      <div className="w-md-2 pr-xs-6 border-color-border-on-glass relative flex items-center justify-end border-r">
        <span className="text-size-sm">{formatValue(value)}</span>
        <span className="bg-color-border-on-glass w-xs-3 absolute top-1/2 right-0 h-px" />
      </div>
    </div>
  )

  return hasCharacters ? (
    <div className="flex h-fit flex-col">
      {rankGroups.length > 0 && renderLabel(rankGroups[0].value, 'rank-label-top')}

      {rankGroups.map(({ key, characters: rankCharacters }, index) => (
        <Fragment key={key}>
          <div className={cx('flex items-start items-stretch', displayClass.tierRow)}>
            <div className="w-md-2 border-color-border-on-glass shrink-0 border-r" />
            <ul className={contentClass}>{rankCharacters.map(renderItem)}</ul>
          </div>
          {renderLabel(rankGroups[index + 1]?.value ?? floorValue, `rank-label-${key}`)}
        </Fragment>
      ))}
    </div>
  ) : (
    <p className="text-size-sm text-color-text-subtle">{t('game.status.empty')}</p>
  )
}
