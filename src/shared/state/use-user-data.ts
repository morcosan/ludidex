import { create } from 'zustand'
import { RATING_LABELS, TIER_LIST_LABELS } from '../data/settings'
import { getLabelOverrides, parseUserData } from './_utils'
import {
  EMPTY_USER_DATA,
  type GenshinCharacterUserData,
  type RatingLabels,
  type TierListLabels,
  type UserData,
} from './types'

const USER_DATA_COOKIE_KEY = 'app-user-data'

interface UserDataStore {
  userData: UserData | null
  loadUserData(): void
  saveUserData(): void
  replaceUserData(userData: UserData): void
  setRatingLabels(ratingLabels: Partial<RatingLabels>): void
  setTierListLabels(tierListLabels: Partial<TierListLabels>): void
  setGenshinCharacter(characterId: string, data: GenshinCharacterUserData): void
}

const useUserDataStore = create<UserDataStore>((set, get) => ({
  userData: null,

  loadUserData() {
    const stored = localStorage.getItem(USER_DATA_COOKIE_KEY)
    if (!stored) return
    try {
      get().replaceUserData(parseUserData(JSON.parse(stored)))
    } catch (error) {
      console.error(`Failed parsing '${USER_DATA_COOKIE_KEY}' from local storage\n`, error)
    }
  },

  saveUserData() {
    const { userData } = get()
    if (!userData) return
    localStorage.setItem(USER_DATA_COOKIE_KEY, JSON.stringify(userData))
  },

  replaceUserData(data) {
    const parsed = parseUserData(data)
    localStorage.setItem(USER_DATA_COOKIE_KEY, JSON.stringify(parsed))
    set({ userData: parsed })
  },

  setRatingLabels(labels) {
    set((state) => {
      const userData = state.userData ?? EMPTY_USER_DATA
      return {
        userData: {
          ...userData,
          preferences: { ...userData.preferences, ratingLabels: getLabelOverrides(labels, RATING_LABELS) },
        },
      }
    })
    get().saveUserData()
  },

  setTierListLabels(labels) {
    set((state) => {
      const userData = state.userData ?? EMPTY_USER_DATA
      return {
        userData: {
          ...userData,
          preferences: { ...userData.preferences, tierListLabels: getLabelOverrides(labels, TIER_LIST_LABELS) },
        },
      }
    })
    get().saveUserData()
  },

  setGenshinCharacter(characterId, data) {
    set((state) => {
      const userData = state.userData ?? EMPTY_USER_DATA
      const characters = { ...userData.genshin?.characters }

      if (Object.keys(data).length) {
        characters[characterId] = data
      } else {
        delete characters[characterId]
      }

      return { userData: { ...userData, genshin: { ...userData.genshin, characters } } }
    })
    get().saveUserData()
  },
}))

export { parseUserData, USER_DATA_COOKIE_KEY, useUserDataStore }
