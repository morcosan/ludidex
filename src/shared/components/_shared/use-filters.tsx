import { GlobeIcon } from 'lucide-react'
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
import { SearchField } from '../search-field/search-field'
import { StatusIcon } from '../status-icon/status-icon'
import { FilterGroup, type FilterGroupOrder } from './filter-group'

export interface Filters {
  elements?: GenshinElement[]
  statuses?: CharacterStatus[]
  weapons?: GenshinWeaponType[]
  nations?: GenshinNation[]
  search?: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const EMPTY_FILTERS: Filters = { elements: [], statuses: [], weapons: [], nations: [], search: '' }

export interface FiltersProps extends ReactProps {
  filters: Filters
  otherFilters?: Filters
  type?: 'characters' | 'teams'
  surface?: 'glass' | 'paper'
  onChange?: (filters: Filters) => void
}

export const useFilters = (props: FiltersProps) => {
  const { filters, otherFilters, type = 'characters', surface = 'glass', onChange } = props
  const { t } = useTranslation()
  const { getElementIcons, getWeaponIcons, getNationIcons } = useUserAssetsStore()
  const elementIcons = getElementIcons()
  const weaponIcons = getWeaponIcons()
  const nationIcons = getNationIcons()
  const [remountKey, setRemountKey] = useState(0) // To handle clear value while debouncing

  const hasActiveFilters = (filters?: Filters) => {
    return (
      Boolean(filters?.search) ||
      Boolean(filters?.elements?.length) ||
      Boolean(filters?.statuses?.length) ||
      Boolean(filters?.weapons?.length) ||
      Boolean(filters?.nations?.length)
    )
  }

  const hasFilters = hasActiveFilters(filters) || hasActiveFilters(otherFilters)

  const toggleFilter = <T,>(values: T[], item: T) => {
    return values.includes(item) ? values.filter((value) => value !== item) : [...values, item]
  }

  const handleClearFilters = () => {
    onChange?.(EMPTY_FILTERS)
    setRemountKey((key) => key + 1)
  }

  const renderSearch = () => {
    return filters.search !== undefined ? (
      <SearchField
        key={remountKey}
        id="filters-search"
        value={filters.search}
        label={type === 'teams' ? t('general.action.searchTeams') : t('general.action.searchCharacters')}
        size="md"
        className={cx('w-xl-0', surface === 'glass' && 'bg-color-bg-region')}
        onChange={(search) => onChange?.({ ...filters, search })}
      />
    ) : null
  }

  const renderElements = (order?: FilterGroupOrder, className?: string) => {
    return filters.elements ? (
      <FilterGroup
        items={GENSHIN_ELEMENTS}
        selection={filters.elements}
        order={order}
        surface={surface}
        ariaLabel={t('game.label.element')}
        renderLabel={(element) => t(`game.elements.${element}`)}
        renderIcon={(element) => <img src={elementIcons[element][0]} alt="" className="h-xs-9 w-xs-9 mr-xs-1" />}
        className={className}
        onToggle={(element) => onChange?.({ ...filters, elements: toggleFilter(filters.elements!, element) })}
      />
    ) : null
  }

  const renderStatuses = (order?: FilterGroupOrder, className?: string) => {
    return filters.statuses ? (
      <FilterGroup
        items={CHARACTER_STATUSES}
        selection={filters.statuses}
        order={order}
        surface={surface}
        ariaLabel={t('general.label.status')}
        renderLabel={(status) => t(`game.label.${status}`)}
        renderIcon={(status) => <StatusIcon value={status} className="mr-xs-1" />}
        className={className}
        onToggle={(status) => onChange?.({ ...filters, statuses: toggleFilter(filters.statuses!, status) })}
      />
    ) : null
  }

  const renderWeapons = (order?: FilterGroupOrder, className?: string) => {
    return filters.weapons ? (
      <FilterGroup
        items={GENSHIN_WEAPONS}
        selection={filters.weapons}
        order={order}
        surface={surface}
        ariaLabel={t('game.label.weapon')}
        renderLabel={(weapon) => t(`game.weapons.${weapon}`)}
        renderIcon={(weapon) => (
          <img src={weaponIcons[weapon][0]} alt="" className="h-xs-9 w-xs-9 mr-xs-1 brightness-90" />
        )}
        className={className}
        onToggle={(weapon) => onChange?.({ ...filters, weapons: toggleFilter(filters.weapons!, weapon) })}
      />
    ) : null
  }

  const renderNations = (order?: FilterGroupOrder, className?: string) => {
    return filters.nations ? (
      <FilterGroup
        items={GENSHIN_NATIONS}
        selection={filters.nations}
        order={order}
        surface={surface}
        ariaLabel={t('game.label.nation')}
        renderLabel={(nation) => t(`game.nations.${nation}`)}
        renderIcon={(nation) =>
          nation === 'other' ? (
            <GlobeIcon aria-hidden className="h-xs-7 w-xs-7 mr-xs-1 text-color-text-subtle" />
          ) : (
            <img src={nationIcons[nation][0]} alt="" className="h-xs-9 w-xs-9 mr-xs-1 brightness-40" />
          )
        }
        className={className}
        onToggle={(nation) => onChange?.({ ...filters, nations: toggleFilter(filters.nations!, nation) })}
      />
    ) : null
  }

  return {
    hasFilters,
    handleClearFilters,
    renderElements,
    renderNations,
    renderSearch,
    renderStatuses,
    renderWeapons,
  }
}
