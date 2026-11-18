import { type Filters } from '../components'
import { GENSHIN_DOMAINS } from '../data'
import { sortByName } from './various'

export const useDomainListing = (filters: Filters) => {
  const search = filters.search?.trim().toLocaleLowerCase()

  const listedDomains = GENSHIN_DOMAINS.filter((domain) => {
    const matchesSearch =
      !search ||
      domain.name.toLocaleLowerCase().includes(search) ||
      domain.trials.some((trial) => trial.name.toLocaleLowerCase().includes(search))
    const matchesNations = !filters.nations?.length || filters.nations.includes(domain.nation)
    return matchesSearch && matchesNations
  }).sort(sortByName)

  return { listedDomains }
}
