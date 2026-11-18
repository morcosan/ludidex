import { type GenshinCharacter } from '../../../data'
import { CharacterAvatar } from '../../character-avatar/character-avatar'

interface CharacterNameProps {
  character: GenshinCharacter
  sticky?: boolean
}

export const CharacterName = (props: CharacterNameProps) => {
  const { character, sticky } = props

  return (
    <>
      {sticky && <CharacterAvatar character={character} className="top-xs-3 left-xs-2 size-sm-3 absolute! mt-px" />}

      <div className={cx('transition-[padding] ease-out', sticky && '-ml-xs-8 pl-sm-6')}>
        <h3>{character.name}</h3>
        <div className="text-size-xs text-color-text-subtle pb-xs-0 truncate px-px leading-1">{character.fullName}</div>
      </div>
    </>
  )
}
