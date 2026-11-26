import { useTranslation } from 'react-i18next'
import { Breadcrumb, type BreadcrumbProps } from '../breadcrumb/breadcrumb'

export interface ListHeaderProps extends ReactProps {
  title: string
  itemsCount?: number
  viewLabel?: string
  filtersCount?: number
  search?: string
  surface?: BreadcrumbProps['surface']
  className?: string
}

export const ListHeader = (props: ListHeaderProps) => {
  const { title, itemsCount, viewLabel, filtersCount = 0, search, surface, className } = props
  const { t } = useTranslation()
  const Component = surface === 'glass' ? 'h1' : 'h2'

  return (
    <Component className={cx('flex', className)}>
      <Breadcrumb first surface={surface}>
        {title} {itemsCount !== undefined && `(${itemsCount})`}
      </Breadcrumb>

      {viewLabel && <Breadcrumb surface={surface}>{viewLabel}</Breadcrumb>}

      {filtersCount > 0 && (
        <Breadcrumb surface={surface}>{t('general.format.withFilters', { count: filtersCount })}</Breadcrumb>
      )}

      {search && <Breadcrumb surface={surface}>{t('general.format.withSearch', { keyword: search })}</Breadcrumb>}
    </Component>
  )
}
