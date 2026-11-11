import { z } from 'zod'
import { CHARACTER_STATUSES, GENSHIN_CHARACTER_IDS, TIER_LIST_VALUES } from '../../../data'

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

const GenshinCharactersSchema_v0 = z.partialRecord(z.enum(GENSHIN_CHARACTER_IDS), GenshinCharacterSchema_v0)

export { GenshinCharacterSchema_v0, GenshinCharactersSchema_v0 }
