import { Card } from '@design-system'
import {
  GENSHIN_ELEMENT_ICONS,
  GENSHIN_NATION_ICONS,
  GENSHIN_WEAPON_ICONS,
  type GenshinCharacter,
} from '../../../data/genshin'
import { type CharacterStatus } from '../../../data/settings'
import { CharacterTrait } from '../../_shared/character-trait'
import { CharacterAvatar } from '../../character-avatar/character-avatar'

interface MemberItemProps {
  character?: GenshinCharacter
  status?: CharacterStatus
  editing?: boolean
  onClick?: () => void
}

export const MemberItem = ({ character, status, editing, onClick }: MemberItemProps) => {
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
            <CharacterAvatar character={character} status={status} className="h-sm-5 w-sm-5 shrink-0" />

            <span className="gap-xs-2 flex min-w-0 flex-1 flex-col">
              <span className="text-size-md font-weight-lg truncate leading-1">{character.name}</span>

              <span className="gap-xs-9 text-color-text-subtle text-size-xs flex items-center">
                <CharacterTrait label={character.element} iconSrcs={GENSHIN_ELEMENT_ICONS[character.element]} small />
                <CharacterTrait
                  label={character.weapon}
                  iconSrcs={GENSHIN_WEAPON_ICONS[character.weapon]}
                  classNames={{ icon: 'brightness-90' }}
                  small
                />
                <CharacterTrait
                  label={character.nation}
                  iconSrcs={GENSHIN_NATION_ICONS[character.nation]}
                  classNames={{ icon: 'brightness-40' }}
                  small
                />
              </span>
            </span>
          </>
        ) : (
          <>
            <span className="bg-color-grey-3 h-sm-5 w-sm-5 rounded-md" />
            <span className="text-size-sm text-color-text-placeholder leading-1">--</span>
          </>
        )}
      </Card>
    </li>
  )
}
