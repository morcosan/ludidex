import { type Filters } from '../components'
import { GENSHIN_DOMAINS, getTrialNames } from '../data'
import { sortByName } from './various'

export const useDomainListing = (filters: Filters) => {
  const search = filters.search?.trim().toLocaleLowerCase()

  const listedDomains = GENSHIN_DOMAINS.filter((domain) => {
    const matchesSearch =
      !search ||
      domain.name.toLocaleLowerCase().includes(search) ||
      domain.trials.some((trial) => getTrialNames(trial).some((name) => name.toLocaleLowerCase().includes(search)))
    const matchesNations = !filters.nations?.length || filters.nations.includes(domain.nation)
    const matchesDomainTypes = !filters.domainTypes?.length || filters.domainTypes.includes(domain.type)

    return matchesSearch && matchesNations && matchesDomainTypes
  }).sort(sortByName)

  return { listedDomains }
}
