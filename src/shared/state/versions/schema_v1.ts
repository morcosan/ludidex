import { CHARACTER_STATUSES, RATING_LABELS } from '@app-shared/data/settings'
import { z } from 'zod'

const CharacterStatusSchema_v1 = z.enum(CHARACTER_STATUSES)

const GenshinCharacterSchema_v1 = z.object({
  rating: z.number().optional(),
  status: CharacterStatusSchema_v1.optional(),
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

const UserDataSchema_v1 = z.object({
  version: z.literal('v1'),
  genshin: z
    .object({
      characters: z.record(z.string(), GenshinCharacterSchema_v1),
    })
    .optional(),
  preferences: z
    .object({
      ratingLabels: z
        .object(Object.fromEntries(Object.keys(RATING_LABELS).map((key) => [key, z.string().optional()])))
        .optional(),
    })
    .optional(),
})

type UserData_v1 = z.infer<typeof UserDataSchema_v1>
type GenshinCharacter_v1 = z.infer<typeof GenshinCharacterSchema_v1>
type GenshinCharacterStatus_v1 = z.infer<typeof CharacterStatusSchema_v1>

export { UserDataSchema_v1, type GenshinCharacter_v1, type GenshinCharacterStatus_v1, type UserData_v1 }
