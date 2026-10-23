import { type CSSProperties, type ReactNode } from 'react'

export interface PageSectionProps extends ReactProps {
  /**
   * Slots
   */
  children: ReactNode

  /**
   * Props
   */
  title: string
  surface?: 'page' | 'card'
  titleClassName?: string
  bodyClassName?: string
  className?: string
  style?: CSSProperties
}

export const PageSection = (props: PageSectionProps) => {
  const { title, surface = 'page', className, titleClassName, bodyClassName, children } = props

  const rootClass = cx(surface === 'page' ? 'divide-color-border-on-glass' : 'divide-color-border-subtle')
  const titleClass = cx(surface === 'page' ? 'text-color-text-subtle' : 'text-color-text-placeholder')

  return (
    <div className={cx('flex flex-col divide-y', rootClass, className)}>
      <div className={cx('text-size-xs pb-xs-3 tracking-wider uppercase', titleClass, titleClassName)}>{title}</div>
      <div className={cx('pt-xs-3 gap-xs-0 flex flex-col', bodyClassName)}>{children}</div>
    </div>
  )
}
