import { RATING_LABELS, TIER_LIST_LABELS } from '@app-shared/data/settings'
import { z } from 'zod'
import { type GenshinCharacter_v1, USER_DATA_VERSION_V1, UserDataSchema_v1 } from './versions/schema_v1'

const DisplaySizeSchema = z.enum(['small', 'medium', 'large'])
const UserSettingsSchema = z.object({
  displaySize: DisplaySizeSchema.default('medium'),
})

type UserData = z.infer<typeof UserDataSchema_v1>
type UserPrefs = UserData['preferences']
type RatingLabels = Record<keyof typeof RATING_LABELS, string>
type TierListLabels = Record<keyof typeof TIER_LIST_LABELS, string>
type GenshinCharacterUserData = GenshinCharacter_v1
type DisplaySize = z.infer<typeof DisplaySizeSchema>
type UserSettings = z.infer<typeof UserSettingsSchema>

const EMPTY_USER_DATA: UserData = { version: USER_DATA_VERSION_V1 }

export {
  EMPTY_USER_DATA,
  UserSettingsSchema,
  type DisplaySize,
  type GenshinCharacterUserData,
  type RatingLabels,
  type TierListLabels,
  type UserData,
  type UserPrefs,
  type UserSettings,
}
