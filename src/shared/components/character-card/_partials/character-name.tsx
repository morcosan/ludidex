import { type GenshinCharacter } from '../../../data'
import { CharacterAvatar } from '../../character-avatar/character-avatar'

interface CharacterNameProps extends ReactProps {
  character: GenshinCharacter
  sticky?: boolean
}

export const CharacterName = (props: CharacterNameProps) => {
  const { ref, character, sticky } = props

  return (
    <div
      ref={ref}
      className={cx(
        'my-xs-2 -top-xs-0 px-xs-8 py-xs-2 sticky z-10',
        'bg-color-bg-card rounded-t-md transition-[padding] ease-in-out',
        sticky && 'border-color-border-subtle shadow-below-sm pl-sm-4!',
      )}
    >
      {sticky && <CharacterAvatar character={character} className="top-xs-5 left-xs-4 h-sm-0 w-sm-0 absolute!" />}
      <h3 className="text-size-xl font-weight-lg h-field-h-md flex items-center">{character.name}</h3>
      {!sticky && (
        <div className="text-size-xs text-color-text-subtle pb-xs-4 px-px leading-1">{character.fullName}</div>
      )}
    </div>
  )
}
