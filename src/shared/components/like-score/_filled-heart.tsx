import { clamp } from 'lodash-es'
import { CrownIcon, HeartIcon } from 'lucide-react'
import { MAX_LIKE_SCORE } from '../../data/settings'

interface HeartProps extends ReactProps {
  value: number
  outlineClass: string
  fillClass: string
  iconClass?: string
}

export const FilledHeart = ({ value, outlineClass, fillClass, iconClass, className }: HeartProps) => {
  const FILL_RATIO = [0, 1.5, 2.3, 3, 5, 5]
  const fill = FILL_RATIO[value] ?? MAX_LIKE_SCORE
  const height = clamp((fill / MAX_LIKE_SCORE) * 100, 0, 100)

  return (
    <span className={cx('relative block', iconClass, className)}>
      <HeartIcon aria-hidden className={cx('absolute top-0 left-0', iconClass, outlineClass)} />

      {height > 0 && (
        <span className="absolute inset-x-0 bottom-0 overflow-hidden" style={{ height: `${height}%` }}>
          <HeartIcon aria-hidden fill="currentColor" className={cx('absolute bottom-0 left-0', iconClass, fillClass)} />
        </span>
      )}

      {value >= MAX_LIKE_SCORE && (
        <CrownIcon
          aria-hidden
          fill="currentColor"
          className="-top-xs-1 -left-xs-0 text-color-yellow-8 h-xs-4 w-xs-4 absolute scale-120 rotate-[-20deg]"
        />
      )}
    </span>
  )
}
