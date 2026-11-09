import { RATING_LABELS, TIER_LIST_LABELS } from '@app-shared/data/settings'
import { z } from 'zod'
import {
  type GenshinCharacter_v0,
  type GenshinTeam_v0,
  USER_DATA_VERSION_V0,
  UserDataSchema_v0,
  packTeamId_v0,
  unpackTeamId_v0,
} from './versions/schema_v0'

const ItemSizeSchema = z.enum(['sm', 'md', 'lg'])
const CharacterLabelSchema = z.enum([
  'rating',
  'status',
  'level',
  'hp',
  'atk',
  'def',
  'em',
  'er',
  'critRate',
  'critDmg',
])
const UserSettingsSchema = z.object({
  charItemSize: ItemSizeSchema.default('md'),
  charLabelTop: CharacterLabelSchema.nullable().default(null),
  charLabelBottom: CharacterLabelSchema.nullable().default(null),
  teamItemSize: ItemSizeSchema.default('md'),
})

type UserData = z.infer<typeof UserDataSchema_v0>
type UserPrefs = UserData['preferences']
type RatingLabels = Record<keyof typeof RATING_LABELS, string>
type TierListLabels = Record<keyof typeof TIER_LIST_LABELS, string>
type GenshinUserData = UserData['genshin']
type GenshinCharacterUserData = GenshinCharacter_v0
type GenshinTeamUserData = GenshinTeam_v0
type CharacterLabel = z.infer<typeof CharacterLabelSchema>
type ItemSize = z.infer<typeof ItemSizeSchema>
type UserSettings = z.infer<typeof UserSettingsSchema>

interface GenshinTeam extends GenshinTeamUserData {
  id: string
  charIds: string[]
}

const EMPTY_USER_DATA: UserData = { version: USER_DATA_VERSION_V0 }
const packTeamId = packTeamId_v0
const unpackTeamId = unpackTeamId_v0

export {
  EMPTY_USER_DATA,
  UserSettingsSchema,
  packTeamId,
  unpackTeamId,
  type CharacterLabel,
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
