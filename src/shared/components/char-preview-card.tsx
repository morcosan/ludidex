import { faHeart, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, IconButton, useI18nService } from '@src-ds'
import { random, range } from 'lodash-es'
import { useEffect, useState } from 'react'
import type { GenshinCharacter } from '../data/genshin/characters'
import {
  GenshinElementColor,
  GenshinElementIconUrls,
  GenshinNationIconUrls,
  GenshinWeaponIconUrls,
} from '../data/genshin/core'
import { CharTrait } from './_char-trait'

export interface CharacterPreviewProps extends ReactProps {
  character: GenshinCharacter
  onClose?: () => void
}

const HEARTS_COUNT = 5

const createRandomData = (characterId: string) => ({
  characterId,
  feeling: random(0, HEARTS_COUNT),
  stats: {
    hp: random(10000, 20000),
    atk: random(700, 2000),
    def: random(500, 1500),
    em: random(0, 250),
    critRate: random(5, 100),
    critDmg: random(50, 250),
    er: random(100, 250),
    elemDmgBonus: random(0, 75),
  },
})

export const CharPreviewCard = (props: CharacterPreviewProps) => {
  const { character, className, onClose } = props
  const { translate } = useI18nService()
  const [randomData, setRandomData] = useState(() => createRandomData(character.id))
  const { feeling, stats } = randomData

  const statRows = [
    { label: translate('game.stat.specialBonus'), value: character.bonusStat },
    { label: translate('game.stat.hp'), value: stats.hp },
    { label: translate('game.stat.atk'), value: stats.atk },
    { label: translate('game.stat.def'), value: stats.def },
    { label: translate('game.stat.em'), value: stats.em },
    { label: translate('game.stat.er'), value: `${stats.er}%` },
    { label: translate('game.stat.critRate'), value: `${stats.critRate}%` },
    { label: translate('game.stat.critDmg'), value: `${stats.critDmg}%` },
    { label: translate('game.stat.elemDmgBonus', { element: character.element }), value: `${stats.elemDmgBonus}%` },
  ]

  useEffect(() => {
    setRandomData(createRandomData(character.id))
  }, [character])

  return (
    <Card
      className={cx('w-xl-0', className)}
      bodyClassName="p-0!"
      style={{ '--element-color': GenshinElementColor[character.element] }}
    >
      <div className="p-xs-0 flex w-full flex-col">
        <div className="relative">
          {/* BANNER */}
          <div className="absolute inset-0 rounded-md bg-(--element-color) brightness-20" />
          <img src={character.bannerUrls[0]} alt="" className="pointer-events-none relative aspect-3/2 object-cover" />
          <div
            className={cx(
              'pointer-events-none absolute rounded-md',
              'inset-0 shadow-[inset_0_0_1rem_var(--element-color)] brightness-20',
            )}
          />

          {/* CLOSE BUTTON */}
          {onClose && (
            <IconButton
              size="sm"
              variant="default"
              tooltip={translate('ds.action.close')}
              className="bg-color-bg-card -top-xs-5 -right-xs-5 border-color-border-subtle absolute! border"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmark} aria-hidden className="text-size-md mt-xs-0" />
            </IconButton>
          )}
        </div>

        {/* CONTENT */}
        <div className="gap-y-xs-7 px-xs-8 pt-xs-4 pb-xs-3 flex flex-col">
          {/* HEADER */}
          <div className="flex justify-between">
            {/* NAME */}
            <span className="text-size-xl font-weight-lg">{character.name}</span>

            {/* FEELING */}
            <div className="gap-xs-2 flex items-center">
              <span className="gap-xs-0 flex" role="img" aria-label={`${feeling}/${HEARTS_COUNT}`}>
                {range(HEARTS_COUNT).map((index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faHeart}
                    aria-hidden
                    className={cx('h-xs-8 w-xs-8', index < feeling ? 'text-color-red-11' : 'text-color-border-subtle')}
                  />
                ))}
              </span>
            </div>
          </div>

          {/* TRAITS */}
          <div className="gap-x-xs-5 gap-y-xs-2 flex flex-wrap items-center justify-between">
            <CharTrait label={character.element} icon={GenshinElementIconUrls[character.element][0]} />
            <CharTrait
              label={character.weapon}
              icon={GenshinWeaponIconUrls[character.weapon][0]}
              iconClass="brightness-90"
            />
            <CharTrait
              label={character.nation}
              icon={GenshinNationIconUrls[character.nation][0]}
              iconClass="brightness-40"
            />
          </div>

          {/* STATS */}
          <div className="divide-color-border-subtle mt-xs-3 flex flex-col divide-y">
            <div className="text-size-xs pb-xs-3 uppercase">{translate('game.label.stats')}</div>

            {statRows.map(({ label, value }) => (
              <div key={label} className="gap-xs-2 py-xs-2 flex items-center justify-between">
                <span className="text-size-sm">{label}</span>
                <span className="text-size-sm font-weight-lg">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
