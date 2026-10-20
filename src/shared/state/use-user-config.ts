import { create } from 'zustand'

const STORAGE_KEY = 'app-user-config'

type DisplaySize = 'small' | 'medium' | 'large'

interface UserConfig {
  displaySize: DisplaySize
}

interface UserConfigStore {
  userConfig: UserConfig | null
  loadUserConfig(): void
  saveUserConfig(): void
  setDisplaySize(displaySize: DisplaySize): void
}

const useUserConfigStore = create<UserConfigStore>((set, get) => ({
  userConfig: null,

  loadUserConfig() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return

    try {
      set({ userConfig: JSON.parse(stored) })
    } catch (error) {
      console.error(`Failed parsing '${STORAGE_KEY}' from local storage\n`, error)
    }
  },

  saveUserConfig() {
    const { userConfig } = get()
    if (!userConfig) return

    localStorage.setItem(STORAGE_KEY, JSON.stringify(userConfig))
  },

  setDisplaySize(displaySize) {
    set((state) => ({
      userConfig: { ...state.userConfig, displaySize },
    }))

    get().saveUserConfig()
  },
}))

export { useUserConfigStore, type DisplaySize }
