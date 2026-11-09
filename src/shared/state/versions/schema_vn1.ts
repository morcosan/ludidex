import { z } from 'zod'
import { GENSHIN_CHARACTER_IDS } from '../../data/genshin'
import { CHARACTER_STATUSES, RATING_LABELS, TIER_LIST_LABELS, TIER_LIST_VALUES } from '../../data/settings'

const USER_DATA_VERSION_VN1 = 'v1.3'

const GenshinCharacterSchema_vn1 = z.object({
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

const unpackTeamId_vn1 = (id: string): string[] => id.split('_')

const GenshinTeamSchema_vn1 = z.object({
  name: z.string(),
  rating: z.number().optional(),
  tags: z.array(z.string()).optional(),
})

const GenshinTeamsSchema_vn1 = z.record(z.string(), GenshinTeamSchema_vn1).superRefine((teams, ctx) => {
  for (const teamId of Object.keys(teams)) {
    const characterIds = unpackTeamId_vn1(teamId)
    if (characterIds.length < 1 || characterIds.length > 4) {
      ctx.addIssue({ code: 'custom', message: 'Teams must contain between one and four character IDs', path: [teamId] })
    }
    if (characterIds.some((id) => !GENSHIN_CHARACTER_IDS.includes(id))) {
      ctx.addIssue({ code: 'custom', message: 'Team keys must contain valid character IDs', path: [teamId] })
    }
    if (new Set(characterIds).size !== characterIds.length) {
      ctx.addIssue({ code: 'custom', message: 'Team character IDs must be unique', path: [teamId] })
    }
  }
})

const UserDataSchema_vn1 = z.object({
  version: z.literal(USER_DATA_VERSION_VN1),
  genshin: z
    .object({
      characters: z.record(z.string(), GenshinCharacterSchema_vn1).optional(),
      teams: GenshinTeamsSchema_vn1.optional(),
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
