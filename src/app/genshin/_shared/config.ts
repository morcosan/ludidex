import {
  GENSHIN_CHARACTERS_BY_ID,
  GENSHIN_ELEMENTS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPONS,
  type GenshinCharacter,
} from '@app-shared/data'
import { type GenshinTeam } from '@app-shared/state/types'
import { type FilterValues } from '@app-shared/utils/use-filter-params'

type GenshinFilters = FilterValues<typeof GENSHIN_FILTERS>

const GENSHIN_FILTERS = {
  elements: GENSHIN_ELEMENTS,
  weapons: GENSHIN_WEAPONS,
  nations: GENSHIN_NATIONS,
}

const matchesFilters = (character: GenshinCharacter, filters: GenshinFilters) => {
  return (
    (filters.elements.length === 0 || filters.elements.includes(character.element)) &&
    (filters.weapons.length === 0 || filters.weapons.includes(character.weapon)) &&
    (filters.nations.length === 0 || filters.nations.includes(character.nation))
  )
}

const filterTeamsByChars = (teams: GenshinTeam[], filters: GenshinFilters): GenshinTeam[] => {
  return teams.filter((team) => {
    return team.charIds.some((id) => {
      const character = GENSHIN_CHARACTERS_BY_ID[id]
      return character && matchesFilters(character, filters)
    })
  })
}

export { filterTeamsByChars, GENSHIN_FILTERS, matchesFilters, type GenshinFilters }
