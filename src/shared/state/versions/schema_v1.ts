import { genshinCharacterUserDataSchema } from '@app-shared/data/genshin/user-data'
import { FAVORITE_LABELS } from '@app-shared/data/settings'
import { z } from 'zod'

const UserDataSchema_v1 = z.object({
  version: z.literal('v1'),
  genshin: z
    .object({
      characters: z.record(z.string(), genshinCharacterUserDataSchema),
    })
    .optional(),
  preferences: z
    .object({
      favoriteLabels: z
        .object(Object.fromEntries(Object.keys(FAVORITE_LABELS).map((key) => [key, z.string().optional()])))
        .default({}),
    })
    .optional(),
})

type UserData_v1 = z.infer<typeof UserDataSchema_v1>

export { UserDataSchema_v1, type UserData_v1 }
