import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, IconButton } from '@src-ds'
import { useState } from 'react'
import { useTranslation } from '../../core/i18n'
import { CHARACTERS } from '../../shared/data/genshin/characters'
import {
  GENSHIN_ELEMENTS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPONS,
  GenshinElementColor,
  GenshinElementIconUrls,
  GenshinNationIconUrls,
  GenshinWeaponIconUrls,
  type GenshinElement,
  type GenshinNation,
  type GenshinWeapon,
} from '../../shared/data/genshin/core'

export default function Page() {
  const { t } = useTranslation()
  const [elements, setElements] = useState<GenshinElement[]>([])
  const [weapons, setWeapons] = useState<GenshinWeapon[]>([])
  const [nations, setNations] = useState<GenshinNation[]>([])
  const hasFilters = elements.length > 0 || weapons.length > 0 || nations.length > 0

  const characters = CHARACTERS.filter(({ element, weapon, nation }) => {
    return (
      (elements.length === 0 || elements.includes(element)) &&
      (weapons.length === 0 || weapons.includes(weapon)) &&
      (nations.length === 0 || nations.includes(nation))
    )
  })

  const groupClass = cx(
    'gap-xs-1 p-xs-1 flex flex-wrap border',
    'border-color-border-subtle rounded-max bg-color-bg-field',
  )

  const toggleFilter = <T,>(filters: T[], newFilter: T) => {
    return filters.includes(newFilter) ? filters.filter((item) => item !== newFilter) : [...filters, newFilter]
  }

  const handleClearFilters = () => {
    setElements([])
    setWeapons([])
    setNations([])
  }

  return (
    <div className="gap-sm-2 flex h-full flex-col">
      {/* FILTERS */}
      <div className="gap-xs-5 flex flex-wrap items-center">
        {/* ELEMENTS */}
        <div className={groupClass} role="group" aria-label={t('game.label.element')}>
          {GENSHIN_ELEMENTS.map((element) => (
            <IconButton
              key={element}
              size="sm"
              tooltip={element}
              state={elements.includes(element) ? 'selected' : 'active'}
              onClick={() => setElements(toggleFilter(elements, element))}
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
              state={weapons.includes(weapon) ? 'selected' : 'active'}
              onClick={() => setWeapons(toggleFilter(weapons, weapon))}
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
              tooltip={nation === 'None' ? 'None' : nation}
              state={nations.includes(nation) ? 'selected' : 'active'}
              onClick={() => setNations(toggleFilter(nations, nation))}
            >
              {GenshinNationIconUrls[nation][0] ? (
                <img src={GenshinNationIconUrls[nation][0]} alt="" className="h-sm-0 w-sm-0 brightness-40" />
              ) : (
                <span className="">
                  <FontAwesomeIcon icon={faBan} className="h-xs-5 w-xs-5 text-color-text-placeholder" />
                </span>
              )}
            </IconButton>
          ))}
        </div>

        {/* CLEAR BUTTON */}
        <Button size="sm" variant="optional" state={hasFilters ? 'active' : 'disabled'} onClick={handleClearFilters}>
          {t('general.action.clearFilters')}
        </Button>
      </div>

      {/* CHARACTERS */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {characters.length === 0 ? (
          <p className="text-size-sm text-color-text-subtle">{t('game.status.empty')}</p>
        ) : (
          <ul className="gap-xs-8 flex flex-wrap">
            {characters.map((character) => (
              <li key={character.id}>
                <Card state="active" tooltip={character.name} bodyClassName="p-0! ">
                  <div className="relative flex w-full flex-col">
                    <img
                      src={character.iconUrls[0]}
                      alt=""
                      loading="lazy"
                      className="h-md-5 w-md-5 rounded-t-md bg-(--element-color)! object-cover"
                      style={{ '--element-color': GenshinElementColor[character.element] }}
                    />
                    <span
                      className={cx(
                        'pt-px',
                        'bg-color-white text-color-black rounded-b-md',
                        'text-size-xs truncate text-center',
                      )}
                    >
                      {character.name}
                    </span>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
