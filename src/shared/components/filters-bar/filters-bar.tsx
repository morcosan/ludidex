import { Button, IconButton } from '@design-system'
import { useTranslation } from 'react-i18next'
import {
  GENSHIN_ELEMENTS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPONS,
  type GenshinElement,
  type GenshinNation,
  type GenshinWeaponType,
} from '../../data'
import { useUserAssetsStore } from '../../state/use-user-assets'

export interface FiltersBarValue {
  elements: GenshinElement[]
  weapons: GenshinWeaponType[]
  nations: GenshinNation[]
}

const EMPTY_FILTERS: FiltersBarValue = { elements: [], weapons: [], nations: [] }

export interface FiltersBarProps extends ReactProps {
  value: FiltersBarValue
  surface?: 'glass' | 'paper'
  onChange?: (filters: FiltersBarValue) => void
}

export const FiltersBar = (props: FiltersBarProps) => {
  const { value, surface = 'glass', className, onChange } = props
  const { t } = useTranslation()
  const { getElementIcons, getWeaponIcons, getNationIcons } = useUserAssetsStore()
  const elementIcons = getElementIcons()
  const weaponIcons = getWeaponIcons()
  const nationIcons = getNationIcons()
  const hasFilters = value.elements.length > 0 || value.weapons.length > 0 || value.nations.length > 0

  const groupClass = cx(
    'gap-xs-1 py-xs-1 px-xs-2 flex flex-wrap',
    'rounded-max border',
    surface === 'glass'
      ? 'bg-color-bg-region border-color-border-inset'
      : 'bg-color-bg-field border-color-border-surface',
  )

  const toggleFilter = <T,>(values: T[], item: T) => {
    return values.includes(item) ? values.filter((value) => value !== item) : [...values, item]
  }

  const handleClearFilters = () => onChange?.(EMPTY_FILTERS)

  return (
    <div className={cx('gap-xs-5 flex flex-wrap items-center', className)}>
      {/* ELEMENTS */}
      <div role="group" aria-label={t('game.label.element')} className={groupClass}>
        {GENSHIN_ELEMENTS.map((element) => (
          <IconButton
            key={element}
            size="sm"
            tooltip={t(`game.elements.${element}`)}
            state={value.elements.includes(element) ? 'selected' : 'active'}
            onClick={() => onChange?.({ ...value, elements: toggleFilter(value.elements, element) })}
          >
            <img src={elementIcons[element][0]} alt="" className="h-sm-0 w-sm-0" />
          </IconButton>
        ))}
      </div>

      {/* WEAPONS */}
      <div className={groupClass} role="group" aria-label={t('game.label.weapon')}>
        {GENSHIN_WEAPONS.map((weapon) => (
          <IconButton
            key={weapon}
            size="sm"
            tooltip={t(`game.weapons.${weapon}`)}
            state={value.weapons.includes(weapon) ? 'selected' : 'active'}
            onClick={() => onChange?.({ ...value, weapons: toggleFilter(value.weapons, weapon) })}
          >
            <img src={weaponIcons[weapon][0]} alt="" className="h-sm-0 w-sm-0 brightness-90" />
          </IconButton>
        ))}
      </div>

      {/* NATIONS */}
      <div className={groupClass} role="group" aria-label={t('game.label.nation')}>
        {GENSHIN_NATIONS.map((nation) => (
          <IconButton
            key={nation}
            size="sm"
            tooltip={t(`game.nations.${nation}`)}
            state={value.nations.includes(nation) ? 'selected' : 'active'}
            onClick={() => onChange?.({ ...value, nations: toggleFilter(value.nations, nation) })}
          >
            {nationIcons[nation][0] ? (
              <img src={nationIcons[nation][0]} alt="" className="h-sm-0 w-sm-0 brightness-40" />
            ) : (
              <span className="text-size-xs text-color-text-placeholder">{t('game.nations.none')}</span>
            )}
          </IconButton>
        ))}
      </div>

      {/* CLEAR BUTTON */}
      <Button size="sm" variant="optional" state={hasFilters ? 'active' : 'disabled'} onClick={handleClearFilters}>
        {t('general.action.clearFilters')}
      </Button>
    </div>
  )
}
