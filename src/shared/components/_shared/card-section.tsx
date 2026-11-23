import { type ReactNode } from 'react'
import { PageSection } from '../page-section/page-section'

export interface SectionItem {
  key: string
  label: ReactNode
  value: ReactNode
}

interface CardSectionProps extends ReactProps {
  title: string
  items?: SectionItem[]
  actions?: ReactNode
  classNames?: {
    body?: string
    label?: string
    value?: string
  }
}

export const CardSection = ({ title, items, actions, children, classNames }: CardSectionProps) => {
  return (
    <PageSection
      surface="paper"
      title={title}
      actions={actions}
      className={cx(!items?.length && 'divide-none!')}
      classNames={{ body: cx('pt-0!', classNames?.body) }}
    >
      {items && items?.length > 0 && (
        <dl className="divide-color-border-subtle flex flex-col divide-y">
          {items.map((item) => (
            <div key={item.key} className="gap-xs-2 py-xs-2 flex items-center justify-between">
              <dt className={cx('text-size-sm pr-xs-9', classNames?.label)}>{item.label}</dt>
              <dd className={cx('min-h-field-h-xs flex-center flex', classNames?.value)}>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {children}
    </PageSection>
  )
}
