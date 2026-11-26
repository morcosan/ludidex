import { useMemo } from 'react'
import { type Filters } from '../components'
import { GENSHIN_CHARACTERS_BY_ID, TEAM_SIZES } from '../data'
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

  const listedTeams = allTeams.filter((team) => {
    const members = team.charIds.map((id) => GENSHIN_CHARACTERS_BY_ID[id]).filter(Boolean)
    const matchesSearch =
      !search ||
      team.name.toLocaleLowerCase().includes(search) ||
      members.some((member) => member.fullName.toLocaleLowerCase().includes(search))
    const matchesFilters =
      (filters.statuses ?? []).every((status) => members.some((member) => charData?.[member.id]?.status === status)) &&
      (filters.elements ?? []).every((element) => members.some((member) => member.element === element)) &&
      (filters.nations ?? []).every((nation) => members.some((member) => member.nation === nation)) &&
      (filters.weaponTypes ?? []).every((weapon) => members.some((member) => member.weapon === weapon)) &&
      (!filters.teamSizes?.length ||
        filters.teamSizes.some((teamSize) => TEAM_SIZES.indexOf(teamSize) + 1 === team.charIds.length)) &&
      (!filters.tags?.length ||
        filters.tags.every(
          (tag) => team.tags?.includes(tag) || members.some((member) => charData?.[member.id]?.tags?.includes(tag)),
        ))

    return matchesSearch && matchesFilters
  })

  return { allTeams, listedTeams }
}
