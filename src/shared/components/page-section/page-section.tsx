import { type CSSProperties, type ReactNode } from 'react'

export interface PageSectionProps extends ReactProps {
  /**
   * Slots
   */
  children?: ReactNode

  /**
   * Props
   */
  title: ReactNode
  id?: string
  surface?: 'page' | 'card'
  className?: string
  classNames?: {
    title?: string
    body?: string
  }
  style?: CSSProperties
}

export const PageSection = (props: PageSectionProps) => {
  const { id, title, surface = 'page', className, classNames, children } = props

  const rootClass = cx(surface === 'page' ? 'divide-color-border-on-glass' : 'divide-color-border-subtle')
  const titleClass = cx(surface === 'page' ? 'text-color-text-subtle' : 'text-color-text-placeholder')

  return (
    <div id={id} className={cx('flex flex-col divide-y', rootClass, className)}>
      <div className={cx('text-size-xs pb-xs-3 tracking-wider uppercase', titleClass, classNames?.title)}>{title}</div>
      <div className={cx('pt-xs-3 gap-xs-0 flex flex-col', classNames?.body)}>{children}</div>
    </div>
  )
}
