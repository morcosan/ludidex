import { z } from 'zod'
import { RATING_LABELS, TIER_LIST_LABELS } from '../../../data'
import { GenshinCharactersSchema_v0, GenshinTeamsSchema_v0 } from '../v0'

const USER_DATA_VERSION_VN1 = 'v1.3'

const UserDataSchema_vn1 = z.object({
  version: z.literal(USER_DATA_VERSION_VN1),
  genshin: z
    .object({
      characters: GenshinCharactersSchema_v0.optional(),
      teams: GenshinTeamsSchema_v0.optional(),
    })
    .optional(),
  preferences: z
    .object({
      ratingLabels: z
        .object(Object.fromEntries(Object.keys(RATING_LABELS).map((key) => [key, z.string().optional()])))
        .optional(),
      tierListLabels: z
        .object(Object.fromEntries(Object.keys(TIER_LIST_LABELS).map((key) => [key, z.string().optional()])))
        .optional(),
    })
    .optional(),
})

type UserData_vn1 = z.infer<typeof UserDataSchema_vn1>

export { UserDataSchema_vn1, type UserData_vn1 }
