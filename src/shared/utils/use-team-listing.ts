import { useMemo } from 'react'
import { type Filters } from '../components'
import { GENSHIN_CHARACTERS_BY_ID } from '../data'
import { type GenshinTeam } from '../state/types'
import { useUserDataStore } from '../state/use-user-data'
import { unpackTeamId } from '../state/utils'
import { sortByName } from './various'

export const useTeamListing = (filters: Filters) => {
  const teamData = useUserDataStore((state) => state.userData?.genshin?.teams)
  const charData = useUserDataStore((state) => state.userData?.genshin?.characters)

  const allTeams = useMemo((): GenshinTeam[] => {
    return Object.entries(teamData ?? {})
      .map(([id, team]): GenshinTeam => ({ ...team, id, charIds: unpackTeamId(id) }))
      .sort(sortByName)
  }, [teamData])

  const search = filters.search?.trim().toLocaleLowerCase()
  const { elements, weapons, nations, statuses } = filters

  const listedTeams = allTeams.filter((team) => {
    const characters = team.charIds.map((id) => GENSHIN_CHARACTERS_BY_ID[id]).filter(Boolean)
    const matchesSearch =
      !search ||
      team.name.toLocaleLowerCase().includes(search) ||
      characters.some((char) => char.fullName.toLocaleLowerCase().includes(search))
    const matchesFilters =
      (elements ?? []).every((element) => characters.some((char) => char.element === element)) &&
      (weapons ?? []).every((weapon) => characters.some((char) => char.weapon === weapon)) &&
      (nations ?? []).every((nation) => characters.some((char) => char.nation === nation)) &&
      (statuses ?? []).every((status) => characters.some((char) => charData?.[char.id]?.status === status))

    return matchesSearch && matchesFilters
  })

  return { allTeams, listedTeams }
}
