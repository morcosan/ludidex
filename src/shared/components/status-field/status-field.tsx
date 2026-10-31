import { CHARACTER_STATUSES, type CharacterStatus } from '@app-shared/data/settings'
import { useTranslation } from 'react-i18next'
import { useFieldBase } from '../_shared/use-field-base'
import { StatusIcon } from '../status-icon/status-icon'

export interface StatusFieldProps extends ReactProps {
  value?: CharacterStatus
  readonly?: boolean
  className?: string
  onChange?: (value: CharacterStatus | undefined) => void
}

export const StatusField = (props: StatusFieldProps) => {
  const { value, readonly, className, onChange } = props
  const { t } = useTranslation()

  return useFieldBase({
    id: 'status-field',
    value,
    values: CHARACTER_STATUSES,
    readonly,
    className,
    getLabel: (status) => t(`game.label.${status}`),
    renderIcon: (status, iconClassName) => <StatusIcon value={status} className={iconClassName} />,
    onChange,
  })
}
