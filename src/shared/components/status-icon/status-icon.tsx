import {
  faBan,
  faBoxArchive,
  faChair,
  faHammer,
  faHeartCrack,
  faPersonRunning,
  faSpinner,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ReactNode } from 'react'
import { STATUS_COLORS, type CharacterStatus } from '../../data/settings'

export interface StatusIconProps extends ReactProps {
  value: CharacterStatus
  large?: boolean
  className?: string
}

export const StatusIcon = (props: StatusIconProps) => {
  const { value, large, className } = props
  const iconClasses: Record<CharacterStatus, string> = {
    maxed: cx(large ? 'text-size-xxl' : 'text-size-sm'),
    main: cx(large ? 'text-size-xxl' : 'text-size-md'),
    building: cx(large ? 'text-size-xxl' : 'text-size-xs'),
    benched: cx(large ? 'text-size-xxl' : 'text-size-sm'),
    unused: cx(large ? 'text-size-xxl' : 'text-size-xs pb-px'),
    pulling: cx(large ? 'text-size-xxl' : 'text-size-md'),
    missing: cx(large ? 'text-size-xxl' : 'text-size-sm'),
    ignored: cx(large ? 'text-size-xxl' : 'text-size-xs'),
  }
  const iconProps = { className: cx('text-color-inherit! w-full!', iconClasses[value]) }
  const icons: Record<CharacterStatus, ReactNode> = {
    maxed: <FontAwesomeIcon icon={faTrophy} {...iconProps} />,
    main: <FontAwesomeIcon icon={faPersonRunning} {...iconProps} />,
    building: <FontAwesomeIcon icon={faHammer} {...iconProps} />,
    benched: <FontAwesomeIcon icon={faChair} {...iconProps} />,
    unused: <FontAwesomeIcon icon={faBoxArchive} {...iconProps} />,
    pulling: <FontAwesomeIcon icon={faSpinner} {...iconProps} />,
    missing: <FontAwesomeIcon icon={faHeartCrack} {...iconProps} />,
    ignored: <FontAwesomeIcon icon={faBan} {...iconProps} />,
  }

  return (
    <span className={cx(large ? 'w-sm-3 p-xs-1' : 'w-xs-9', className)} style={{ color: STATUS_COLORS[value] }}>
      {icons[value]}
    </span>
  )
}
