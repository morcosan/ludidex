import { create } from 'zustand'
import { RATING_LABELS } from '../data/settings'
import { EMPTY_USER_DATA, type GenshinCharacterUserData, type RatingLabels, type UserData } from './types'
import { migrate_v0_to_v1 } from './versions/migrate_v0_to_v1'
import { UserDataSchema_v0 } from './versions/schema_v0'
import { UserDataSchema_v1 } from './versions/schema_v1'

const USER_DATA_COOKIE_KEY = 'app-user-data'

interface UserDataStore {
  userData: UserData | null
  loadUserData(): void
  saveUserData(): void
  replaceUserData(userData: UserData): void
  setRatingLabels(ratingLabels: Partial<RatingLabels>): void
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
    const overrides: Partial<RatingLabels> = {}
    for (const key of Object.keys(RATING_LABELS) as (keyof RatingLabels)[]) {
      const label = labels[key]
      if (label && label !== RATING_LABELS[key]) overrides[key] = label
    }

    set((state) => {
      const userData = state.userData ?? EMPTY_USER_DATA
      return { userData: { ...userData, preferences: { ...userData.preferences, ratingLabels: overrides } } }
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

const parseUserData = (data: unknown): UserData => {
  const versions = [
    { schema: UserDataSchema_v1, migrate: (v: unknown) => v },
    { schema: UserDataSchema_v0, migrate: migrate_v0_to_v1 },
  ]

  for (let i = 0; i < versions.length; i++) {
    let result = versions[i].schema.safeParse(data)
    if (!result.success) continue

    // Migrate iteratively from one version to the next
    for (let j = i; j > 0 && result.success; j--) {
      const migrate = versions[j].migrate as (data: unknown) => unknown
      result = versions[j - 1].schema.safeParse(migrate(result.data))
    }

    if (result.success) return result.data as UserData
  }

  throw null
}

export { parseUserData, USER_DATA_COOKIE_KEY, useUserDataStore }
