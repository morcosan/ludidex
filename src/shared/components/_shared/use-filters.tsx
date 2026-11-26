import { Button, Tag } from '@design-system'
import {
  faBook,
  faDice,
  faDragon,
  faFeatherPointed,
  faHammer,
  faSkullCrossbones,
  faTrophy,
  faUser,
  faUserGroup,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GlobeIcon, SwordsIcon } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CHARACTER_STATUSES,
  DOMAIN_TYPES,
  GENSHIN_ELEMENTS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPONS,
  TEAM_SIZES,
  TRIAL_STATES,
  type CharacterStatus,
  type DomainType,
  type GenshinElement,
  type GenshinNation,
  type GenshinWeaponType,
  type TeamSize,
  type TrialState,
} from '../../data'
import { useUserAssetsStore } from '../../state/use-user-assets'
import { useUserTags } from '../../utils/use-user-tags'
import { SearchField } from '../search-field/search-field'
import { StatusIcon } from '../status-icon/status-icon'
import { FilterGroup, type FilterGroupOrder } from './filter-group'

export interface Filters {
  elements?: GenshinElement[]
  statuses?: CharacterStatus[]
  nations?: GenshinNation[]
  weaponTypes?: GenshinWeaponType[]
  domainTypes?: DomainType[]
  teamSizes?: TeamSize[]
  trialStates?: TrialState[]
  tags?: string[]
  search?: string
}

export interface FiltersProps extends ReactProps {
  type: 'characters' | 'teams' | 'domains' | 'trials'
  filters: Filters
  otherFilters?: Filters
  surface?: 'glass' | 'paper'
  onChange?: (filters: Filters) => void
}

export const useFilters = (props: FiltersProps) => {
  const { type, filters, otherFilters, surface = 'glass', onChange } = props
  const { t } = useTranslation()
  const { getElementIcons, getWeaponIcons, getNationIcons } = useUserAssetsStore()
  const elementIcons = getElementIcons()
  const weaponIcons = getWeaponIcons()
  const nationIcons = getNationIcons()
  const { getTagStyle, tagOptions, tagOptionsWithColor, tagOptionsWithoutColor } = useUserTags()
  const [remountKey, setRemountKey] = useState(0) // To handle clear value while debouncing
  const [showMoreTags, setShowMoreTags] = useState(false)

  const hasActiveFilters = (filters?: Filters) => {
    return (
      Boolean(filters?.elements?.length) ||
      Boolean(filters?.statuses?.length) ||
      Boolean(filters?.nations?.length) ||
      Boolean(filters?.weaponTypes?.length) ||
      Boolean(filters?.domainTypes?.length) ||
      Boolean(filters?.teamSizes?.length) ||
      Boolean(filters?.trialStates?.length) ||
      Boolean(filters?.tags?.length) ||
      Boolean(filters?.search)
    )
  }

  const hasFilters = hasActiveFilters(filters) || hasActiveFilters(otherFilters)

  const toggleFilter = <T,>(values: T[], item: T) => {
    return values.includes(item) ? values.filter((value) => value !== item) : [...values, item]
  }

  const handleClearFilters = () => {
    const availableFilters = { ...otherFilters, ...filters }
    onChange?.({
      ...(availableFilters.elements !== undefined && { elements: [] }),
      ...(availableFilters.statuses !== undefined && { statuses: [] }),
      ...(availableFilters.nations !== undefined && { nations: [] }),
      ...(availableFilters.weaponTypes !== undefined && { weaponTypes: [] }),
      ...(availableFilters.domainTypes !== undefined && { domainTypes: [] }),
      ...(availableFilters.teamSizes !== undefined && { teamSizes: [] }),
      ...(availableFilters.trialStates !== undefined && { trialStates: [] }),
      ...(availableFilters.tags !== undefined && { tags: [] }),
      ...(availableFilters.search !== undefined && { search: '' }),
    })
    setRemountKey((key) => key + 1)
  }

  const renderSearch = () => {
    const searchLabel = (() => {
      if (type === 'characters') return t('general.action.searchCharacters')
      if (type === 'teams') return t('general.action.searchTeams')
      if (type === 'domains') return t('general.action.searchDomains')
      if (type === 'trials') return t('general.action.searchTrials')
      return ''
    })()
    return filters.search !== undefined ? (
      <SearchField
        key={remountKey}
        id="filters-search"
        value={filters.search}
        label={searchLabel}
        size="lg"
        className={cx('max-w-xl-0 w-full', surface === 'glass' && 'bg-color-bg-region')}
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

  const renderWeaponTypes = (order?: FilterGroupOrder, className?: string) => {
    return filters.weaponTypes ? (
      <FilterGroup
        items={GENSHIN_WEAPONS}
        selection={filters.weaponTypes}
        order={order}
        surface={surface}
        ariaLabel={t('game.label.weapon')}
        renderLabel={(weapon) => t(`game.weapons.${weapon}`)}
        renderIcon={(weapon) => (
          <img src={weaponIcons[weapon][0]} alt="" className="h-xs-9 w-xs-9 mr-xs-1 brightness-90" />
        )}
        className={className}
        onToggle={(weapon) => onChange?.({ ...filters, weaponTypes: toggleFilter(filters.weaponTypes!, weapon) })}
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

  const renderDomainTypes = () => {
    const icons = {
      trounce: faDragon,
      blessing: faFeatherPointed,
      forgery: faHammer,
      mastery: faBook,
      onetime: faDice,
    } as const
    return filters.domainTypes ? (
      <FilterGroup
        items={DOMAIN_TYPES}
        selection={filters.domainTypes}
        surface={surface}
        ariaLabel={t('game.label.domainType')}
        renderLabel={(domainType) => t(`game.domains.${domainType}`)}
        renderIcon={(domainType) => (
          <FontAwesomeIcon icon={icons[domainType]} aria-hidden className="ml-xs-0 mr-xs-1 text-size-xs" />
        )}
        onToggle={(domainType) =>
          onChange?.({ ...filters, domainTypes: toggleFilter(filters.domainTypes!, domainType) })
        }
      />
    ) : null
  }

  const renderTeamSizes = () => {
    const icons = { solo: faUser, duo: faUserGroup, trio: faUsers, quad: faUsers }
    return filters.teamSizes ? (
      <FilterGroup
        items={TEAM_SIZES}
        selection={filters.teamSizes}
        surface={surface}
        ariaLabel={t('game.label.teamSize')}
        renderLabel={(teamSize) => t(`game.label.${teamSize}`)}
        renderIcon={(teamSize) => (
          <FontAwesomeIcon icon={icons[teamSize]} aria-hidden className="ml-xs-0 mr-xs-1 text-size-xs" />
        )}
        onToggle={(teamSize) => onChange?.({ ...filters, teamSizes: toggleFilter(filters.teamSizes!, teamSize) })}
      />
    ) : null
  }

  const renderTrialStates = (className?: string) => {
    const iconClass = 'size-xs-7 mr-xs-1 text-color-text-subtle'
    return filters.trialStates ? (
      <FilterGroup
        items={TRIAL_STATES}
        selection={filters.trialStates}
        surface={surface}
        ariaLabel={t('game.label.trialState')}
        renderLabel={(trialState) => t(`game.label.${trialState}`)}
        renderIcon={(state) => {
          if (state === 'completed') return <FontAwesomeIcon icon={faTrophy} aria-hidden className={iconClass} />
          if (state === 'failed') return <FontAwesomeIcon icon={faSkullCrossbones} aria-hidden className={iconClass} />
          if (state === 'pending') return <SwordsIcon strokeWidth={2.5} aria-hidden className={iconClass} />
        }}
        className={className}
        onToggle={(state) => onChange?.({ ...filters, trialStates: toggleFilter(filters.trialStates!, state) })}
      />
    ) : null
  }

  const renderTags = (className?: string) => {
    const SHOW_ALL_COUNT = 10
    const hasColoredTags = tagOptionsWithColor.length > 0
    const isCollapsible = hasColoredTags && tagOptionsWithoutColor.length > 0 && tagOptions.length > SHOW_ALL_COUNT
    const showAllTags = !isCollapsible || showMoreTags

    return filters.tags && tagOptions.length > 0 ? (
      <FilterGroup
        items={[
          ...tagOptionsWithColor,
          ...(showAllTags
            ? tagOptionsWithoutColor
            : tagOptionsWithoutColor.filter((tag) => filters.tags?.includes(tag))),
        ]}
        selection={filters.tags}
        surface={surface}
        ariaLabel={t('game.label.tags')}
        renderItem={(tag) => <Tag value={tag} size="xs" style={getTagStyle(tag)} />}
        footer={
          isCollapsible ? (
            <Button size="xs" variant="optional" onClick={() => setShowMoreTags((expanded) => !expanded)}>
              {showMoreTags ? t('general.action.showLess') : t('general.action.showMore')}
            </Button>
          ) : undefined
        }
        className={className}
        onToggle={(tag) => onChange?.({ ...filters, tags: toggleFilter(filters.tags!, tag) })}
      />
    ) : null
  }

  return {
    hasFilters,
    handleClearFilters,
    renderDomainTypes,
    renderElements,
    renderNations,
    renderSearch,
    renderStatuses,
    renderTags,
    renderTeamSizes,
    renderTrialStates,
    renderWeaponTypes,
  }
}
