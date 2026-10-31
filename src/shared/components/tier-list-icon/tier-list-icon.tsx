import { TIER_LIST_COLORS, type TierListValue } from '../../data/settings'

export interface TierListIconProps extends ReactProps {
  value: TierListValue
  className?: string
}

export const TierListIcon = (props: TierListIconProps) => {
  const { value, className } = props
  const color = TIER_LIST_COLORS[value]

  return (
    <span
      className={cx('h-xs-8 w-sm-0 min-w-sm-0 flex-center flex rounded-xs', className)}
      style={{ backgroundColor: color }}
    >
      <span
        className={cx(
          'ml-[-0.15em] tracking-[-0.15em]',
          'font-weight-xl text-color-white text-size-sm leading-0 text-shadow-md',
        )}
      >
        {value}
      </span>
    </span>
  )
}
