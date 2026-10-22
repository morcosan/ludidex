import { ThumbsDown } from 'lucide-react'
import { LIKE_SCORE_LABELS, MAX_LIKE_SCORE, MIN_LIKE_SCORE } from '../../data/settings'
import { FilledHeart } from './_filled-heart'

export interface LikeScoreProps extends ReactProps {
  value: number
  editable?: boolean
  noLabel?: boolean
  className?: string
  onChange?: (value: number) => void
}

export const LikeScore = (props: LikeScoreProps) => {
  const { value, editable, noLabel, className, onChange } = props
  const label = value <= MAX_LIKE_SCORE ? LIKE_SCORE_LABELS[value as keyof typeof LIKE_SCORE_LABELS] : ''

  const handleClick = () => onChange?.(value >= MAX_LIKE_SCORE ? MIN_LIKE_SCORE : value + 1)

  const content = (
    <span className={cx('gap-xs-1 flex items-center', !editable && className)}>
      {value <= MIN_LIKE_SCORE ? (
        <ThumbsDown aria-hidden fill="currentColor" className="h-xs-8 w-xs-8 text-color-text-default" />
      ) : (
        <FilledHeart
          value={value}
          outlineClass="text-color-black-alpha-6"
          fillClass="text-color-red-11"
          iconClass="h-xs-9 w-xs-9"
          className="-translate-y-px"
        />
      )}
      {!noLabel && <span className="ml-xs-0 text-size-sm font-weight-lg translate-y-px">{label}</span>}
    </span>
  )

  return editable ? (
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
  ) : (
    content
  )
}
