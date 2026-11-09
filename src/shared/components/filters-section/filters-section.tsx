import { Button } from '@design-system'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GENSHIN_ELEMENT_ICONS,
  GENSHIN_ELEMENTS,
  GENSHIN_NATION_ICONS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPON_ICONS,
  GENSHIN_WEAPONS,
  type GenshinElement,
  type GenshinNation,
  type GenshinWeaponType,
} from '../../data/genshin'
import { CHARACTER_STATUSES, type CharacterStatus } from '../../data/settings'
import { PageSection } from '../page-section/page-section'
import { SearchField } from '../search-field/search-field'
import { StatusIcon } from '../status-icon/status-icon'
import { FilterGroup } from './_partials/filter-group'

export interface Filters {
  elements: GenshinElement[]
  statuses: CharacterStatus[]
  weapons: GenshinWeaponType[]
  nations: GenshinNation[]
}

// eslint-disable-next-line react-refresh/only-export-components
export const EMPTY_FILTERS: Filters = { elements: [], statuses: [], weapons: [], nations: [] }

export interface FiltersSectionProps extends ReactProps {
  filters: Filters
  search: string
  surface?: 'glass' | 'paper'
  classNames?: { body?: string }
  onChange?: (filters: Filters) => void
  onSearch?: (value: string) => void
}

export const FiltersSection = (props: FiltersSectionProps) => {
  const { filters, search, surface = 'glass', className, classNames, onChange, onSearch } = props
  const { t } = useTranslation()
  const [searchFieldKey, setSearchFieldKey] = useState(0)
  const hasFilters =
    search.length > 0 ||
    filters.elements.length > 0 ||
    filters.statuses.length > 0 ||
    filters.weapons.length > 0 ||
    filters.nations.length > 0

  const toggleFilter = <T,>(values: T[], item: T) => {
    return values.includes(item) ? values.filter((value) => value !== item) : [...values, item]
  }

  const handleClearFilters = () => {
    onChange?.(EMPTY_FILTERS)
    onSearch?.('')
    setSearchFieldKey((key) => key + 1)
  }

  return (
    <PageSection
      title={t('general.label.filters')}
      surface={surface}
      className={className}
      classNames={{ body: cx('gap-xs-5! pt-xs-5!', classNames?.body) }}
      actions={
        hasFilters && (
          <Button size="xs" variant="optional" onClick={handleClearFilters}>
            {t('general.action.clearFilters')}
          </Button>
        )
      }
    >
      {/* SEARCH */}
      <SearchField
        key={searchFieldKey}
        id="character-modal-search"
        value={search}
        label={t('general.action.searchCharacters')}
        size="lg"
        onChange={onSearch}
      />

      {/* ELEMENTS */}
      <FilterGroup
        items={GENSHIN_ELEMENTS}
        selection={filters.elements}
        order="length"
        surface={surface}
        ariaLabel={t('game.label.element')}
        renderIcon={(element) => (
          <img src={GENSHIN_ELEMENT_ICONS[element][0]} alt="" className="h-xs-9 w-xs-9 mr-xs-1 shrink-0" />
        )}
        onToggle={(element) => onChange?.({ ...filters, elements: toggleFilter(filters.elements, element) })}
      />

      {/* STATUSES */}
      <FilterGroup
        items={CHARACTER_STATUSES}
        selection={filters.statuses}
        surface={surface}
        ariaLabel={t('general.label.status')}
        getLabel={(status) => t(`game.label.${status}`)}
        renderIcon={(status) => <StatusIcon value={status} className="mr-xs-1 shrink-0" />}
        onToggle={(status) => onChange?.({ ...filters, statuses: toggleFilter(filters.statuses, status) })}
      />

      {/* WEAPONS */}
      <FilterGroup
        items={GENSHIN_WEAPONS}
        selection={filters.weapons}
        order="alphabetical"
        surface={surface}
        ariaLabel={t('game.label.weapon')}
        renderIcon={(weapon) => (
          <img src={GENSHIN_WEAPON_ICONS[weapon][0]} alt="" className="h-xs-9 w-xs-9 mr-xs-1 brightness-90" />
        )}
        onToggle={(weapon) => onChange?.({ ...filters, weapons: toggleFilter(filters.weapons, weapon) })}
      />

      {/* NATIONS */}
      <FilterGroup
        items={GENSHIN_NATIONS}
        selection={filters.nations}
        surface={surface}
        ariaLabel={t('game.label.nation')}
        getLabel={(nation) => (nation === 'None' ? 'N/A' : nation)}
        renderIcon={(nation) =>
          nation === 'None' ? null : (
            <img src={GENSHIN_NATION_ICONS[nation][0]} alt="" className="h-xs-9 w-xs-9 mr-xs-1 brightness-40" />
          )
        }
        onToggle={(nation) => onChange?.({ ...filters, nations: toggleFilter(filters.nations, nation) })}
      />
    </PageSection>
  )
}
