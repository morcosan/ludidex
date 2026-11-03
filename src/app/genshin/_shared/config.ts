import type { GenshinCharacter } from '@app-shared/data/genshin/characters'
import { GENSHIN_ELEMENTS, GENSHIN_NATIONS, GENSHIN_WEAPONS } from '@app-shared/data/genshin/core'
import { type FilterValues } from '@app-shared/utils/use-filter-params'

export type GenshinFilters = FilterValues<typeof GENSHIN_FILTERS>

export const GENSHIN_FILTERS = {
  elements: GENSHIN_ELEMENTS,
  weapons: GENSHIN_WEAPONS,
  nations: GENSHIN_NATIONS,
}

export const matchesFilters = (character: GenshinCharacter, filters: GenshinFilters) => {
  return (
    (filters.elements.length === 0 || filters.elements.includes(character.element)) &&
    (filters.weapons.length === 0 || filters.weapons.includes(character.weapon)) &&
    (filters.nations.length === 0 || filters.nations.includes(character.nation))
  )
}
