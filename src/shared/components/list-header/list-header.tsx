import { useTranslation } from 'react-i18next'
import { Breadcrumb, type BreadcrumbProps } from '../breadcrumb/breadcrumb'

export interface ListHeaderProps extends ReactProps {
  title: string
  itemCount?: number
  viewLabel?: string
  filterCount?: number
  search?: string
  surface?: BreadcrumbProps['surface']
  className?: string
}

export const ListHeader = (props: ListHeaderProps) => {
  const { title, itemCount, viewLabel, filterCount = 0, search, surface, className } = props
  const { t } = useTranslation()
  const Component = surface === 'glass' ? 'h1' : 'h2'

  return (
    <Component className={cx('flex', className)}>
      <Breadcrumb first surface={surface}>
        {title} {itemCount !== undefined && `(${itemCount})`}
      </Breadcrumb>

      {viewLabel && <Breadcrumb surface={surface}>{viewLabel}</Breadcrumb>}

      {filterCount > 0 && (
        <Breadcrumb surface={surface}>{t('general.format.withFilters', { count: filterCount })}</Breadcrumb>
      )}

      {search && <Breadcrumb surface={surface}>{t('general.format.withSearch', { keyword: search })}</Breadcrumb>}
    </Component>
  )
}
