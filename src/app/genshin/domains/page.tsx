import { DomainCard, type Filters } from '@app-shared/components'
import { type GenshinDomain } from '@app-shared/data'
import { useClickOutside } from '@app-shared/utils/use-click-outside'
import { useDomainListing } from '@app-shared/utils/use-domain-listing'
import { useUrlFilters } from '@app-shared/utils/use-url-filters'
import { countFilters } from '@app-shared/utils/various'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageTemplate } from '../_shared/page-template'
import { PreviewDrawer } from '../_shared/preview-drawer'
import { DOMAIN_FILTERS } from './_partials/config'
import { DomainListing } from './_partials/domain-listing'

export default function Page() {
  const { t } = useTranslation()
  const [previewDomain, setPreviewDomain] = useState<GenshinDomain | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [filters, setFilters] = useUrlFilters(DOMAIN_FILTERS)
  const { listedDomains } = useDomainListing(filters)

  useClickOutside({
    enabled: isPreviewOpen,
    allowlist: ['[data-domain-item]', '[data-preview-drawer]'],
    callback: () => setIsPreviewOpen(false),
  })

  const filtersCount = countFilters(filters)
  const topBarFilters: Filters = { search: filters.search }
  const sectionFilters: Filters = { nations: filters.nations }

  const handleFiltersChange = (newFilters: Filters) => setFilters({ ...filters, ...newFilters })

  const handleClickDomain = (domain: GenshinDomain) => {
    if (isPreviewOpen && previewDomain?.id === domain.id) {
      setIsPreviewOpen(false)
      return
    }
    setPreviewDomain(domain)
    setIsPreviewOpen(true)
  }

  return (
    <PageTemplate
      type="domains"
      title={t('general.label.domains')}
      itemsCount={listedDomains.length}
      filtersCount={filtersCount}
      topBarFilters={topBarFilters}
      sectionFilters={sectionFilters}
      search={filters.search}
      leftSide={
        <DomainListing
          domains={listedDomains}
          selectedItemId={isPreviewOpen ? previewDomain?.id : undefined}
          className="mt-xs-9"
          onClickItem={handleClickDomain}
        />
      }
      rightSide={
        <PreviewDrawer opened={isPreviewOpen}>
          {previewDomain && <DomainCard domain={previewDomain} className="h-full" />}
        </PreviewDrawer>
      }
      onChangeFilters={handleFiltersChange}
    />
  )
}
