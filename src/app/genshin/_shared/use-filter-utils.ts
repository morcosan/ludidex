import { type Filters } from '@app-shared/components'
import { GENSHIN_CHARACTERS_BY_ID, type GenshinCharacter } from '@app-shared/data'
import { type GenshinTeam } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'

export const useFilterUtils = () => {
  const charData = useUserDataStore((state) => state.userData?.genshin?.characters)

  const filterCharacters = (characters: readonly GenshinCharacter[], filters: Filters) => {
    const search = filters.search?.trim().toLocaleLowerCase()

    return characters.filter((character) => {
      const status = charData?.[character.id]?.status
      return (
        (!search || character.name.toLocaleLowerCase().includes(search)) &&
        (!filters.elements?.length || filters.elements.includes(character.element)) &&
        (!filters.statuses?.length || (status !== undefined && filters.statuses.includes(status))) &&
        (!filters.weapons?.length || filters.weapons.includes(character.weapon)) &&
        (!filters.nations?.length || filters.nations.includes(character.nation))
      )
    })
  }

  const filterTeams = (teams: readonly GenshinTeam[], filters: Filters) => {
    const search = filters.search?.trim().toLocaleLowerCase()
    const { elements, weapons, nations, statuses } = filters

    return teams.filter((team) => {
      const characters = team.charIds.map((id) => GENSHIN_CHARACTERS_BY_ID[id]).filter(Boolean)
      const matchesSearch =
        !search ||
        team.name.toLocaleLowerCase().includes(search) ||
        characters.some((char) => char.name.toLocaleLowerCase().includes(search))
      const matchesFilters =
        (elements ?? []).every((element) => characters.some((char) => char.element === element)) &&
        (weapons ?? []).every((weapon) => characters.some((char) => char.weapon === weapon)) &&
        (nations ?? []).every((nation) => characters.some((char) => char.nation === nation)) &&
        (statuses ?? []).every((status) => characters.some((char) => charData?.[char.id]?.status === status))

      return matchesSearch && matchesFilters
    })
  }

  const countFilters = (filters: Filters) => {
    return (
      (filters.elements?.length ?? 0) +
      (filters.statuses?.length ?? 0) +
      (filters.weapons?.length ?? 0) +
      (filters.nations?.length ?? 0)
    )
  }

  return { countFilters, filterCharacters, filterTeams }
}
