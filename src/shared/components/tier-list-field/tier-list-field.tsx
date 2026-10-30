import { type TierListLabels } from '@app-shared/state/types'
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
  const tierIcon = value ? (
    <TierListIcon value={value} />
  ) : (
    <span className="w-sm-0 flex-center text-size-sm font-weight-lg flex">--</span>
  )

  const handleClick = () => {
    const index = value ? TIER_LIST_VALUES.indexOf(value) : -1
    onChange?.(TIER_LIST_VALUES[index + 1])
  }

  const content = (
    <span
      className={cx(
        'gap-xs-1 min-w-sm-8 flex w-full items-center',
        iconPos === 'right' && 'justify-end',
        readonly && className,
      )}
    >
      {iconPos === 'left' && tierIcon}
      {value && <span className="font-weight-lg text-size-sm truncate leading-1">{labels[value]}</span>}
      {iconPos === 'right' && tierIcon}
    </span>
  )

  if (readonly) return content
  return (
    <button
      type="button"
      className={cx(
        'h-field-h-xs px-xs-1 min-w-md-3',
        'bg-color-bg-field border-color-border-default rounded-xs border',
        'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      onClick={handleClick}
    >
      {content}
    </button>
  )
}
