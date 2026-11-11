import { z } from 'zod'
import { create } from 'zustand'
import { RATING_LABELS, TIER_LIST_LABELS } from '../data'
import {
  type GenshinCharacterUserData,
  type GenshinTeamUserData,
  type RatingLabels,
  type TierListLabels,
  type UserData,
} from './types'
import { getLabelOverrides, parseUserData } from './user-data/utils'
import { EMPTY_USER_DATA } from './utils'

const USER_DATA_COOKIE_KEY = 'app-user-data'

interface UserDataStore {
  userData: UserData | null
  loadUserData: () => void
  saveUserData: () => void
  replaceUserData: (userData: UserData) => void
  setRatingLabels: (ratingLabels: Partial<RatingLabels>) => void
  setTierListLabels: (tierListLabels: Partial<TierListLabels>) => void
  setGenshinCharacter: (characterId: string, data: GenshinCharacterUserData | null) => void
  setGenshinTeam: (teamId: string, data: GenshinTeamUserData | null) => void
}

const useUserDataStore = create<UserDataStore>((set, get) => ({
  userData: null,

  loadUserData() {
    const stored = localStorage.getItem(USER_DATA_COOKIE_KEY)
    try {
      get().replaceUserData(stored ? parseUserData(JSON.parse(stored)) : EMPTY_USER_DATA)
    } catch (error) {
      console.error(
        `Failed parsing '${USER_DATA_COOKIE_KEY}' from local storage\n`,
        error instanceof z.ZodError ? z.prettifyError(error) : error,
      )
    }
  },

  saveUserData() {
    const { userData } = get()
    if (!userData) return
    localStorage.setItem(USER_DATA_COOKIE_KEY, JSON.stringify(userData))
  },

  replaceUserData(data: UserData) {
    const parsed = parseUserData(data)
    localStorage.setItem(USER_DATA_COOKIE_KEY, JSON.stringify(parsed))
    set({ userData: { ...parsed, genshin: { ...parsed.genshin, teams: parsed.genshin?.teams } } })
  },

  setRatingLabels(labels: Partial<RatingLabels>) {
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

  setTierListLabels(labels: Partial<TierListLabels>) {
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

  setGenshinCharacter(characterId: string, data: GenshinCharacterUserData | null) {
    set((state) => {
      const userData = state.userData ?? EMPTY_USER_DATA
      const characters = { ...userData.genshin?.characters }

      if (data) {
        const { rating, status, tierLists, stats, talents, tags } = data
        characters[characterId] = { rating, status, tierLists, stats, talents, tags }
      } else {
        delete characters[characterId]
      }

      return { userData: { ...userData, genshin: { ...userData.genshin, characters } } }
    })
    get().saveUserData()
  },

  setGenshinTeam(teamId: string, data: GenshinTeamUserData | null) {
    set((state) => {
      const userData = state.userData ?? EMPTY_USER_DATA
      const teams = { ...userData.genshin?.teams }

      if (data) {
        const { name, rating, tags } = data
        teams[teamId] = { name, rating, tags }
      } else {
        delete teams[teamId]
      }

      return { userData: { ...userData, genshin: { ...userData.genshin, teams } } }
    })
    get().saveUserData()
  },
}))

export { parseUserData, USER_DATA_COOKIE_KEY, useUserDataStore }
