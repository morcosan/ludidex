import { useTranslation } from 'react-i18next'
import { TIER_SCORE_COLORS, TIER_SCORE_MARKS } from '../../data/settings'

export interface TierScoreProps extends ReactProps {
  value: number
  editable?: boolean
  noLabel?: boolean
  className?: string
  onChange?: (value: number) => void
}

export const TierScore = (props: TierScoreProps) => {
  const { value, editable, noLabel, className, onChange } = props
  const { t } = useTranslation()
  const mark = TIER_SCORE_MARKS[value as keyof typeof TIER_SCORE_MARKS]
  const color = TIER_SCORE_COLORS[value as keyof typeof TIER_SCORE_COLORS]
  const count = Object.keys(TIER_SCORE_MARKS).length

  const handleClick = () => {
    onChange?.((value + 1) % count)
  }

  const content = (
    <span
      className={cx(
        'gap-xs-1 text-size-sm font-weight-lg flex items-center leading-1',
        !editable && className,
        !noLabel && 'min-w-sm-8',
      )}
    >
      <span className="h-xs-8 w-sm-0 flex-center inline-flex rounded-xs" style={{ backgroundColor: color }}>
        <span className="text-color-white ml-[-0.15em] tracking-[-0.15em] text-shadow-md">{mark}</span>
      </span>
      {!noLabel && <span>{value ? t('game.label.tier') : '--'}</span>}
    </span>
  )

  return editable ? (
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
  ) : (
    content
  )
}
