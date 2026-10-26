import { CHARACTER_STATUSES } from '@app-shared/data/settings'
import { SelectField, type SelectOption } from '@design-system'
import { ArchiveIcon, BadgeCheckIcon, BanIcon, HeartCrackIcon, LoaderIcon } from 'lucide-react'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { type CharacterStatus } from '../../state/types'

const STATUS_ICONS: Record<CharacterStatus, ReactNode> = {
  active: <BadgeCheckIcon strokeWidth={2.5} className="w-xs-8 mr-xs-2 text-color-green-9" />,
  benched: <ArchiveIcon strokeWidth={2.5} className="w-xs-7 mr-xs-2 text-color-text-subtle" />,
  pulling: <LoaderIcon strokeWidth={2.5} className="w-xs-7 mr-xs-2 text-color-blue-9" />,
  missing: <HeartCrackIcon strokeWidth={2.5} className="w-xs-7 mr-xs-2 text-color-button-caution-text" />,
  skipped: <BanIcon strokeWidth={2.5} className="w-xs-7 mr-xs-2 text-color-text-subtle" />,
}

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
      <div className={cx('text-size-sm h-field-h-xs flex-center font-weight-lg px-xs-0 flex', className)}>
        {value && STATUS_ICONS[value]} {label}
      </div>
    )
  }
  return (
    <SelectField
      id="status-field"
      value={value ?? ''}
      options={options}
      prefix={value ? <span className="translate-x-xs-1">{STATUS_ICONS[value]}</span> : undefined}
      optionFn={(option) => {
        const status = CHARACTER_STATUSES.find((status) => status === option.value)
        return (
          <span className="flex items-center">
            {status && STATUS_ICONS[status]}
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
