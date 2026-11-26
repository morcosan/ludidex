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
  surface?: 'glass' | 'paper'
  first?: boolean
  large?: boolean
  className?: string
  style?: CSSProperties
}

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { surface = 'glass', first, large, className, style, children } = props
  const bgClass = cx(surface === 'glass' ? 'bg-color-bg-region' : 'bg-color-black-alpha-2')

  return (
    <div className={cx('flex', !first && '-ml-xs-2', large ? 'text-size-md' : 'text-size-sm', className)} style={style}>
      {!first && <Arrow className={bgClass} notch />}
      <div
        className={cx(
          'flex items-center',
          bgClass,
          large ? 'h-field-h-sm pr-xs-7' : 'h-field-h-xs pr-xs-5',
          large ? (first ? 'pl-xs-8' : 'pl-xs-7') : first ? 'pl-xs-6' : 'pl-xs-5',
          first && 'rounded-l-xs',
        )}
      >
        {children}
      </div>
      <Arrow className={bgClass} />
    </div>
  )
}
