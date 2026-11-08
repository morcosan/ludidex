import type { GenshinTeam, GenshinUserData, UserPrefs, UserSettings } from '../../state/types'

export interface TeamCardProps extends ReactProps {
  team: GenshinTeam
  userData?: GenshinUserData
  userPrefs?: UserPrefs
  userSettings?: UserSettings | null
  opened?: boolean
  editing?: boolean
  onClose?: () => void
  onSave?: (team: GenshinTeam) => void
  onDelete?: (team: GenshinTeam) => void
}
