import { CrownIcon, HeartIcon } from 'lucide-react'
import { type RatingValue } from '../../data/settings'

export interface RatingIconProps extends ReactProps {
  value: RatingValue
  large?: boolean
  className?: string
}

export const RatingIcon = (props: RatingIconProps) => {
  const { value, large, className } = props

  return (
    <span
      className={cx(
        'flex-center relative flex leading-0',
        large ? 'h-sm-4 w-sm-4 min-w-sm-4' : 'h-xs-9 w-xs-9 min-w-xs-9',
        large && 'text-size-sm',
        className,
      )}
    >
      <HeartIcon
        strokeWidth={0.8}
        stroke={large ? 'white' : undefined}
        aria-hidden
        fill="currentColor"
        className="text-color-red-11 absolute inset-0 h-full w-full"
      />

      <span
        className={cx(
          'font-weight-lg text-color-white flex-center absolute inset-0 z-10 flex',
          large ? 'text-size-lg' : 'text-size-xs',
        )}
      >
        <span className="text-[0.8em]">{value}</span>
      </span>

      {value === 10 && (
        <CrownIcon
          strokeWidth={0.5}
          stroke={large ? 'white' : undefined}
          aria-hidden
          fill="currentColor"
          className={cx(
            'text-color-yellow-8 absolute z-10 rotate-[-20deg]',
            large ? 'h-xs-9 w-xs-9 -top-xs-3 -left-xs-1' : 'h-xs-5 w-xs-5 -top-xs-1 -left-xs-1',
          )}
        />
      )}
    </span>
  )
}
