import { z } from 'zod'
import { GENSHIN_CHARACTER_IDS, TIER_LIST_VALUES } from '../../../data'
import { GenshinCharacterSchema_v0, GenshinTeamsSchema_v0, UserPreferencesSchema_v0 } from '../v0'

const USER_DATA_VERSION_VN1 = 'v0.4'

const GenshinCharacterSchema_vn1 = GenshinCharacterSchema_v0.omit({ tierLists: true }).extend({
  tierLists: z
    .object({
      mainDps: z.enum(TIER_LIST_VALUES).optional(),
      subDps: z.enum(TIER_LIST_VALUES).optional(),
      support: z.enum(TIER_LIST_VALUES).optional(),
      exploration: z.enum(TIER_LIST_VALUES).optional(),
      story: z.enum(TIER_LIST_VALUES).optional(),
      outfit: z.enum(TIER_LIST_VALUES).optional(),
      personality: z.enum(TIER_LIST_VALUES).optional(),
    })
    .optional(),
})

const GenshinCharactersSchema_vn1 = z.partialRecord(z.enum(GENSHIN_CHARACTER_IDS), GenshinCharacterSchema_vn1)

const UserDataSchema_vn1 = z.object({
  version: z.literal(USER_DATA_VERSION_VN1),
  genshin: z
    .object({
      characters: GenshinCharactersSchema_vn1.optional(),
      teams: GenshinTeamsSchema_v0.optional(),
    })
    .optional(),
  preferences: UserPreferencesSchema_v0.optional(),
})

type UserData_vn1 = z.infer<typeof UserDataSchema_vn1>

export { UserDataSchema_vn1, type UserData_vn1 }
