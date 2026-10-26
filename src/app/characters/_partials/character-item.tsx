import { type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { GenshinElementColor } from '@app-shared/data/genshin/core'
import { type CharacterStatus } from '@app-shared/state/types'
import { Card, Image } from '@design-system'

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

  const statusClasses: Record<CharacterStatus, { bg: string; char: string }> = {
    active: { bg: '', char: '' },
    benched: { bg: '', char: 'grayscale brightness-85' },
    pulling: { bg: 'animate-pulse', char: '' },
    missing: { bg: 'opacity-50', char: '' },
    skipped: { bg: 'opacity-50', char: 'grayscale opacity-30' },
  }
  const bgClass = status && statusClasses[status].bg
  const charClass = status && statusClasses[status].char

  return (
    <Card
      state={selected ? 'selected' : 'active'}
      surfaceClassName="p-xs-0!"
      contentClassName="relative flex w-full flex-col"
      onClick={() => onClick?.(character)}
    >
      <div
        className={cx('rounded-md bg-(--element-color) inset-shadow-[0_0_20px_rgb(0_0_0/0.1)]', bgClass)}
        style={{ '--element-color': GenshinElementColor[character.element] }}
      >
        <Image
          srcs={character.iconUrls}
          alt=""
          loading="lazy"
          className={cx('pointer-events-none rounded-md object-cover', imageClassName, charClass)}
        />
      </div>

      <div className={cx('translate-y-xs-0 truncate rounded-b-md text-center', labelClassName)}>{character.name}</div>
    </Card>
  )
}
