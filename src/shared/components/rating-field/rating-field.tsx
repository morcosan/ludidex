import { type RatingLabels } from '@app-shared/state/types'
import { ThumbsDownIcon } from 'lucide-react'
import { RATING_LABELS, RATING_MAX_VALUE, RATING_MIN_VALUE } from '../../data/settings'
import { FilledHeart } from './_filled-heart'

export interface RatingFieldProps extends ReactProps {
  value: number
  labels?: RatingLabels
  readonly?: boolean
  className?: string
  onChange?: (value: number) => void
}

export const RatingField = (props: RatingFieldProps) => {
  const { value, labels, readonly, className, onChange } = props
  const label = value <= RATING_MAX_VALUE ? labels?.[value as keyof typeof RATING_LABELS] : ''

  const handleClick = () => onChange?.(value >= RATING_MAX_VALUE ? RATING_MIN_VALUE : value + 1)

  const content = (
    <span className={cx('gap-xs-1 flex max-w-full items-center', readonly && className, readonly && 'h-field-h-xs')}>
      {value <= RATING_MIN_VALUE ? (
        <ThumbsDownIcon aria-hidden fill="currentColor" className="h-xs-8 w-xs-8 min-w-xs-8 text-color-text-default" />
      ) : (
        <FilledHeart
          value={value}
          outlineClass="text-color-black-alpha-6"
          fillClass="text-color-red-11"
          iconClass="h-xs-9 w-xs-9 min-w-xs-9"
          className="-translate-y-px"
        />
      )}
      {labels && <span className="ml-xs-0 text-size-sm font-weight-lg truncate">{label}</span>}
    </span>
  )

  if (readonly) return content
  return (
    <button
      type="button"
      className={cx(
        'h-field-h-xs px-xs-1 min-w-md-5 py-px',
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
