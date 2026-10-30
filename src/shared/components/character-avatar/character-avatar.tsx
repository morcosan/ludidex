import { Image } from '@design-system'
import { type GenshinCharacter } from '../../data/genshin/characters'
import { GenshinElementColor } from '../../data/genshin/core'
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
    missing: { root: 'opacity-30 ', bg: '', img: '' },
    ignored: { root: 'opacity-30 grayscale', bg: '', img: '' },
  }

  return (
    <div
      className={cx('relative rounded-md', className, classConfig[status]?.root)}
      style={{ '--element-color': GenshinElementColor[character.element] }}
    >
      <div
        className={cx(
          'absolute inset-0 rounded-md bg-(--element-color) inset-shadow-[0_0_20px_rgb(0_0_0/0.1)]',
          classConfig[status]?.bg,
        )}
      />
      <Image
        srcs={character.iconUrls}
        alt=""
        loading="lazy"
        className={cx('pointer-events-none relative aspect-square rounded-md object-cover', classConfig[status]?.img)}
      />
      {status === 'maxed' && (
        <Particles color={GenshinElementColor[character.element]} shape="square" className="saturate-130" />
      )}
    </div>
  )
}
