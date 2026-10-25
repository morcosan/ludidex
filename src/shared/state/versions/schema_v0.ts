import { z } from 'zod'

const genshinCharacterSchema_v0 = z.object({
  likeScore: z.number().optional(),
  tierScores: z
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
  genshin: z
    .object({
      characters: z.record(z.string(), genshinCharacterSchema_v0),
    })
    .optional(),
})

type UserData_v0 = z.infer<typeof UserDataSchema_v0>

export { UserDataSchema_v0, type UserData_v0 }
