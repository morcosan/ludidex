import { CHARACTER_STATUSES, RATING_LABELS, TIER_LIST_LABELS, TIER_LIST_VALUES } from '@app-shared/data/settings'
import { z } from 'zod'

const USER_DATA_VERSION_V0 = 'v1.2'

const GenshinCharacterSchema_v0 = z.object({
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

const UserDataSchema_v0 = z.object({
  version: z.literal(USER_DATA_VERSION_V0),
  genshin: z
    .object({
      characters: z.record(z.string(), GenshinCharacterSchema_v0),
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

export { UserDataSchema_v0, type UserData_v0 }
