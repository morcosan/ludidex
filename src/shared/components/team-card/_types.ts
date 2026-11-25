import type { GenshinTeam, GenshinTeamUserData } from '../../state/types'

export interface TeamCardProps extends ReactProps {
  team: GenshinTeam
  opened?: boolean
  editing?: boolean
  onClose?: () => void
  onSave?: (team: GenshinTeam) => void
  onDelete?: (team: GenshinTeam) => void
}

export type GenshinTierLists = NonNullable<GenshinTeamUserData['tierLists']>
