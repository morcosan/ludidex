import { type CSSProperties, type ReactNode } from 'react'

export interface PageSectionProps extends ReactProps {
  /**
   * Slots
   */
  children?: ReactNode
  /** Content displayed on the right side of the title */
  actions?: ReactNode

  /**
   * Props
   */
  title: ReactNode
  id?: string
  surface?: 'glass' | 'paper'
  className?: string
  classNames?: {
    header?: string
    body?: string
  }
  style?: CSSProperties
}

export const PageSection = (props: PageSectionProps) => {
  const { id, title, actions, surface = 'glass', className, classNames, children } = props

  const rootClass = cx(surface === 'glass' ? 'divide-color-border-on-glass' : 'divide-color-border-subtle')
  const titleClass = cx(
    'min-h-button-h-xs flex items-center',
    surface === 'glass' ? 'text-color-text-subtle' : 'text-color-text-placeholder',
  )

  return (
    <div id={id} className={cx('flex flex-col divide-y', rootClass, className)}>
      <div className={cx('gap-xs-2 pb-xs-1 flex items-end', classNames?.header)}>
        <div className={cx('text-size-xs min-w-0 tracking-wider uppercase', titleClass)}>{title}</div>
        {actions && <div className="ml-auto flex items-center">{actions}</div>}
      </div>

      <div className={cx('pt-xs-3 gap-xs-0 flex flex-col', classNames?.body)}>{children}</div>
    </div>
  )
}
