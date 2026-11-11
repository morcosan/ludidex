import { GENSHIN_ELEMENTS, GENSHIN_NATIONS, GENSHIN_WEAPONS } from '@app-shared/data'
import { type ViewType } from '@app-shared/utils/use-view-options'

export type TeamViewType = (typeof TEAM_VIEW_TYPES)[number]

export const TEAM_FILTERS = {
  elements: GENSHIN_ELEMENTS,
  weapons: GENSHIN_WEAPONS,
  nations: GENSHIN_NATIONS,
}

export const TEAM_VIEW_TYPES = ['default', 'rating'] as const satisfies readonly ViewType[]
