import { VIEW_TYPES } from '@app-shared/utils/use-view-options'
import { GENSHIN_FILTERS, type GenshinFilters } from '../../_shared/config'

export type CharacterFilters = GenshinFilters
export type CharacterViewType = (typeof CHARACTER_VIEW_TYPES)[number]

export const CHARACTER_FILTERS = GENSHIN_FILTERS

export const CHARACTER_VIEW_TYPES = VIEW_TYPES
