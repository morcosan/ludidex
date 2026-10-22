import type { ReactNode } from 'react'

export interface SectionItem {
  label: string
  value: ReactNode
}

interface Props extends ReactProps {
  title: string
  items?: SectionItem[]
}

export const StatsSection = ({ title, items, children }: Props) => {
  return (
    <div className={cx('flex flex-col', items?.length && 'divide-color-border-subtle divide-y')}>
      <div className="text-size-xs pb-xs-2 text-color-text-placeholder tracking-wider uppercase">{title}</div>

      {items?.length && (
        <ul className="divide-color-border-subtle flex flex-col divide-y">
          {items.map((item) => (
            <li key={item.label} className="gap-xs-2 py-xs-2 flex items-center justify-between">
              <span className="text-size-sm">{item.label}</span>
              <div className="min-h-field-h-xs flex-center flex">{item.value}</div>
            </li>
          ))}
        </ul>
      )}

      {children}
    </div>
  )
}
