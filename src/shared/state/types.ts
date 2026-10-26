import { RATING_LABELS } from '@app-shared/data/settings'
import { z } from 'zod'
import { type GenshinCharacterStatus_v1, type GenshinCharacter_v1, UserDataSchema_v1 } from './versions/schema_v1'

const DisplaySizeSchema = z.enum(['small', 'medium', 'large'])
const UserSettingsSchema = z.object({
  displaySize: DisplaySizeSchema.default('medium'),
})

type UserData = z.infer<typeof UserDataSchema_v1>
type UserPrefs = UserData['preferences']
type RatingLabels = Record<keyof typeof RATING_LABELS, string>
type GenshinCharacterUserData = GenshinCharacter_v1
type CharacterStatus = GenshinCharacterStatus_v1
type DisplaySize = z.infer<typeof DisplaySizeSchema>
type UserSettings = z.infer<typeof UserSettingsSchema>

const EMPTY_USER_DATA: UserData = { version: 'v1' }

export {
  EMPTY_USER_DATA,
  UserSettingsSchema,
  type CharacterStatus,
  type DisplaySize,
  type GenshinCharacterUserData,
  type RatingLabels,
  type UserData,
  type UserPrefs,
  type UserSettings,
}
