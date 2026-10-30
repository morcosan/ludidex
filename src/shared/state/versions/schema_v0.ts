import { z } from 'zod'

const USER_DATA_VERSION_V0 = 'v1.1'
const CHARACTER_STATUSES_V0 = ['active', 'benched', 'pulling', 'missing', 'ignored'] as const
const RATING_LABEL_KEYS_V0 = ['-1', '0', '1', '2', '3', '4', '5'] as const

const GenshinCharacterSchema_v0 = z.object({
  rating: z.number().optional(),
  status: z.enum(CHARACTER_STATUSES_V0).optional(),
  tierLists: z
    .object({
      mainDps: z.number().optional(),
      subDps: z.number().optional(),
      support: z.number().optional(),
      exploration: z.number().optional(),
      outfit: z.number().optional(),
      personality: z.number().optional(),
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
        .object(Object.fromEntries(RATING_LABEL_KEYS_V0.map((key) => [key, z.string().optional()])))
        .optional(),
    })
    .optional(),
})

type UserData_v0 = z.infer<typeof UserDataSchema_v0>

export { UserDataSchema_v0, type UserData_v0 }
