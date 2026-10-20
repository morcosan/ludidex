import {
  GENSHIN_ELEMENTS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPONS,
  GenshinElementIconUrls,
  GenshinNationIconUrls,
  GenshinWeaponIconUrls,
  type GenshinElement,
  type GenshinNation,
  type GenshinWeaponType,
} from '@app-shared/data/genshin/core'
import { Button, IconButton } from '@design-system'
import { useTranslation } from 'react-i18next'

interface CharacterFilters {
  elements: GenshinElement[]
  weapons: GenshinWeaponType[]
  nations: GenshinNation[]
}

interface TopFiltersProps {
  value: CharacterFilters
  onChange: (filters: CharacterFilters) => void
}

const TopFilters = ({ value, onChange }: TopFiltersProps) => {
  const { t } = useTranslation()
  const hasFilters = value.elements.length > 0 || value.weapons.length > 0 || value.nations.length > 0

  const groupClass = cx('gap-xs-1 p-xs-1 flex flex-wrap border', 'border-color-border-subtle rounded-max')

  const toggleFilter = <T,>(values: T[], item: T) => {
    return values.includes(item) ? values.filter((value) => value !== item) : [...values, item]
  }

  const handleClearFilters = () => {
    onChange({ elements: [], weapons: [], nations: [] })
  }

  return (
    <div className="gap-xs-5 flex flex-wrap items-center">
      {/* ELEMENTS */}
      <div className={groupClass} role="group" aria-label={t('game.label.element')}>
        {GENSHIN_ELEMENTS.map((element) => (
          <IconButton
            key={element}
            size="sm"
            tooltip={element}
            state={value.elements.includes(element) ? 'selected' : 'active'}
            onClick={() => onChange({ ...value, elements: toggleFilter(value.elements, element) })}
          >
            <img src={GenshinElementIconUrls[element][0]} alt="" className="h-sm-0 w-sm-0" />
          </IconButton>
        ))}
      </div>

      {/* WEAPONS */}
      <div className={groupClass} role="group" aria-label={t('game.label.weapon')}>
        {GENSHIN_WEAPONS.map((weapon) => (
          <IconButton
            key={weapon}
            size="sm"
            tooltip={weapon}
            state={value.weapons.includes(weapon) ? 'selected' : 'active'}
            onClick={() => onChange({ ...value, weapons: toggleFilter(value.weapons, weapon) })}
          >
            <img src={GenshinWeaponIconUrls[weapon][0]} alt="" className="h-sm-0 w-sm-0 brightness-90" />
          </IconButton>
        ))}
      </div>

      {/* NATIONS */}
      <div className={groupClass} role="group" aria-label={t('game.label.nation')}>
        {GENSHIN_NATIONS.map((nation) => (
          <IconButton
            key={nation}
            size="sm"
            tooltip={nation === 'None' ? 'N/A' : nation}
            state={value.nations.includes(nation) ? 'selected' : 'active'}
            onClick={() => onChange({ ...value, nations: toggleFilter(value.nations, nation) })}
          >
            {GenshinNationIconUrls[nation][0] ? (
              <img src={GenshinNationIconUrls[nation][0]} alt="" className="h-sm-0 w-sm-0 brightness-40" />
            ) : (
              <span className="text-size-xs text-color-text-placeholder">N/A</span>
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

export { TopFilters, type CharacterFilters }
