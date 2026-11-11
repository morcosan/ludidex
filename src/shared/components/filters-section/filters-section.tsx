import { Button } from '@design-system'
import { useTranslation } from 'react-i18next'
import { useFilters, type FiltersProps } from '../_shared/use-filters'
import { PageSection } from '../page-section/page-section'

export { EMPTY_FILTERS, type Filters } from '../_shared/use-filters'

export type FiltersSectionProps = FiltersProps

export const FiltersSection = (props: FiltersSectionProps) => {
  const { filters, otherFilters, type, surface = 'glass', className, onChange } = props
  const { t } = useTranslation()
  const { hasFilters, handleClearFilters, renderElements, renderNations, renderSearch, renderStatuses, renderWeapons } =
    useFilters({ filters, otherFilters: otherFilters, type, surface, onChange })

  return (
    <PageSection
      title={t('general.label.filters')}
      surface={surface}
      className={className}
      classNames={{ body: 'gap-xs-5! pt-xs-5!' }}
      actions={
        hasFilters && (
          <Button size="xs" variant="optional" onClick={handleClearFilters}>
            {t('general.action.clearFilters')}
          </Button>
        )
      }
    >
      {renderSearch()}
      {renderElements()}
      {renderStatuses()}
      {renderWeapons()}
      {renderNations()}
    </PageSection>
  )
}
