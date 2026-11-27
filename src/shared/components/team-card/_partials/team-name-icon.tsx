import { type Control, useWatch } from 'react-hook-form'
import { GENSHIN_CHARACTERS_BY_ID, type GenshinCharacter } from '../../../data'
import { TeamAvatar } from '../../_shared/team-avatar'
import { type TeamDraft } from './use-draft-utils'

interface TeamNameIconProps extends ReactProps {
  control: Control<TeamDraft>
}

export const TeamNameIcon = ({ control, className }: TeamNameIconProps) => {
  const charIds = useWatch({ control, name: 'charIds' })
  const members = charIds
    .map((id) => GENSHIN_CHARACTERS_BY_ID[id || ''] || null)
    .filter((member): member is GenshinCharacter => Boolean(member))

  return members.length > 0 ? <TeamAvatar members={members} className={className} /> : null
}
