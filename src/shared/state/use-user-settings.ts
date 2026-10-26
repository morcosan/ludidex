import { create } from 'zustand'
import { type DisplaySize, type UserSettings, UserSettingsSchema } from './types'

const STORAGE_KEY = 'app-user-settings'

interface UserSettingsStore {
  userSettings: UserSettings | null
  loadUserSettings(): void
  saveUserSettings(): void
  setDisplaySize(displaySize: DisplaySize): void
}

const useUserSettingsStore = create<UserSettingsStore>((set, get) => ({
  userSettings: null,

  loadUserSettings() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    try {
      set({ userSettings: UserSettingsSchema.parse(JSON.parse(stored)) })
    } catch (error) {
      console.error(`Failed parsing '${STORAGE_KEY}' from local storage\n`, error)
    }
  },

  saveUserSettings() {
    const { userSettings } = get()
    if (!userSettings) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userSettings))
  },

  setDisplaySize(displaySize) {
    set((state) => ({ userSettings: UserSettingsSchema.parse({ ...state.userSettings, displaySize }) }))
    get().saveUserSettings()
  },
}))

export { useUserSettingsStore }
