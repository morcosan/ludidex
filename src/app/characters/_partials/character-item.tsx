import { type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { GenshinElementColor } from '@app-shared/data/genshin/core'
import { Card, Image } from '@design-system'

interface CharacterItemProps {
  character: GenshinCharacter
  imageClassName: string
  labelClassName: string
  selected?: boolean
  onClick?: (character: GenshinCharacter) => void
}

export const CharacterItem = (props: CharacterItemProps) => {
  const { character, imageClassName, labelClassName, selected, onClick } = props

  return (
    <Card
      state={selected ? 'selected' : 'active'}
      surfaceClassName="p-xs-0!"
      contentClassName="relative flex w-full flex-col"
      onClick={() => onClick?.(character)}
    >
      <Image
        srcs={character.iconUrls}
        alt=""
        loading="lazy"
        className={cx('pointer-events-none rounded-md bg-(--element-color) object-cover', imageClassName)}
        style={{ '--element-color': GenshinElementColor[character.element] }}
      />
      <div className={cx('translate-y-xs-0 truncate rounded-b-md text-center', labelClassName)}>{character.name}</div>
    </Card>
  )
}
