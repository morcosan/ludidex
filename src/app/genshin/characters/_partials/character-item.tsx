import { CharacterAvatar } from '@app-shared/components'
import { type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { type CharacterStatus } from '@app-shared/data/settings'
import { Card } from '@design-system'

interface CharacterItemProps {
  character: GenshinCharacter
  sizeClass: string
  status?: CharacterStatus
  selected?: boolean
  noLabel?: boolean
  onClick?: (character: GenshinCharacter) => void
}

export const CharacterItem = (props: CharacterItemProps) => {
  const { character, sizeClass, status, selected, noLabel, onClick } = props

  return (
    <Card
      state={selected ? 'selected' : 'active'}
      classNames={{
        surface: cx(noLabel ? 'p-px!' : 'p-xs-0!'),
        content: 'relative flex w-full flex-col',
      }}
      data-character-item
      onClick={() => onClick?.(character)}
    >
      <CharacterAvatar character={character} status={status} className={sizeClass} />
      {!noLabel && (
        <div className={cx('translate-y-xs-0 text-size-xs truncate rounded-b-md text-center', sizeClass)}>
          {character.name}
        </div>
      )}
    </Card>
  )
}
