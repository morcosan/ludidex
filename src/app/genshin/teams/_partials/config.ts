import { type ViewType } from '@app-shared/utils/use-view-options'
import { GENSHIN_FILTERS, type GenshinFilters } from '../../_shared/config'

export type TeamFilters = GenshinFilters
export type TeamViewType = (typeof TEAM_VIEW_TYPES)[number]

export const TEAM_FILTERS = GENSHIN_FILTERS

export const TEAM_VIEW_TYPES = ['default', 'rating'] as const satisfies readonly ViewType[]
