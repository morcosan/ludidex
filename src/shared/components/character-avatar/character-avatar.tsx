import { Image } from '@design-system'
import { type GenshinCharacter } from '../../data/genshin/characters'
import { GENSHIN_ELEMENT_COLORS } from '../../data/genshin/core'
import { type CharacterStatus } from '../../data/settings'
import { Particles } from '../particles/particles'

interface ClassConfig {
  root: string
  bg: string
  img: string
}

export interface CharacterAvatarProps extends ReactProps {
  character: GenshinCharacter
  status?: CharacterStatus
  className?: string
}

export const CharacterAvatar = (props: CharacterAvatarProps) => {
  const { character, status = 'main', className } = props

  const classConfig: Record<CharacterStatus, ClassConfig> = {
    maxed: { root: 'saturate-130', bg: '', img: '' },
    main: { root: '', bg: '', img: '' },
    building: { root: '', bg: 'brightness-60', img: '' },
    benched: { root: '', bg: 'brightness-60', img: 'saturate-50 brightness-90' },
    unused: { root: '', bg: 'brightness-60', img: 'grayscale brightness-70' },
    pulling: { root: 'animate-pulse', bg: '', img: '' },
    missing: { root: 'opacity-40 ', bg: '', img: '' },
    ignored: { root: 'opacity-40 grayscale', bg: '', img: '' },
  }

  return (
    <span
      className={cx('relative aspect-square rounded-md', className, classConfig[status]?.root)}
      style={{ '--element-color': GENSHIN_ELEMENT_COLORS[character.element] }}
    >
      <span
        className={cx(
          'absolute inset-0 rounded-md bg-(--element-color) inset-shadow-[0_0_20px_rgb(0_0_0/0.1)]',
          classConfig[status]?.bg,
        )}
      />
      <Image
        srcs={character.iconUrls}
        loading="lazy"
        className={cx('pointer-events-none relative aspect-square rounded-md object-cover', classConfig[status]?.img)}
      />
      {status === 'maxed' && (
        <Particles color={GENSHIN_ELEMENT_COLORS[character.element]} shape="square" className="saturate-130" />
      )}
    </span>
  )
}
