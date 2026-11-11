import { Image } from '@design-system'
import { GENSHIN_ELEMENT_COLORS, type CharacterStatus, type GenshinCharacter } from '../../data'
import { useUserAssetsStore } from '../../state/use-user-assets'
import { AvatarAura } from '../avatar-aura/avatar-aura'

interface ClassNames {
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
  const { getCharacterIcons } = useUserAssetsStore()
  const iconSrcs = getCharacterIcons(character.id)

  const classNames: Record<CharacterStatus, ClassNames> = {
    maxed: { root: '', bg: 'saturate-130', img: 'saturate-130' },
    main: { root: '', bg: '', img: '' },
    building: { root: '', bg: '', img: 'saturate-40 brightness-85' },
    benched: { root: '', bg: 'brightness-60', img: 'saturate-40 brightness-85' },
    unused: { root: '', bg: 'brightness-60', img: 'saturate-0 brightness-65' },
    pulling: { root: 'animate-pulse', bg: '', img: '' },
    missing: { root: 'opacity-40 ', bg: '', img: '' },
    ignored: { root: 'opacity-40 saturate-0', bg: '', img: '' },
  }

  return (
    <span
      className={cx('relative z-0 flex aspect-square rounded-md', className, classNames[status]?.root)}
      style={{ '--element-color': GENSHIN_ELEMENT_COLORS[character.element] }}
    >
      <span
        className={cx(
          'absolute inset-0 -z-10 rounded-md bg-(--element-color) inset-shadow-[0_0_20px_rgb(0_0_0/0.1)]',
          classNames[status]?.bg,
        )}
      />

      {status === 'maxed' && <AvatarAura scale={1.9} className="absolute! inset-0" />}

      <Image
        srcs={iconSrcs}
        loading="lazy"
        className={cx('pointer-events-none relative aspect-square rounded-md object-cover', classNames[status]?.img)}
      />
    </span>
  )
}
