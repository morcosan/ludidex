import { Image } from '@design-system'
import { GENSHIN_ELEMENT_COLORS, type GenshinCharacter } from '../../../data'
import { useUserAssetsStore } from '../../../state/use-user-assets'

interface BannerImageProps {
  character: GenshinCharacter
  editing?: boolean
}

export const BannerImage = ({ character, editing }: BannerImageProps) => {
  const { getCharacterBanners } = useUserAssetsStore()

  const imageFilterClass = cx('pointer-events-none absolute inset-0 brightness-20')

  return (
    <div
      className="relative flex aspect-4/3 overflow-hidden rounded-md"
      style={{ '--element-color': GENSHIN_ELEMENT_COLORS[character.element] }}
    >
      <div className={cx('bg-(--element-color)', imageFilterClass)} />
      <Image
        srcs={getCharacterBanners(character.id)}
        className={cx(
          'relative size-full object-cover',
          !editing && 'duration-sm transition-transform ease-in hover:scale-125',
        )}
      />
      <div className={cx('shadow-[inset_0_0_1rem_var(--element-color)]', imageFilterClass)} />
    </div>
  )
}
