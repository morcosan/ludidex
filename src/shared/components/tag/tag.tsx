import { XIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { type TagColor } from '../../data'

export interface TagProps extends ReactProps {
  value?: string
  color?: TagColor
  onRemove?: () => void
}

export const Tag = (props: TagProps) => {
  const { value, color, onRemove, className } = props
  const { t } = useTranslation()

  const colorClass = (() => {
    if (color === 'blue') return 'bg-color-blue-2 border-color-blue-5 text-color-blue-11'
    if (color === 'green') return 'bg-color-green-2 border-color-green-5 text-color-green-13'
    if (color === 'red') return 'bg-color-red-2 border-color-red-5 text-color-red-12'
    if (color === 'yellow') return 'bg-color-yellow-2 border-color-yellow-6 text-color-yellow-12'
    return 'bg-color-grey-3 border-color-grey-6'
  })()

  return (
    <span className={cx('flex-center h-xs-9 flex rounded-sm border', colorClass, className)}>
      <span className="px-xs-2 text-size-xs max-w-lg-5 truncate">{value}</span>

      {onRemove && (
        <button
          type="button"
          title={t('general.action.remove')}
          className="-ml-xs-1 flex-center size-xs-8 hover:bg-color-hover-text-default cursor-pointer rounded-full"
          onMouseDown={(event) => event.preventDefault()}
          onClick={onRemove}
        >
          <XIcon aria-hidden className="size-xs-6" />
        </button>
      )}
    </span>
  )
}
