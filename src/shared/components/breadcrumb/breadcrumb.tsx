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
  large?: boolean
  className?: string
  style?: CSSProperties
}

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { first, large, className, style, children } = props

  return (
    <div className={cx('flex', !first && '-ml-xs-2', large ? 'text-size-md' : 'text-size-sm', className)} style={style}>
      {!first && <Arrow notch />}
      <div
        className={cx(
          'bg-color-bg-region flex items-center',
          large ? 'h-field-h-sm pr-xs-7' : 'h-field-h-xs pr-xs-5',
          large ? (first ? 'pl-xs-8' : 'pl-xs-7') : first ? 'pl-xs-6' : 'pl-xs-5',
          first && 'rounded-l-xs',
        )}
      >
        {children}
      </div>
      <Arrow />
    </div>
  )
}
