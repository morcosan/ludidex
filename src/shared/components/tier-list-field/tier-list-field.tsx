import { type TierListLabels } from '@app-shared/state/types'
import { SelectField, type SelectOption } from '@design-system'
import { TIER_LIST_VALUES, type TierListValue } from '../../data/settings'
import { TierListIcon } from '../tier-list-icon/tier-list-icon'

export interface TierListFieldProps extends ReactProps {
  value?: TierListValue
  labels: TierListLabels
  readonly?: boolean
  iconPos?: 'left' | 'right'
  className?: string
  onChange?: (value: TierListValue | undefined) => void
}

export const TierListField = (props: TierListFieldProps) => {
  const { value, labels, iconPos = 'left', readonly, className, onChange } = props
  const options: SelectOption[] = [
    ...TIER_LIST_VALUES.map((tier) => ({ value: tier, label: labels[tier] })),
    { value: '', label: '--' },
  ]
  const label = value ? labels[value] : '--'

  if (readonly) {
    return (
      <div className={cx('h-field-h-xs flex max-w-full items-center', iconPos === 'right' && 'justify-end', className)}>
        {value && iconPos === 'left' && <TierListIcon value={value} className="mr-xs-1" />}
        <span className="min-w-sm-0 flex-center font-weight-lg text-size-sm flex leading-1">{label}</span>
        {value && iconPos === 'right' && <TierListIcon value={value} className="ml-xs-1" />}
      </div>
    )
  }
  return (
    <SelectField
      id="tier-list-field"
      size="xs"
      value={value ?? ''}
      prefix={value ? <TierListIcon value={value} /> : undefined}
      options={options}
      optionFn={(option) => {
        const tier = TIER_LIST_VALUES.find((tier) => tier === option.value)
        return (
          <span className="px-xs-1 flex items-center">
            {tier && <TierListIcon value={tier} className="mr-xs-1" />}
            <span className="min-w-sm-0 flex-center text-size-sm flex leading-1">{option.label}</span>
          </span>
        )
      }}
      optionClass="px-0!"
      className={cx('min-w-md-3', className)}
      onChange={(selected) => onChange?.(TIER_LIST_VALUES.find((tier) => tier === selected))}
    />
  )
}
