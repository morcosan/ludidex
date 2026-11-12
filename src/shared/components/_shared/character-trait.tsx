import { Image } from '@design-system'
import { type ReactNode } from 'react'

export interface CharacterTraitProps extends ReactProps {
  label: string
  iconSrcs?: string[]
  icon?: ReactNode
  small?: boolean
  classNames?: {
    icon?: string
    label?: string
  }
}

export const CharacterTrait = (props: CharacterTraitProps) => {
  const { label, iconSrcs, icon, small, className, classNames } = props

  return (
    <span className={cx('gap-xs-1 flex items-center', className)}>
      {icon ??
        (iconSrcs && (
          <Image srcs={iconSrcs} className={cx(small ? 'h-xs-7 w-xs-7' : 'h-xs-9 w-xs-9', classNames?.icon)} />
        ))}
      <span className={cx('leading-1', small ? 'text-size-xs' : 'text-size-sm', classNames?.label)}>{label}</span>
    </span>
  )
}
