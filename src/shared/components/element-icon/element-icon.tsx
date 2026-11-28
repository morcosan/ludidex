import { GENSHIN_ELEMENT_COLORS, type GenshinElementType } from '@app-shared/data'
import { useUserAssetsStore } from '@app-shared/state/use-user-assets'
import { Image } from '@design-system'

export interface ElementIconProps extends ReactProps {
  type: GenshinElementType
}

export const ElementIcon = ({ type, className, style }: ElementIconProps) => {
  const { getElementIcons } = useUserAssetsStore()
  const elementIcons = getElementIcons()

  const color = type === 'physical' || type === 'dynamic' ? '' : GENSHIN_ELEMENT_COLORS[type]

  return (
    <Image
      srcs={elementIcons[type]}
      className={cx('rounded-full', className)}
      style={{
        backgroundImage: `radial-gradient(circle, ${color} 40%, transparent 75%)`,
        filter: 'saturate(1.6)',
        ...style,
      }}
    />
  )
}
