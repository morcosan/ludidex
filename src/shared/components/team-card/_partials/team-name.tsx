import { TextField } from '@design-system'
import { useTranslation } from 'react-i18next'
import { ErrorNotice } from './error-notice'

interface TeamNameProps extends ReactProps {
  name: string
  value: string
  sticky?: boolean
  editing?: boolean
  invalid?: boolean
  onChange?: (value: string) => void
  onBlur?: () => void
}

export const TeamName = (props: TeamNameProps) => {
  const { ref, name, value, sticky, editing, invalid, onChange, onBlur } = props
  const { t } = useTranslation()

  return (
    <div
      ref={ref}
      className={cx(
        'my-xs-2 -top-xs-0 px-xs-8 py-xs-2 sticky z-10',
        'bg-color-bg-card rounded-t-md transition-[padding] ease-in-out',
        sticky && 'border-color-border-subtle shadow-below-sm',
      )}
    >
      {editing ? (
        <TextField
          id="team-card-name"
          size="md"
          value={value}
          invalid={invalid}
          ariaDescribedBy={invalid ? 'team-card-name-error' : undefined}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <h3 className="text-size-xl font-weight-lg h-field-h-md flex items-center">
          <span className={cx('truncate', !name && 'text-color-text-placeholder')}>
            {name || t('general.label.newTeam')}
          </span>
        </h3>
      )}
      {editing && invalid && (
        <ErrorNotice id="team-card-name-error" text={t('general.notice.invalidTeamName')} className="mt-xs-1" />
      )}
    </div>
  )
}
