import {
  GENSHIN_ELEMENTS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPONS,
  type GenshinElement,
  type GenshinNation,
  type GenshinWeaponType,
} from '../../data'
import { type UserAssets, type UserAssetsCharacterKey, type UserAssetsGameKey, type UserAssetsGroup } from '../types'

type NestedUserAssetsGroup = {
  hosts: Record<string, string[]>
  paths: Record<string, Record<string, string[] | string[][]>>
}

const getFlatGroup = (group: unknown): UserAssetsGroup | undefined => {
  if (!group || typeof group !== 'object') return undefined
  const { hosts, paths } = group as Partial<UserAssetsGroup>
  if (!Array.isArray(hosts) || !paths || typeof paths !== 'object') return undefined
  return { hosts, paths }
}

const getNestedGroup = (group: unknown): NestedUserAssetsGroup | undefined => {
  if (!group || typeof group !== 'object') return undefined
  const { hosts, paths } = group as Partial<NestedUserAssetsGroup>
  if (!hosts || typeof hosts !== 'object' || Array.isArray(hosts)) return undefined
  if (!paths || typeof paths !== 'object' || Array.isArray(paths)) return undefined
  return { hosts, paths }
}

const zipAssetSrcs = (hosts: string[], paths: (string | string[])[]): string[] =>
  hosts.flatMap((host, index) => {
    const path = paths[index]
    if (!path) return []
    return (Array.isArray(path) ? path : [path]).map((hostPath) => `${host}${hostPath}`)
  })

const getAssetSrcs = (group: unknown, key: string): string[] => {
  const flatGroup = getFlatGroup(group)
  const paths = flatGroup?.paths[key]
  if (!flatGroup || !paths) return []
  return zipAssetSrcs(flatGroup.hosts, paths)
}

const getNestedAssetSrcs = (group: unknown, collection: string, key: string): string[] => {
  const nestedGroup = getNestedGroup(group)
  const hosts = nestedGroup?.hosts[collection]
  const paths = nestedGroup?.paths[collection]?.[key]
  if (!hosts || !paths) return []
  return zipAssetSrcs(hosts, paths)
}

const getGameBanners = (userAssets?: UserAssets | null): string[] => {
  return getNestedAssetSrcs(userAssets?.genshin?.game, 'banners' satisfies UserAssetsGameKey, 'default')
}

const getGameIcons = (userAssets?: UserAssets | null): string[] => {
  return getNestedAssetSrcs(userAssets?.genshin?.game, 'icons' satisfies UserAssetsGameKey, 'default')
}

const getGameBackgrounds = (userAssets?: UserAssets | null): string[] => {
  return getNestedAssetSrcs(userAssets?.genshin?.game, 'backgrounds' satisfies UserAssetsGameKey, 'default')
}

const getElementIcons = (userAssets?: UserAssets | null): Record<GenshinElement, string[]> => {
  const group = userAssets?.genshin?.elements
  return Object.fromEntries(
    GENSHIN_ELEMENTS.map((element) => [element, getAssetSrcs(group, element)]), //
  ) as Record<GenshinElement, string[]>
}

const getWeaponIcons = (userAssets?: UserAssets | null): Record<GenshinWeaponType, string[]> => {
  const group = userAssets?.genshin?.weapons
  return Object.fromEntries(
    GENSHIN_WEAPONS.map((weapon) => [weapon, getAssetSrcs(group, weapon)]), //
  ) as Record<GenshinWeaponType, string[]>
}

const getNationIcons = (userAssets?: UserAssets | null): Record<GenshinNation, string[]> => {
  const group = userAssets?.genshin?.nations
  return Object.fromEntries(
    GENSHIN_NATIONS.map((nation) => [nation, getAssetSrcs(group, nation)]), //
  ) as Record<GenshinNation, string[]>
}

const getCharacterIcons = (characterId: string, userAssets?: UserAssets | null): string[] =>
  getNestedAssetSrcs(userAssets?.genshin?.characters, 'icons' satisfies UserAssetsCharacterKey, characterId)

const getCharacterBanners = (characterId: string, userAssets?: UserAssets | null): string[] =>
  getNestedAssetSrcs(userAssets?.genshin?.characters, 'banners' satisfies UserAssetsCharacterKey, characterId)

export {
  getCharacterBanners,
  getCharacterIcons,
  getElementIcons,
  getGameBackgrounds,
  getGameBanners,
  getGameIcons,
  getNationIcons,
  getWeaponIcons,
}
