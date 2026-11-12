import { Button } from '@design-system'
import { useTranslation } from 'react-i18next'
import { useFilters, type FiltersProps } from '../_shared/use-filters'
import { PageSection } from '../page-section/page-section'

export { EMPTY_FILTERS, type Filters } from '../_shared/use-filters'

export type FiltersSectionProps = FiltersProps

export const FiltersSection = (props: FiltersSectionProps) => {
  const { surface = 'glass', className } = props
  const { t } = useTranslation()
  const { hasFilters, handleClearFilters, renderElements, renderNations, renderSearch, renderStatuses, renderWeapons } =
    useFilters(props)

  return (
    <PageSection
      title={t('general.label.filters')}
      surface={surface}
      className={className}
      classNames={{ body: 'gap-xs-4! pt-xs-4!' }}
      actions={
        <Button
          size="xs"
          variant="optional"
          tooltip={!hasFilters ? t('general.label.noActiveFilters') : undefined}
          onClick={handleClearFilters}
        >
          {t('general.action.clearFilters')}
        </Button>
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
