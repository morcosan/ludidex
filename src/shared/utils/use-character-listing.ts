import { type Filters } from '@app-shared/components'
import { CHARACTER_STATUSES, GENSHIN_CHARACTERS } from '../data'
import { useUserDataStore } from '../state/use-user-data'
import { useUserSettingsStore } from '../state/use-user-settings'
import { sortByName } from './various'

export const useCharacterListing = (filters: Filters) => {
  const charData = useUserDataStore((state) => state.userData?.genshin?.characters)
  const charSorting = useUserSettingsStore((state) => state.userSettings.charSorting)

  const search = filters.search?.trim().toLocaleLowerCase()

  const filteredCharacters = GENSHIN_CHARACTERS.filter((character) => {
    const status = charData?.[character.id]?.status
    const matchesSearch = !search || character.fullName.toLocaleLowerCase().includes(search)
    return (
      matchesSearch &&
      (!filters.elements?.length || filters.elements.includes(character.element)) &&
      (!filters.statuses?.length || (status !== undefined && filters.statuses.includes(status))) &&
      (!filters.weapons?.length || filters.weapons.includes(character.weapon)) &&
      (!filters.nations?.length || filters.nations.includes(character.nation))
    )
  })

  const sortedCharacters = [...filteredCharacters].sort(sortByName)
  const listedCharacters =
    charSorting === 'name'
      ? sortedCharacters
      : sortedCharacters.sort((characterA, characterB) => {
          const dataA = charData?.[characterA.id]
          const dataB = charData?.[characterB.id]

          if (charSorting === 'level') return (dataB?.stats?.level ?? 0) - (dataA?.stats?.level ?? 0)
          if (charSorting === 'rating') return (dataB?.rating ?? 0) - (dataA?.rating ?? 0)

          const statusRankA = dataA?.status ? CHARACTER_STATUSES.indexOf(dataA.status) : CHARACTER_STATUSES.length
          const statusRankB = dataB?.status ? CHARACTER_STATUSES.indexOf(dataB.status) : CHARACTER_STATUSES.length
          return statusRankA - statusRankB
        })

  return { listedCharacters }
}
