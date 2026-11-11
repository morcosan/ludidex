import type { GenshinCharacter } from '@app-shared/data'
import type { CharacterLabel, GenshinCharacterUserData } from '@app-shared/state/types'
import { VIEW_TYPES } from '@app-shared/utils/use-view-options'
import { GENSHIN_FILTERS } from '../../_shared/config'

type CharacterViewType = (typeof CHARACTER_VIEW_TYPES)[number]
type SortingViewType = Extract<CharacterViewType, `sort-${string}`>

const CHARACTER_FILTERS = GENSHIN_FILTERS

const CHARACTER_VIEW_TYPES = VIEW_TYPES

interface ViewConfig {
  step: number
  getValue: (character: GenshinCharacter, userData?: GenshinCharacterUserData) => number | undefined
  percent?: boolean
  label?: CharacterLabel
}

const getStatValue = (stat: keyof NonNullable<GenshinCharacterUserData['stats']>) => {
  return (_: GenshinCharacter, userData?: GenshinCharacterUserData) => userData?.stats?.[stat]
}

const VIEW_CONFIGS: Record<SortingViewType, ViewConfig> = {
  'sort-level': { step: 5, getValue: getStatValue('level'), label: 'level' },
  'sort-hp': { step: 5000, getValue: getStatValue('hp'), label: 'hp' },
  'sort-atk': { step: 100, getValue: getStatValue('atk'), label: 'atk' },
  'sort-def': { step: 100, getValue: getStatValue('def'), label: 'def' },
  'sort-em': { step: 100, getValue: getStatValue('em'), label: 'em' },
  'sort-er': { step: 10, getValue: getStatValue('er'), percent: true, label: 'er' },
  'sort-crit-rate': { step: 10, getValue: getStatValue('critRate'), percent: true, label: 'critRate' },
  'sort-crit-dmg': { step: 10, getValue: getStatValue('critDmg'), percent: true, label: 'critDmg' },
  'sort-base-attack': { step: 10, getValue: (char) => char.na1HitDmg[1] || undefined, percent: true },
}

export { CHARACTER_FILTERS, CHARACTER_VIEW_TYPES, VIEW_CONFIGS, type CharacterViewType, type SortingViewType }
