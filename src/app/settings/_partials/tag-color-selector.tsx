import { TAG_COLORS, TAG_STYLES, type TagColor } from '@app-shared/data'
import { IconButton } from '@design-system'
import { BanIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface TagColorSelectorProps extends ReactProps {
  value?: TagColor | null
  onChange?: (value: TagColor | null) => void
}

export const TagColorSelector = (props: TagColorSelectorProps) => {
  const { value, className, onChange } = props
  const { t } = useTranslation()

  return (
    <div role="group" aria-label={t('general.label.color')} className={cx('gap-xs-0 flex items-center', className)}>
      <IconButton
        tooltip={t('general.label.noColor')}
        variant="optional"
        size="xs"
        state={value === null ? 'selected' : 'active'}
        onClick={() => onChange?.(null)}
      >
        <BanIcon aria-hidden className="size-xs-7 text-color-text-placeholder" />
      </IconButton>

      {TAG_COLORS.map((tagColor) => (
        <IconButton
          key={tagColor}
          tooltip={t(`general.colors.${tagColor}`)}
          variant="optional"
          size="xs"
          state={value === tagColor ? 'selected' : 'active'}
          onClick={() => onChange?.(tagColor)}
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
