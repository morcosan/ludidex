import { type TagColor } from '@app-shared/data'
import { getTagColorStyle } from '@app-shared/utils/use-user-tags'
import { Tag } from '@design-system'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MoveRightIcon } from 'lucide-react'
import { useWatch, type Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { type Draft } from './tag-types'

interface TagPreviewProps {
  control: Control<Draft>
  tag: string
  index: number
  initialColor: TagColor | null
}

export const TagPreview = (props: TagPreviewProps) => {
  const { control, tag, index, initialColor } = props
  const { t } = useTranslation()
  const name = useWatch({ control, name: `tags.${index}.name` })
  const color = useWatch({ control, name: `tags.${index}.color` })
  const invalid = useWatch({ control, name: `tags.${index}.invalid` })

  return name !== tag || color !== initialColor ? (
    <span className="gap-xs-7 flex items-center truncate">
      <MoveRightIcon strokeWidth={1.5} aria-hidden className="size-xs-6 min-w-xs-6" />
      {invalid && name !== tag ? (
        <span className="text-color-red-12 text-size-xs flex items-center">
          <FontAwesomeIcon aria-hidden icon={faTriangleExclamation} className="mr-xs-0" />
          {t('general.label.invalid')}
        </span>
      ) : name === '' ? (
        <span className="text-color-red-12 text-size-xs flex items-center">
          <FontAwesomeIcon icon={faTrashCan} className="mr-xs-0" />
          {t('general.label.deleted')}
        </span>
      ) : (
        <Tag value={name} size="sm" style={color ? getTagColorStyle(color) : undefined} />
      )}
    </span>
  ) : null
}
