import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ErrorNoticeProps extends ReactProps {
  text: string
}

export const ErrorNotice = ({ text, id, className }: ErrorNoticeProps) => {
  return (
    <p id={id} role="alert" className={cx('text-size-xs text-color-red-11 gap-xs-1 flex items-center', className)}>
      <FontAwesomeIcon aria-hidden icon={faTriangleExclamation} />
      {text}
    </p>
  )
}
