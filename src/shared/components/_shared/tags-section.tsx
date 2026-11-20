import { Tag, TagsField } from '@design-system'
import { Controller, type Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUserTags } from '../../utils/use-user-tags'
import { parseUserInput } from '../../utils/various'
import { CardSection } from './card-section'

type TagsControl = { tags: string[] }

interface TagsSectionProps<T extends TagsControl> {
  editing: boolean
  control: Control<T>
  tags?: string[]
}

export const TagsSection = <T extends TagsControl>(props: TagsSectionProps<T>) => {
  const { editing, control, tags } = props
  const { t } = useTranslation()
  const { getTagStyle, sortTags, tagOptions } = useUserTags()

  return (
    <CardSection title={t('game.label.tags')} classNames={{ body: 'min-h-field-h-sm' }}>
      {editing ? (
        <Controller
          control={control as unknown as Control<TagsControl>}
          name="tags"
          render={({ field }) => (
            <TagsField
              id="card-tags"
              size="sm"
              value={field.value}
              options={tagOptions}
              getTagStyle={getTagStyle}
              onChange={(tags) => field.onChange(tags.map(parseUserInput))}
            />
          )}
        />
      ) : tags?.length ? (
        <div className="gap-xs-1 flex flex-wrap">
          {sortTags(tags).map((tag) => (
            <Tag key={tag} value={tag} style={getTagStyle(tag)} />
          ))}
        </div>
      ) : (
        <span className="text-size-sm">--</span>
      )}
    </CardSection>
  )
}
