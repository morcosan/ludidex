import { GENSHIN_DOMAINS } from '@app-shared/data'
import { type ViewType } from '@app-shared/utils/use-view-options'

export type TeamViewType = (typeof TEAM_VIEW_TYPES)[number]

const SORTED_DOMAIN_IDS = [...GENSHIN_DOMAINS]
  .sort((domainA, domainB) => domainA.name.localeCompare(domainB.name))
  .map(({ id }) => id)

export const TEAM_VIEW_TYPES = [
  'default',
  'rating',
  'tier-synergy',
  'tier-story',
  'tier-aesthetic',
  'tier-affinity',
  ...SORTED_DOMAIN_IDS,
] as const satisfies readonly ViewType[]

export const DOMAIN_VIEW_STEP = 10 // seconds
