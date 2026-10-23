import { type CSSProperties, type ReactNode } from 'react'
import { Arrow } from './_arrow'

export interface BreadcrumbProps extends ReactProps {
  /**
   * Slots
   */
  children?: ReactNode

  /**
   * Props
   */
  first?: boolean
  className?: string
  style?: CSSProperties
}

export const Breadcrumb = ({ first, children, className, style }: BreadcrumbProps) => {
  return (
    <div className={cx('text-size-sm flex', !first && '-ml-xs-2', className)} style={style}>
      {!first && <Arrow notch />}
      <div
        className={cx('bg-color-bg-region pr-xs-5 flex items-center py-px', first ? 'pl-xs-6 rounded-l-xs' : 'pl-xs-5')}
      >
        {children}
      </div>
      <Arrow />
    </div>
  )
}
