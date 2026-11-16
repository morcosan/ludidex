import { Image } from '@design-system'
import { GENSHIN_ELEMENT_COLORS, type GenshinCharacter } from '../../../data'
import { useUserAssetsStore } from '../../../state/use-user-assets'

interface BannerImageProps {
  members: (GenshinCharacter | null)[]
  editing?: boolean
}

export const BannerImage = ({ members, editing }: BannerImageProps) => {
  const { getCharacterBanners } = useUserAssetsStore()

  const imageFilterClass = cx('pointer-events-none absolute inset-0 brightness-20')

  return (
    <div className="bg-color-bg-skeleton relative flex aspect-5/3 overflow-hidden rounded-md">
      {members
        .filter((member): member is GenshinCharacter => Boolean(member))
        .map((member) => (
          <div
            key={member.id}
            className={cx(
              'relative h-full flex-1',
              !editing && 'duration-sm transition-[flex-grow] ease-in hover:grow-4',
            )}
            style={{ '--element-color': GENSHIN_ELEMENT_COLORS[member.element] }}
          >
            <div className={cx('bg-(--element-color)', imageFilterClass)} />
            <Image srcs={getCharacterBanners(member.id)} className="relative size-full object-cover" />
            <div className={cx('shadow-[inset_0_0_1rem_var(--element-color)]', imageFilterClass)} />
          </div>
        ))}
    </div>
  )
}
