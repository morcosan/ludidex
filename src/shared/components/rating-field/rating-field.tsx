import { type RatingLabels } from '@app-shared/state/types'
import { RATING_LABELS, RATING_VALUES, type RatingValue } from '../../data/settings'
import { RatingIcon } from '../rating-icon/rating-icon'

export interface RatingFieldProps extends ReactProps {
  value?: RatingValue
  labels: RatingLabels
  readonly?: boolean
  className?: string
  onChange?: (value: RatingValue | undefined) => void
}

export const RatingField = (props: RatingFieldProps) => {
  const { value, labels, readonly, className, onChange } = props
  const label = value === undefined ? undefined : labels[value as keyof typeof RATING_LABELS]

  const handleClick = () => {
    if (value === undefined) onChange?.(1)
    else if (value === 10) onChange?.(undefined)
    else onChange?.(RATING_VALUES.find((rating) => rating === value + 1))
  }

  const content = (
    <span className={cx('gap-xs-0 flex max-w-full items-center', readonly && className, readonly && 'h-field-h-xs')}>
      {value !== undefined ? (
        <RatingIcon value={value} className="-mt-px" />
      ) : (
        <span className="w-xs-9 flex-center text-size-sm font-weight-lg flex">--</span>
      )}
      {value !== undefined && <span className="ml-xs-0 text-size-sm font-weight-lg truncate">{label}</span>}
    </span>
  )

  if (readonly) return content
  return (
    <button
      type="button"
      className={cx(
        'h-field-h-xs px-xs-1 min-w-md-3 py-px',
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
