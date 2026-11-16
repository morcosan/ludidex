import { type ReactNode } from 'react'
import { PageSection } from '../page-section/page-section'

export interface SectionItem {
  label: string
  value: ReactNode
}

interface Props extends ReactProps {
  title: string
  items?: SectionItem[]
  classNames?: {
    body?: string
  }
}

export const CardSection = ({ title, items, children, classNames }: Props) => {
  return (
    <PageSection
      surface="paper"
      title={title}
      className={cx(!items?.length && 'divide-none!')}
      classNames={{ body: cx('pt-0!', classNames?.body) }}
    >
      {items?.length && (
        <dl className="divide-color-border-subtle flex flex-col divide-y">
          {items.map((item) => (
            <div key={item.label} className="gap-xs-2 py-xs-2 flex items-center justify-between">
              <dt className="text-size-sm">{item.label}</dt>
              <dd className="min-h-field-h-xs flex-center flex">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {children}
    </PageSection>
  )
}
