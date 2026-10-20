import { useTranslation } from 'react-i18next'
import { TIER_COLORS, TIER_SCORES } from '../../data/settings'

export type TierScoreValue = (typeof TIER_SCORES)[number]

export interface TierScoreProps extends ReactProps {
  value?: TierScoreValue
  editable?: boolean
  disabled?: boolean
  noLabel?: boolean
  className?: string
  onChange?: (value: TierScoreValue) => void
}

export const TierScore = (props: TierScoreProps) => {
  const { value, editable, disabled, noLabel, className, onChange } = props
  const { t } = useTranslation()
  const color = (value && TIER_COLORS[value]) || TIER_COLORS.D

  const handleClick = () => {
    const index = (value && TIER_SCORES.indexOf(value)) || 0
    onChange?.(TIER_SCORES[(index - 1 + TIER_SCORES.length) % TIER_SCORES.length])
  }

  const content = (
    <span className={cx('gap-xs-1 text-size-sm font-weight-lg flex items-center leading-1', !editable && className)}>
      <span
        className={cx(
          'h-xs-8 px-xs-2',
          'bg-color-grey-9 inline-flex items-center justify-center rounded-xs',
          'text-color-white -tracking-widest text-shadow-md',
        )}
        style={{ backgroundColor: value && color }}
      >
        {value || '?'}
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
      disabled={disabled}
      onClick={handleClick}
    >
      {content}
    </button>
  ) : (
    content
  )
}
