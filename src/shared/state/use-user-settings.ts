import { create } from 'zustand'
import { userSettingsSchema, type DisplaySize, type UserSettings } from './_user-settings'

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
        set({ userSettings: userSettingsSchema.parse(JSON.parse(stored)) })
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
      set((state) => ({ userSettings: userSettingsSchema.parse({ ...state.userSettings, displaySize }) }))
      get().saveUserSettings()
    },

}))

export * from './_user-settings'
export { useUserSettingsStore }
