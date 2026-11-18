import { Breadcrumb } from '@app-shared/components'
import { useTranslation } from 'react-i18next'

interface PageHeaderProps extends ReactProps {
  title: string
  count: number
  viewLabel?: string
  filtersCount?: number
  search?: string
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title, count, viewLabel, filtersCount = 0, search } = props
  const { t } = useTranslation()

  return (
    <h1 className="flex">
      <Breadcrumb first>
        {title} ({count})
      </Breadcrumb>
      {viewLabel && <Breadcrumb>{viewLabel}</Breadcrumb>}
      {filtersCount > 0 && <Breadcrumb>{t('general.format.withFilters', { count: filtersCount })}</Breadcrumb>}
      {search && <Breadcrumb>{t('general.format.withSearch', { keyword: search })}</Breadcrumb>}
    </h1>
  )
}
