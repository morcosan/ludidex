import { CHARACTER_STATUSES, type CharacterStatus } from '@app-shared/data/settings'
import { SelectField, type SelectOption } from '@design-system'
import { useTranslation } from 'react-i18next'
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
  const options: SelectOption[] = [
    ...CHARACTER_STATUSES.map((status) => ({ value: status, label: t(`game.label.${status}`) })),
    { value: '', label: '--' },
  ]
  const label = value ? t(`game.label.${value}`) : '--'

  if (readonly) {
    return (
      <div className={cx('text-size-sm h-field-h-xs font-weight-lg px-xs-0 flex items-center', className)}>
        {value && <StatusIcon value={value} className="mr-xs-1" />} {label}
      </div>
    )
  }
  return (
    <SelectField
      id="status-field"
      value={value ?? ''}
      options={options}
      prefix={value ? <StatusIcon value={value} className="translate-x-xs-1 mr-xs-1" /> : undefined}
      optionFn={(option) => {
        const status = CHARACTER_STATUSES.find((status) => status === option.value)
        return (
          <span className="flex items-center">
            {status && <StatusIcon value={status} className="mr-xs-1" />}
            {option.label}
          </span>
        )
      }}
      size="xs"
      className={className}
      onChange={(status) => onChange?.(CHARACTER_STATUSES.find((value) => value === status))}
    />
  )
}
