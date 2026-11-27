import { type GenshinCharacter } from '../../data'
import { TeamAvatar } from './team-avatar'

interface ModalTitleProps {
  title: string
  subtitle: string
  members?: GenshinCharacter[]
  className?: string
}

export const ModalTitle = (props: ModalTitleProps) => {
  const { title, subtitle, members, className } = props

  return (
    <span className={cx('gap-xs-2 flex h-full min-w-0 items-center', className)}>
      <TeamAvatar members={members} className="h-sm-2" />
      <span className="flex min-w-0 flex-col gap-px pt-px">
        <span className="min-w-0 truncate">{title}</span>
        <span className="text-size-xs font-weight-sm">{subtitle}</span>
      </span>
    </span>
  )
}