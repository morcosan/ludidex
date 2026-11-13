import { Card } from '@design-system'
import { GlobeIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { type CharacterStatus, type GenshinCharacter } from '../../../data'
import { useUserAssetsStore } from '../../../state/use-user-assets'
import { CharacterTrait } from '../../_shared/character-trait'
import { CharacterAvatar } from '../../character-avatar/character-avatar'

interface MemberItemProps {
  character?: GenshinCharacter
  status?: CharacterStatus
  editing?: boolean
  onClick?: () => void
}

export const MemberItem = ({ character, status, editing, onClick }: MemberItemProps) => {
  const { t } = useTranslation()
  const { getElementIcons, getWeaponIcons, getNationIcons } = useUserAssetsStore()
  const elementIcons = getElementIcons()
  const weaponIcons = getWeaponIcons()
  const nationIcons = getNationIcons()

  return (
    <li className="py-xs-0 flex">
      <Card
        state={editing ? 'active' : 'static'}
        className="-mx-xs-1 h-fit! min-h-fit! w-full"
        classNames={{
          surface: cx('p-0!', !editing && 'border-transparent! shadow-none!'),
          content: 'p-xs-1 gap-xs-3 flex items-center',
        }}
        onClick={onClick}
      >
        {character ? (
          <>
            <CharacterAvatar character={character} status={status} className="h-sm-5 w-sm-5" />

            <span className="gap-xs-2 flex min-w-0 flex-1 flex-col">
              <span className="text-size-md font-weight-lg truncate leading-1">{character.name}</span>

              <span className="gap-xs-9 text-color-text-subtle text-size-xs flex items-center">
                <CharacterTrait
                  label={t(`game.elements.${character.element}`)}
                  iconSrcs={elementIcons[character.element]}
                  small
                />
                <CharacterTrait
                  label={t(`game.weapons.${character.weapon}`)}
                  iconSrcs={weaponIcons[character.weapon]}
                  classNames={{ icon: 'brightness-90' }}
                  small
                />
                <CharacterTrait
                  label={t(`game.nations.${character.nation}`)}
                  icon={
                    character.nation === 'other' ? (
                      <GlobeIcon aria-hidden className="h-xs-5 w-xs-5 text-color-text-subtle" />
                    ) : undefined
                  }
                  iconSrcs={nationIcons[character.nation]}
                  classNames={{ icon: 'brightness-40' }}
                  small
                />
              </span>
            </span>
          </>
        ) : (
          <>
            <span className="bg-color-bg-skeleton h-sm-5 w-sm-5 rounded-md" />
            <span className="text-size-sm text-color-text-placeholder leading-1">--</span>
          </>
        )}
      </Card>
    </li>
  )
}
