import { GENSHIN_DOMAINS, GENSHIN_ELEMENTS, GENSHIN_NATIONS, GENSHIN_WEAPONS, TEAM_SIZES } from '@app-shared/data'
import { type ViewType } from '@app-shared/utils/use-view-options'

export type TeamViewType = (typeof TEAM_VIEW_TYPES)[number]

export const TEAM_FILTERS = {
  elements: GENSHIN_ELEMENTS,
  weapons: GENSHIN_WEAPONS,
  nations: GENSHIN_NATIONS,
  teamSizes: TEAM_SIZES,
}

const SORTED_DOMAIN_IDS = [...GENSHIN_DOMAINS]
  .sort((domainA, domainB) => domainA.name.localeCompare(domainB.name))
  .map(({ id }) => id)

export const TEAM_VIEW_TYPES: ViewType[] = ['default', 'rating', ...SORTED_DOMAIN_IDS]

export const DOMAIN_VIEW_STEP = 10 // seconds
