import { z } from 'zod'
import { GenshinCharacterSchema_v0, GenshinCharactersSchema_v0 } from './_characters'
import { GenshinDomainSchema_v0, GenshinDomainsSchema_v0 } from './_domains'
import { UserPreferencesSchema_v0 } from './_preferences'
import { GenshinTeamSchema_v0, GenshinTeamsSchema_v0, packTeamId_v0, refineTeam_v0, unpackTeamId_v0 } from './_teams'

const USER_DATA_VERSION_V0 = 'v0.5'

const UserDataSchema_v0 = z.object({
  version: z.literal(USER_DATA_VERSION_V0),
  genshin: z
    .object({
      characters: GenshinCharactersSchema_v0.optional(),
      domains: GenshinDomainsSchema_v0.optional(),
      teams: GenshinTeamsSchema_v0.optional(),
    })
    .optional(),
  preferences: UserPreferencesSchema_v0.optional(),
})

type UserData_v0 = z.infer<typeof UserDataSchema_v0>
type GenshinCharacter_v0 = z.infer<typeof GenshinCharacterSchema_v0>
type GenshinDomain_v0 = z.infer<typeof GenshinDomainSchema_v0>
type GenshinTeam_v0 = z.infer<typeof GenshinTeamSchema_v0>

export {
  GenshinCharacterSchema_v0,
  GenshinCharactersSchema_v0,
  GenshinDomainSchema_v0,
  GenshinDomainsSchema_v0,
  GenshinTeamSchema_v0,
  GenshinTeamsSchema_v0,
  packTeamId_v0,
  refineTeam_v0,
  unpackTeamId_v0,
  USER_DATA_VERSION_V0,
  UserPreferencesSchema_v0,
  UserDataSchema_v0,
  type GenshinCharacter_v0,
  type GenshinDomain_v0,
  type GenshinTeam_v0,
  type UserData_v0,
}
