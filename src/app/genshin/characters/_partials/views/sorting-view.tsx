import { CHARACTERS, type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { type GenshinCharacterUserData } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { Fragment, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { type DisplayClass } from '../character-listing'
import { type ViewType } from '../use-view-options'
import { formatNumber, formatPercent, roundValue } from './utils'

type SortingViewType = Extract<ViewType, `sort-${string}`>
type CharUserData = GenshinCharacterUserData

interface SortGroup {
  key: string
  value: number
  characters: GenshinCharacter[]
}
interface SortAxis {
  sortGroups: SortGroup[]
  floorValue: number
  formatValue: (value: number) => string
}
interface SortedCharacter {
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
const VIEW_CONFIGS: Record<SortingViewType, ViewConfig> = {
  'sort-level': { step: 5, getValue: getStatValue('level'), formatValue: formatNumber },
  'sort-hp': { step: 5000, getValue: getStatValue('hp'), formatValue: formatNumber },
  'sort-atk': { step: 100, getValue: getStatValue('atk'), formatValue: formatNumber },
  'sort-def': { step: 100, getValue: getStatValue('def'), formatValue: formatNumber },
  'sort-em': { step: 100, getValue: getStatValue('em'), formatValue: formatNumber },
  'sort-er': { step: 10, getValue: getStatValue('er'), formatValue: formatPercent },
  'sort-crit-rate': { step: 10, getValue: getStatValue('critRate'), formatValue: formatPercent },
  'sort-crit-dmg': { step: 10, getValue: getStatValue('critDmg'), formatValue: formatPercent },
  'sort-base-attack': { step: 10, getValue: (char) => char.na1HitDmg[1] || undefined, formatValue: formatPercent },
}

interface SortingProps {
  characters: GenshinCharacter[]
  viewType: ViewType
}

const useSorting = (props: SortingProps): SortAxis => {
  const { characters, viewType } = props
  const userData = useUserDataStore((state) => state.userData)

  const config = VIEW_CONFIGS[viewType as SortingViewType]

  const sortedChars = CHARACTERS.map((character): SortedCharacter | undefined => {
    const value = config.getValue(character, userData?.genshin?.characters[character.id])
    return value === undefined ? undefined : { character, value }
  })
    .filter((entry): entry is SortedCharacter => entry !== undefined)
    .toSorted((charA, charB) => charB.value - charA.value)

  const groups = sortedChars.reduce<SortGroup[]>((result, { character, value }) => {
    const groupValue = roundValue(value, 'up', config.step)
    const lastGroup = result.at(-1)

    if (lastGroup?.value === groupValue) lastGroup.characters.push(character)
    else result.push({ key: String(groupValue), value: groupValue, characters: [character] })

    return result
  }, [])

  const visibleIds = new Set(characters.map(({ id }) => id))
  const lowestValue = sortedChars.at(-1)?.value
  const floorValue = lowestValue === undefined ? 0 : roundValue(lowestValue, 'down', config.step)

  return {
    sortGroups: groups.map((group) => ({
      ...group,
      characters: group.characters.filter(({ id }) => visibleIds.has(id)),
    })),
    floorValue,
    formatValue: config.formatValue,
  }
}

interface SortingViewProps {
  characters: GenshinCharacter[]
  viewType: ViewType
  displayClass: DisplayClass
  contentClass: string
  renderItem: (character: GenshinCharacter) => ReactNode
}

export const SortingView = (props: SortingViewProps) => {
  const { characters, viewType, displayClass, contentClass, renderItem } = props
  const { t } = useTranslation()
  const { sortGroups, floorValue, formatValue } = useSorting({ characters, viewType })
  const hasCharacters = sortGroups.some((group) => group.characters.length > 0)

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
      {sortGroups.length > 0 && renderLabel(sortGroups[0].value, 'sorting-label-top')}

      {sortGroups.map(({ key, characters: chars }, index) => (
        <Fragment key={key}>
          <div className={cx('flex items-start items-stretch', displayClass.row)}>
            <div className="w-md-2 border-color-border-on-glass shrink-0 border-r" />
            <ul className={contentClass}>{chars.map(renderItem)}</ul>
          </div>
          {renderLabel(sortGroups[index + 1]?.value ?? floorValue, `sorting-label-${key}`)}
        </Fragment>
      ))}
    </div>
  ) : (
    <p className="text-size-sm text-color-text-subtle">{t('game.status.empty')}</p>
  )
}
