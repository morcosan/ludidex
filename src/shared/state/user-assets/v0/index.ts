import { z } from 'zod'
import {
  GENSHIN_CHARACTER_IDS,
  GENSHIN_ELEMENTS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPONS,
  type GenshinNation,
} from '../../../data'

const HostsSchema_v0 = z.array(z.string())
const PathsSchema_v0 = z.array(z.string())
const GroupSchema_v0 = z.object({
  hosts: HostsSchema_v0,
  paths: z.record(z.string(), z.union([PathsSchema_v0, z.array(PathsSchema_v0)])),
})

const createPathsSchema = <K extends string>(keys: readonly K[]) => {
  return z.object(Object.fromEntries(keys.map((key) => [key, PathsSchema_v0])) as Record<K, typeof PathsSchema_v0>)
}

const GenshinGameSchema_v0 = z.object({
  hosts: z.object({
    icons: HostsSchema_v0,
    banners: HostsSchema_v0,
    backgrounds: HostsSchema_v0,
  }),
  paths: z.object({
    icons: z.object({
      default: PathsSchema_v0,
    }),
    banners: z.object({
      default: z.array(PathsSchema_v0),
    }),
    backgrounds: z.object({
      default: PathsSchema_v0,
    }),
  }),
})

const GenshinElementsSchema_v0 = z.object({
  hosts: HostsSchema_v0,
  paths: createPathsSchema(GENSHIN_ELEMENTS),
})

const GenshinWeaponsSchema_v0 = z.object({
  hosts: HostsSchema_v0,
  paths: createPathsSchema(GENSHIN_WEAPONS),
})

type GenshinNationWithIcon = Exclude<GenshinNation, 'other'>

const GenshinNationsSchema_v0 = z.object({
  hosts: HostsSchema_v0,
  paths: createPathsSchema(GENSHIN_NATIONS.filter((nation): nation is GenshinNationWithIcon => nation !== 'other')),
})

const GenshinCharactersSchema_v0 = z.object({
  hosts: z.object({
    icons: HostsSchema_v0,
    banners: HostsSchema_v0,
  }),
  paths: z.object({
    icons: z.partialRecord(z.enum(GENSHIN_CHARACTER_IDS), PathsSchema_v0),
    banners: z.partialRecord(z.enum(GENSHIN_CHARACTER_IDS), PathsSchema_v0),
  }),
})

const UserAssetsSchema_v0 = z.object({
  genshin: z.object({
    game: GenshinGameSchema_v0,
    elements: GenshinElementsSchema_v0,
    weapons: GenshinWeaponsSchema_v0,
    nations: GenshinNationsSchema_v0,
    characters: GenshinCharactersSchema_v0,
  }),
})

type UserAssets_v0 = z.infer<typeof UserAssetsSchema_v0>
type UserAssetsGroup_v0 = z.infer<typeof GroupSchema_v0>
type UserAssetsGameKey_v0 = keyof UserAssets_v0['genshin']['game']['paths']
type UserAssetsCharacterKey_v0 = keyof UserAssets_v0['genshin']['characters']['paths']

export {
  UserAssetsSchema_v0,
  type UserAssets_v0,
  type UserAssetsCharacterKey_v0,
  type UserAssetsGameKey_v0,
  type UserAssetsGroup_v0,
}
