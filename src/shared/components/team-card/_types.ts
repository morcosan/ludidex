import type { GenshinTeam, GenshinUserData, UserPrefs } from '../../state/types'

export interface TeamCardProps extends ReactProps {
  team: GenshinTeam
  userData?: GenshinUserData
  userPrefs?: UserPrefs
  opened?: boolean
  onClose?: () => void
  onSave?: (team: GenshinTeam) => void
  onDelete?: (team: GenshinTeam) => void
}
