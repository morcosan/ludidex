import { z } from 'zod'

const genshinCharacterUserDataSchema = z.object({
  favorite: z.number().optional(),
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

type GenshinCharacterUserData = z.infer<typeof genshinCharacterUserDataSchema>

export { genshinCharacterUserDataSchema, type GenshinCharacterUserData }
