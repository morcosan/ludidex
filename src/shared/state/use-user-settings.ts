import { z } from 'zod'
import { create } from 'zustand'
import { type UserSettings } from './types'
import { UserSettingsSchema } from './user-settings'

const STORAGE_KEY = 'app-user-settings'

interface UserSettingsStore {
  userSettings: UserSettings
  loadUserSettings: () => void
  saveUserSettings: () => void
  updateUserSettings: (userSettings: Partial<UserSettings>) => void
}

const useUserSettingsStore = create<UserSettingsStore>((set, get) => ({
  userSettings: UserSettingsSchema.parse({}),

  loadUserSettings() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    try {
      set({ userSettings: UserSettingsSchema.parse(JSON.parse(stored)) })
    } catch (error) {
      console.error(
        `Failed parsing '${STORAGE_KEY}' from local storage\n`,
        error instanceof z.ZodError ? z.prettifyError(error) : error,
      )
    }
  },

  saveUserSettings() {
    const { userSettings } = get()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userSettings))
  },

  updateUserSettings(userSettings: Partial<UserSettings>) {
    set((state) => ({ userSettings: UserSettingsSchema.parse({ ...state.userSettings, ...userSettings }) }))
    get().saveUserSettings()
  },
}))

export { useUserSettingsStore }
