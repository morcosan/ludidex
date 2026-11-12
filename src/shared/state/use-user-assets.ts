import { z } from 'zod'
import { create } from 'zustand'
import { type GenshinElement, type GenshinNation, type GenshinWeaponType } from '../data'
import { type UserAssets } from './types'
import { USER_ASSETS } from './user-assets/data'
import {
  getCharacterBanners,
  getCharacterIcons,
  getElementIcons,
  getGameBackgrounds,
  getGameBanners,
  getGameIcons,
  getNationIcons,
  getWeaponIcons,
} from './user-assets/utils'
import { UserAssetsSchema_v0 } from './user-assets/v0'

interface UserAssetsStore {
  userAssets?: UserAssets | null
  loadUserAssets: () => void
  getGameBanners: () => string[]
  getGameIcons: () => string[]
  getGameBackgrounds: () => string[]
  getElementIcons: () => Record<GenshinElement, string[]>
  getWeaponIcons: () => Record<GenshinWeaponType, string[]>
  getNationIcons: () => Record<GenshinNation, string[]>
  getCharacterIcons: (characterId: string) => string[]
  getCharacterBanners: (characterId: string) => string[]
}

const useUserAssetsStore = create<UserAssetsStore>((set, get) => ({
  userAssets: null,

  loadUserAssets() {
    const stored = USER_ASSETS
    if (!stored) return
    try {
      set({ userAssets: UserAssetsSchema_v0.parse(stored) })
    } catch (error) {
      console.error(`Failed parsing user assets\n`, error instanceof z.ZodError ? z.prettifyError(error) : error)
    }
  },

  getGameBanners() {
    return getGameBanners(get().userAssets)
  },

  getGameIcons() {
    return getGameIcons(get().userAssets)
  },

  getGameBackgrounds() {
    return getGameBackgrounds(get().userAssets)
  },

  getElementIcons() {
    return getElementIcons(get().userAssets)
  },

  getWeaponIcons() {
    return getWeaponIcons(get().userAssets)
  },

  getNationIcons() {
    return getNationIcons(get().userAssets)
  },

  getCharacterIcons(characterId) {
    return getCharacterIcons(characterId, get().userAssets)
  },

  getCharacterBanners(characterId) {
    return getCharacterBanners(characterId, get().userAssets)
  },
}))

export { useUserAssetsStore }
