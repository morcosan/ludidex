import { TextField } from '@design-system'
import { useController, type Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { type GenshinTeam } from '../../../state/types'
import { useUserDataStore } from '../../../state/use-user-data'
import { parseUserInput } from '../../../utils/various'
import { ErrorNotice } from '../../_shared/error-notice'
import { type TeamDraft } from './use-draft-utils'

interface TeamNameProps {
  team: GenshinTeam
  editing: boolean
  control: Control<TeamDraft>
}

export const TeamName = (props: TeamNameProps) => {
  const { editing, team, control } = props
  const { t } = useTranslation()
  const teams = useUserDataStore((state) => state.userData?.genshin?.teams)
  const { field, fieldState } = useController({
    control,
    name: 'name',
    rules: {
      validate: (value) => {
        const name = parseUserInput(value).toLowerCase()
        const isDuplicate = Object.entries(teams ?? {}).some(
          ([otherId, otherTeam]) => otherId !== team.id && parseUserInput(otherTeam.name).toLowerCase() === name,
        )
        return name.length > 0 && !isDuplicate
      },
    },
  })
  const invalid = Boolean(fieldState.error)

  return (
    <>
      {editing ? (
        <TextField
          id="team-card-name"
          size="lg"
          value={field.value}
          invalid={invalid}
          placeholder={t('general.label.newTeam')}
          ariaDescribedBy={invalid ? 'team-card-name-error' : undefined}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      ) : (
        <h3 className={cx('line-clamp-2', !team.name && 'text-color-text-placeholder')}>
          {team.name || t('general.label.newTeam')}
        </h3>
      )}
      {editing && invalid && (
        <ErrorNotice id="team-card-name-error" text={t('general.notice.invalidTeamName')} className="mt-xs-1" />
      )}
    </>
  )
}
