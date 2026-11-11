import { Button } from '@design-system'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CHARACTER_STATUSES,
  GENSHIN_ELEMENTS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPONS,
  type CharacterStatus,
  type GenshinElement,
  type GenshinNation,
  type GenshinWeaponType,
} from '../../data'
import { useUserAssetsStore } from '../../state/use-user-assets'
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
  const { getElementIcons, getWeaponIcons, getNationIcons } = useUserAssetsStore()
  const elementIcons = getElementIcons()
  const weaponIcons = getWeaponIcons()
  const nationIcons = getNationIcons()
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
        getLabel={(element) => t(`game.elements.${element}`)}
        renderIcon={(element) => (
          <img src={elementIcons[element][0]} alt="" className="h-xs-9 w-xs-9 mr-xs-1 shrink-0" />
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
        getLabel={(weapon) => t(`game.weapons.${weapon}`)}
        renderIcon={(weapon) => (
          <img src={weaponIcons[weapon][0]} alt="" className="h-xs-9 w-xs-9 mr-xs-1 brightness-90" />
        )}
        onToggle={(weapon) => onChange?.({ ...filters, weapons: toggleFilter(filters.weapons, weapon) })}
      />

      {/* NATIONS */}
      <FilterGroup
        items={GENSHIN_NATIONS}
        selection={filters.nations}
        surface={surface}
        ariaLabel={t('game.label.nation')}
        getLabel={(nation) => t(`game.nations.${nation}`)}
        renderIcon={(nation) =>
          nation === 'none' ? null : (
            <img src={nationIcons[nation][0]} alt="" className="h-xs-9 w-xs-9 mr-xs-1 brightness-40" />
          )
        }
        onToggle={(nation) => onChange?.({ ...filters, nations: toggleFilter(filters.nations, nation) })}
      />
    </PageSection>
  )
}
