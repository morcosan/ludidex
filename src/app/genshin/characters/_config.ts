import {
  CHARACTER_STATUSES,
  GENSHIN_ELEMENTS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPONS,
  type GenshinCharacter,
} from '@app-shared/data'
import { type CharacterLabel, type GenshinCharacterUserData } from '@app-shared/state/types'
import { VIEW_TYPES } from '@app-shared/utils/use-view-options'

type CharacterViewType = (typeof CHARACTER_VIEW_TYPES)[number]
type SortingViewType = Extract<CharacterViewType, `sort-${string}`>

const CHARACTER_FILTERS = {
  elements: GENSHIN_ELEMENTS,
  statuses: CHARACTER_STATUSES,
  weapons: GENSHIN_WEAPONS,
  nations: GENSHIN_NATIONS,
}

const CHARACTER_VIEW_TYPES = VIEW_TYPES

interface ViewConfig {
  step: number
  getValue: (character: GenshinCharacter, userData?: GenshinCharacterUserData) => number | undefined
  type: 'default' | 'percent'
  label?: CharacterLabel
}

const getStatValueFn = (stat: keyof NonNullable<GenshinCharacterUserData['stats']>) => {
  return (_: GenshinCharacter, userData?: GenshinCharacterUserData) => userData?.stats?.[stat]
}

const VIEW_CONFIGS: Record<SortingViewType, ViewConfig> = {
  'sort-level': { step: 5, getValue: getStatValueFn('level'), label: 'level', type: 'default' },
  'sort-hp': { step: 5000, getValue: getStatValueFn('hp'), label: 'hp', type: 'default' },
  'sort-atk': { step: 100, getValue: getStatValueFn('atk'), label: 'atk', type: 'default' },
  'sort-def': { step: 100, getValue: getStatValueFn('def'), label: 'def', type: 'default' },
  'sort-em': { step: 100, getValue: getStatValueFn('em'), label: 'em', type: 'default' },
  'sort-er': { step: 10, getValue: getStatValueFn('er'), type: 'percent', label: 'er' },
  'sort-crit-rate': { step: 10, getValue: getStatValueFn('critRate'), type: 'percent', label: 'critRate' },
  'sort-crit-dmg': { step: 10, getValue: getStatValueFn('critDmg'), type: 'percent', label: 'critDmg' },
  'sort-base-attack': { step: 10, getValue: (char) => char.na1HitDmg[1] || undefined, type: 'percent' },
}

export { CHARACTER_FILTERS, CHARACTER_VIEW_TYPES, VIEW_CONFIGS, type CharacterViewType, type SortingViewType }
