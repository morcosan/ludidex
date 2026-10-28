import { Image } from '@design-system'
import { type GenshinCharacter } from '../../data/genshin/characters'
import { GenshinElementColor } from '../../data/genshin/core'
import { type CharacterStatus } from '../../data/settings'

export interface CharacterAvatarProps extends ReactProps {
  character: GenshinCharacter
  status?: CharacterStatus
  className?: string
}

export const CharacterAvatar = (props: CharacterAvatarProps) => {
  const { character, status = 'active', className } = props

  const statusClasses: Record<CharacterStatus, { bg: string; image: string }> = {
    active: { bg: '', image: '' },
    benched: { bg: '', image: 'grayscale brightness-90' },
    pulling: { bg: 'animate-pulse', image: '' },
    missing: { bg: 'opacity-40', image: '' },
    ignored: { bg: 'opacity-40 grayscale', image: '' },
  }

  return (
    <div
      className={cx(
        'rounded-md bg-(--element-color) inset-shadow-[0_0_20px_rgb(0_0_0/0.1)]',
        statusClasses[status]?.bg,
        className,
      )}
      style={{ '--element-color': GenshinElementColor[character.element] }}
    >
      <Image
        srcs={character.iconUrls}
        alt=""
        loading="lazy"
        className={cx('pointer-events-none rounded-md object-cover', statusClasses[status]?.image)}
      />
    </div>
  )
}
