import { create } from 'zustand'
import { type CharacterLabel, type ItemSize, type UserSettings, UserSettingsSchema } from './types'

const STORAGE_KEY = 'app-user-settings'

interface UserSettingsStore {
  userSettings: UserSettings | null
  loadUserSettings(): void
  saveUserSettings(): void
  setCharItemSize(charItemSize: ItemSize): void
  setCharLabelTop(charLabelTop: CharacterLabel | null): void
  setCharLabelBottom(charLabelBottom: CharacterLabel | null): void
  setTeamItemSize(teamItemSize: ItemSize): void
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

  setCharItemSize(charItemSize: ItemSize) {
    set((state) => ({ userSettings: UserSettingsSchema.parse({ ...state.userSettings, charItemSize }) }))
    get().saveUserSettings()
  },

  setCharLabelTop(charLabelTop: CharacterLabel | null) {
    set((state) => {
      const userSettings = { ...state.userSettings }
      if (charLabelTop === null) {
        delete userSettings.charLabelTop
      } else {
        userSettings.charLabelTop = charLabelTop
      }
      return { userSettings: UserSettingsSchema.parse(userSettings) }
    })
    get().saveUserSettings()
  },

  setCharLabelBottom(charLabelBottom: CharacterLabel | null) {
    set((state) => {
      const userSettings = { ...state.userSettings }
      if (charLabelBottom === null) {
        delete userSettings.charLabelBottom
      } else {
        userSettings.charLabelBottom = charLabelBottom
      }
      return { userSettings: UserSettingsSchema.parse(userSettings) }
    })
    get().saveUserSettings()
  },

  setTeamItemSize(teamItemSize: ItemSize) {
    set((state) => ({ userSettings: UserSettingsSchema.parse({ ...state.userSettings, teamItemSize }) }))
    get().saveUserSettings()
  },
}))

export { useUserSettingsStore }
