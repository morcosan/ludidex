import { z } from 'zod'
import { RATING_LABELS, TIER_LIST_LABELS } from '../../../data'
import { GenshinCharacterSchema_v0, GenshinCharactersSchema_v0 } from './_characters'
import { GenshinTeamSchema_v0, GenshinTeamsSchema_v0, packTeamId_v0, unpackTeamId_v0 } from './_teams'

const USER_DATA_VERSION_V0 = 'v0.4'

const UserDataSchema_v0 = z.object({
  version: z.literal(USER_DATA_VERSION_V0),
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

type UserData_v0 = z.infer<typeof UserDataSchema_v0>
type GenshinCharacter_v0 = z.infer<typeof GenshinCharacterSchema_v0>
type GenshinTeam_v0 = z.infer<typeof GenshinTeamSchema_v0>

export {
  GenshinCharactersSchema_v0,
  GenshinTeamsSchema_v0,
  packTeamId_v0,
  unpackTeamId_v0,
  USER_DATA_VERSION_V0,
  UserDataSchema_v0,
  type GenshinCharacter_v0,
  type GenshinTeam_v0,
  type UserData_v0,
}
