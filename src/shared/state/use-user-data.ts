import { create } from 'zustand'
import { type GenshinCharacterUserData } from '../data/genshin/user-data'

const STORAGE_KEY = 'app-user-data'

interface UserData {
  genshin: {
    characters: Record<string, GenshinCharacterUserData>
  }
}

interface UserDataStore {
  userData: UserData | null
  loadUserData(): void
  saveUserData(): void
  setGenshinCharacter(characterId: string, data: GenshinCharacterUserData): void
}

const useUserDataStore = create<UserDataStore>((set, get) => ({
  userData: null,

  loadUserData() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return

    try {
      set({ userData: JSON.parse(stored) })
    } catch (error) {
      console.error(`Failed parsing '${STORAGE_KEY}' from local storage\n`, error)
    }
  },

  saveUserData() {
    const { userData } = get()
    if (!userData) return

    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
  },

  setGenshinCharacter(characterId, data) {
    set((state) => {
      const userData = state.userData ?? { genshin: { characters: {} } }
      const characters = { ...userData.genshin.characters }

      if (Object.keys(data).length) {
        characters[characterId] = data
      } else {
        delete characters[characterId]
      }

      return {
        userData: {
          ...userData,
          genshin: {
            ...userData.genshin,
            characters,
          },
        },
      }
    })

    get().saveUserData()
  },
}))

export { useUserDataStore, type UserData }
