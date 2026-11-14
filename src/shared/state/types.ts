import { z } from 'zod'
import { RATING_LABELS, type TagColor, TIER_LIST_LABELS } from '../data'
import {
  type UserAssets_v0,
  type UserAssetsCharacterKey_v0,
  type UserAssetsGameKey_v0,
  type UserAssetsGroup_v0,
} from './user-assets/v0'
import { type GenshinCharacter_v0, type GenshinTeam_v0, UserDataSchema_v0 } from './user-data/v0'
import { CharacterLabelSchema, CharacterSortingSchema, ItemSizeSchema, UserSettingsSchema } from './user-settings'

type CharacterLabel = z.infer<typeof CharacterLabelSchema>
type CharacterSorting = z.infer<typeof CharacterSortingSchema>
type GenshinCharacterUserData = GenshinCharacter_v0
type GenshinTeamUserData = GenshinTeam_v0
type ItemSize = z.infer<typeof ItemSizeSchema>
type RatingLabels = Record<keyof typeof RATING_LABELS, string>
type TierListLabels = Record<keyof typeof TIER_LIST_LABELS, string>
type UserAssets = UserAssets_v0
type UserAssetsGameKey = UserAssetsGameKey_v0
type UserAssetsCharacterKey = UserAssetsCharacterKey_v0
type UserAssetsGroup = UserAssetsGroup_v0
type UserData = z.infer<typeof UserDataSchema_v0>
type UserSettings = z.infer<typeof UserSettingsSchema>

interface GenshinTeam extends GenshinTeamUserData {
  id: string
  charIds: string[]
}

interface UserTag {
  color: TagColor
}
const USER_TAGS: Record<string, UserTag> = {
  'main-dps': { color: 'red' },
  'sub-dps': { color: 'blue' },
  support: { color: 'green' },
  story: { color: 'yellow' },
  combat: { color: 'red' },
} as const

export {
  USER_TAGS,
  type CharacterLabel,
  type CharacterSorting,
  type GenshinCharacterUserData,
  type GenshinTeam,
  type GenshinTeamUserData,
  type ItemSize,
  type RatingLabels,
  type TierListLabels,
  type UserAssets,
  type UserAssetsCharacterKey,
  type UserAssetsGameKey,
  type UserAssetsGroup,
  type UserData,
  type UserSettings,
  type UserTag,
}
