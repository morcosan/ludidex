import type { GenshinCharacter } from '@app-shared/data/genshin'
import type { CharacterLabel, GenshinCharacterUserData } from '@app-shared/state/types'
import { VIEW_TYPES } from '@app-shared/utils/use-view-options'
import { formatInteger, formatPercent } from '@app-shared/utils/various'
import { GENSHIN_FILTERS } from '../../_shared/config'

type CharacterViewType = (typeof CHARACTER_VIEW_TYPES)[number]
type SortingViewType = Extract<CharacterViewType, `sort-${string}`>

const CHARACTER_FILTERS = GENSHIN_FILTERS

const CHARACTER_VIEW_TYPES = VIEW_TYPES

interface ViewConfig {
  step: number
  label?: CharacterLabel
  getValue: (character: GenshinCharacter, userData?: GenshinCharacterUserData) => number | undefined
  formatValue: (value: number, compact?: boolean) => string
}

const getStatValue = (stat: keyof NonNullable<GenshinCharacterUserData['stats']>) => {
  return (_: GenshinCharacter, userData?: GenshinCharacterUserData) => userData?.stats?.[stat]
}

const VIEW_CONFIGS: Record<SortingViewType, ViewConfig> = {
  'sort-level': { step: 5, label: 'level', getValue: getStatValue('level'), formatValue: formatInteger },
  'sort-hp': { step: 5000, label: 'hp', getValue: getStatValue('hp'), formatValue: formatInteger },
  'sort-atk': { step: 100, label: 'atk', getValue: getStatValue('atk'), formatValue: formatInteger },
  'sort-def': { step: 100, label: 'def', getValue: getStatValue('def'), formatValue: formatInteger },
  'sort-em': { step: 100, label: 'em', getValue: getStatValue('em'), formatValue: formatInteger },
  'sort-er': { step: 10, label: 'er', getValue: getStatValue('er'), formatValue: formatPercent },
  'sort-crit-rate': { step: 10, label: 'critRate', getValue: getStatValue('critRate'), formatValue: formatPercent },
  'sort-crit-dmg': { step: 10, label: 'critDmg', getValue: getStatValue('critDmg'), formatValue: formatPercent },
  'sort-base-attack': { step: 10, getValue: (char) => char.na1HitDmg[1] || undefined, formatValue: formatPercent },
}

export { CHARACTER_FILTERS, CHARACTER_VIEW_TYPES, VIEW_CONFIGS, type CharacterViewType, type SortingViewType }
