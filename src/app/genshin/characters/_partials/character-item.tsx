import { CharacterAvatar } from '@app-shared/components'
import { type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { type CharacterStatus } from '@app-shared/data/settings'
import { Card } from '@design-system'

interface CharacterItemProps {
  character: GenshinCharacter
  imageClassName: string
  labelClassName: string
  status?: CharacterStatus
  selected?: boolean
  onClick?: (character: GenshinCharacter) => void
}

export const CharacterItem = (props: CharacterItemProps) => {
  const { character, imageClassName, labelClassName, status, selected, onClick } = props

  return (
    <Card
      state={selected ? 'selected' : 'active'}
      surfaceClassName="p-xs-0!"
      contentClassName="relative flex w-full flex-col"
      data-character-item
      onClick={() => onClick?.(character)}
    >
      <CharacterAvatar character={character} status={status} className={imageClassName} />
      <div className={cx('translate-y-xs-0 truncate rounded-b-md text-center', labelClassName)}>{character.name}</div>
    </Card>
  )
}
