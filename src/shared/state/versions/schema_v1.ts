import { GENSHIN_CHARACTERS } from '@app-shared/data/genshin'
import { CHARACTER_STATUSES, RATING_LABELS, TIER_LIST_LABELS, TIER_LIST_VALUES } from '@app-shared/data/settings'
import { z } from 'zod'

const USER_DATA_VERSION_V1 = 'v1.3'

const GenshinCharacterSchema_v1 = z.object({
  rating: z.number().optional(),
  status: z.enum(CHARACTER_STATUSES).optional(),
  tierLists: z
    .object({
      mainDps: z.enum(TIER_LIST_VALUES).optional(),
      subDps: z.enum(TIER_LIST_VALUES).optional(),
      support: z.enum(TIER_LIST_VALUES).optional(),
      exploration: z.enum(TIER_LIST_VALUES).optional(),
      outfit: z.enum(TIER_LIST_VALUES).optional(),
      personality: z.enum(TIER_LIST_VALUES).optional(),
    })
    .optional(),
  stats: z
    .object({
      level: z.number().optional(),
      hp: z.number().optional(),
      atk: z.number().optional(),
      def: z.number().optional(),
      critDmg: z.number().optional(),
      critRate: z.number().optional(),
      elemDmg: z.number().optional(),
      em: z.number().optional(),
      er: z.number().optional(),
    })
    .optional(),
  talents: z
    .object({
      conLv: z.number().optional(),
      attackLv: z.number().optional(),
      skillLv: z.number().optional(),
      burstLv: z.number().optional(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
})

const CHARACTER_IDS = new Set(GENSHIN_CHARACTERS.map(({ id }) => id))

const unpackTeamId = (id: string): string[] => id.split('_')
const packTeamId = (charIds: string[]): string => charIds.join('_')

const GenshinTeamSchema_v1 = z.object({
  name: z.string(),
  rating: z.number().optional(),
  tags: z.array(z.string()).optional(),
})

const GenshinTeamsSchema_v1 = z.record(z.string(), GenshinTeamSchema_v1).superRefine((teams, ctx) => {
  for (const teamId of Object.keys(teams)) {
    const characterIds = unpackTeamId(teamId)
    if (characterIds.length < 1 || characterIds.length > 4) {
      ctx.addIssue({ code: 'custom', message: 'Teams must contain between one and four character IDs', path: [teamId] })
    }
    if (characterIds.some((id) => !CHARACTER_IDS.has(id))) {
      ctx.addIssue({ code: 'custom', message: 'Team keys must contain valid character IDs', path: [teamId] })
    }
    if (new Set(characterIds).size !== characterIds.length) {
      ctx.addIssue({ code: 'custom', message: 'Team character IDs must be unique', path: [teamId] })
    }
  }
})

const UserDataSchema_v1 = z.object({
  version: z.literal(USER_DATA_VERSION_V1),
  genshin: z
    .object({
      characters: z.record(z.string(), GenshinCharacterSchema_v1).optional(),
      teams: GenshinTeamsSchema_v1.optional(),
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

type UserData_v1 = z.infer<typeof UserDataSchema_v1>
type GenshinCharacter_v1 = z.infer<typeof GenshinCharacterSchema_v1>
type GenshinTeam_v1 = z.infer<typeof GenshinTeamSchema_v1>

export {
  packTeamId,
  unpackTeamId,
  USER_DATA_VERSION_V1,
  UserDataSchema_v1,
  type GenshinCharacter_v1,
  type GenshinTeam_v1,
  type UserData_v1,
}
