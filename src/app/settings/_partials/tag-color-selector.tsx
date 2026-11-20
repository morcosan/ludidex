import { TAG_COLORS, TAG_STYLES, type TagColor } from '@app-shared/data'
import { IconButton } from '@design-system'
import { BanIcon } from 'lucide-react'
import { useController, type Control, type FieldPathByValue, type FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface TagColorSelectorProps<T extends FieldValues> extends ReactProps {
  control: Control<T>
  name: FieldPathByValue<T, TagColor | null>
}

export const TagColorSelector = <TFieldValues extends FieldValues>(props: TagColorSelectorProps<TFieldValues>) => {
  const { control, name, className } = props
  const { t } = useTranslation()
  const { field } = useController({ control, name })

  return (
    <div role="group" aria-label={t('general.label.color')} className={cx('gap-xs-0 flex items-center', className)}>
      <IconButton
        tooltip={t('general.label.noColor')}
        variant="optional"
        size="xs"
        state={field.value === null ? 'selected' : 'active'}
        onClick={() => field.onChange(null)}
      >
        <BanIcon aria-hidden className="size-xs-7 text-color-text-placeholder" />
      </IconButton>

      {TAG_COLORS.map((tagColor) => (
        <IconButton
          key={tagColor}
          tooltip={t(`general.colors.${tagColor}`)}
          variant="optional"
          size="xs"
          state={field.value === tagColor ? 'selected' : 'active'}
          onClick={() => field.onChange(tagColor)}
        >
          <span
            className="size-xs-7 rounded-full border"
            style={{
              backgroundColor: TAG_STYLES[tagColor].bg,
              borderColor: TAG_STYLES[tagColor].border,
            }}
          />
        </IconButton>
      ))}
    </div>
  )
}
