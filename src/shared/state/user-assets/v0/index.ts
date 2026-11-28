import { z } from 'zod'
import {
  GENSHIN_CHARACTER_IDS,
  GENSHIN_DAMAGE_TYPES,
  GENSHIN_DOMAIN_IDS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPON_TYPES,
  type GenshinNation,
} from '../../../data'

type GenshinNationWithIcon = Exclude<GenshinNation, 'other'>
type UserAssetsGroup_v0 = {
  hosts: string[]
  paths: Record<string, string[] | string[][]>
}

const HostsSchema_v0 = z.array(z.string())
const PathsSchema_v0 = z.array(z.string())

const UserAssetsSchema_v0 = z.object({
  genshin: z.object({
    game: z.object({
      hosts: z.object({
        icons: HostsSchema_v0,
        banners: HostsSchema_v0,
        backgrounds: HostsSchema_v0,
      }),
      paths: z.object({
        icons: z.object({ default: PathsSchema_v0 }),
        banners: z.object({ default: z.array(PathsSchema_v0) }),
        backgrounds: z.object({ default: PathsSchema_v0 }),
      }),
    }),
    elements: z.object({
      hosts: HostsSchema_v0,
      paths: z.record(z.enum(GENSHIN_DAMAGE_TYPES), PathsSchema_v0),
    }),
    weapons: z.object({
      hosts: HostsSchema_v0,
      paths: z.record(z.enum(GENSHIN_WEAPON_TYPES), PathsSchema_v0),
    }),
    nations: z.object({
      hosts: HostsSchema_v0,
      paths: z.record(
        z.enum(GENSHIN_NATIONS.filter((nation): nation is GenshinNationWithIcon => nation !== 'other')),
        PathsSchema_v0,
      ),
    }),
    characters: z.object({
      hosts: z.object({
        icons: HostsSchema_v0,
        banners: HostsSchema_v0,
      }),
      paths: z.object({
        icons: z.partialRecord(z.enum(GENSHIN_CHARACTER_IDS), PathsSchema_v0),
        banners: z.partialRecord(z.enum(GENSHIN_CHARACTER_IDS), PathsSchema_v0),
      }),
    }),
    domains: z.object({
      hosts: HostsSchema_v0,
      paths: z.partialRecord(z.enum(GENSHIN_DOMAIN_IDS), PathsSchema_v0),
    }),
  }),
})

type UserAssets_v0 = z.infer<typeof UserAssetsSchema_v0>
type UserAssetsGameKey_v0 = keyof UserAssets_v0['genshin']['game']['paths']
type UserAssetsCharacterKey_v0 = keyof UserAssets_v0['genshin']['characters']['paths']

export {
  UserAssetsSchema_v0,
  type UserAssets_v0,
  type UserAssetsCharacterKey_v0,
  type UserAssetsGameKey_v0,
  type UserAssetsGroup_v0,
}
