import { RATING_LABELS, TIER_LIST_LABELS } from '@app-shared/data/settings'
import { z } from 'zod'
import {
  type GenshinCharacter_v1,
  type GenshinTeam_v1,
  USER_DATA_VERSION_V1,
  UserDataSchema_v1,
  packTeamId,
  unpackTeamId,
} from './versions/schema_v1'

const ItemSizeSchema = z.enum(['sm', 'md', 'lg'])
const UserSettingsSchema = z.object({
  charItemSize: ItemSizeSchema.default('md'),
  teamItemSize: ItemSizeSchema.default('md'),
})

type UserData = z.infer<typeof UserDataSchema_v1>
type UserPrefs = UserData['preferences']
type RatingLabels = Record<keyof typeof RATING_LABELS, string>
type TierListLabels = Record<keyof typeof TIER_LIST_LABELS, string>
type GenshinUserData = UserData['genshin']
type GenshinCharacterUserData = GenshinCharacter_v1
type GenshinTeamUserData = GenshinTeam_v1
type ItemSize = z.infer<typeof ItemSizeSchema>
type UserSettings = z.infer<typeof UserSettingsSchema>

interface GenshinTeam extends GenshinTeamUserData {
  id: string
  charIds: string[]
}

const EMPTY_USER_DATA: UserData = { version: USER_DATA_VERSION_V1 }

export {
  EMPTY_USER_DATA,
  UserSettingsSchema,
  packTeamId,
  unpackTeamId,
  type GenshinCharacterUserData,
  type GenshinTeam,
  type GenshinTeamUserData,
  type GenshinUserData,
  type ItemSize,
  type RatingLabels,
  type TierListLabels,
  type UserData,
  type UserPrefs,
  type UserSettings,
}
