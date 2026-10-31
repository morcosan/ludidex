import { CharacterAvatar } from '@app-shared/components'
import { type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { type CharacterStatus } from '@app-shared/data/settings'
import { Card } from '@design-system'

interface CharacterItemProps {
  character: GenshinCharacter
  status?: CharacterStatus
  selected?: boolean
  noLabel?: boolean
  classNames: {
    avatar: string
    label: string
  }
  onClick?: (character: GenshinCharacter) => void
}

export const CharacterItem = (props: CharacterItemProps) => {
  const { character, classNames, status, selected, noLabel, onClick } = props

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
      <CharacterAvatar character={character} status={status} className={classNames.avatar} />
      {!noLabel && (
        <div className={cx('translate-y-xs-0 text-size-xs truncate rounded-b-md text-center', classNames.label)}>
          {character.name}
        </div>
      )}
    </Card>
  )
}
