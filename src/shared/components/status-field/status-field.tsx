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
      <div className={cx('h-field-h-xs flex max-w-full items-center', className)}>
        {value && <StatusIcon value={value} className="mr-xs-0" />}{' '}
        <span className="min-w-xs-9 flex-center font-weight-lg text-size-sm flex leading-1">{label}</span>
      </div>
    )
  }
  return (
    <SelectField
      id="status-field"
      size="xs"
      value={value ?? ''}
      prefix={value ? <StatusIcon value={value} /> : undefined}
      options={options}
      optionFn={(option) => {
        const status = CHARACTER_STATUSES.find((status) => status === option.value)
        return (
          <span className="px-xs-1 flex items-center">
            {status && <StatusIcon value={status} className="mr-xs-1" />}
            <span className="min-w-xs-9 flex-center text-size-sm flex leading-1">{option.label}</span>
          </span>
        )
      }}
      classNames={{ option: 'px-0!' }}
      className={className}
      onChange={(status) => onChange?.(CHARACTER_STATUSES.find((value) => value === status))}
    />
  )
}
