import { TIER_LIST_VALUES, type TierListValue } from '../../data'
import { type TierListLabels } from '../../state/types'
import { useFieldBase } from '../_shared/use-field-base'
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

  return useFieldBase({
    id: 'tier-list-field',
    value,
    values: TIER_LIST_VALUES,
    labelWidth: 'sm',
    iconPos: iconPos,
    readonly,
    className,
    getLabel: (tier) => labels[tier],
    renderIcon: (tier, iconClassName) => <TierListIcon value={tier} className={iconClassName} />,
    onChange,
  })
}
