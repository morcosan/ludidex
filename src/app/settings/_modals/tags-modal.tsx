import { type TagColor } from '@app-shared/data'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { getTagColorStyle, useUserTags } from '@app-shared/utils/use-user-tags'
import { parseUserInput } from '@app-shared/utils/various'
import { Modal, Tag } from '@design-system'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TagColorSelector } from '../_partials/tag-color-selector'
import { TagNameField } from '../_partials/tag-name-field'
import { TagPreview } from '../_partials/tag-preview'
import { type Draft } from '../_partials/tag-types'
import { TagsSaveButton } from '../_partials/tags-save-button'

interface TagsModalProps {
  opened: boolean
  onClose?: () => void
}

export const TagsModal = (props: TagsModalProps) => {
  const { opened, onClose } = props
  const { t } = useTranslation()
  const { getTagColor, tagOptions } = useUserTags()
  const updateTags = useUserDataStore((state) => state.updateTags)
  const { control, getValues, handleSubmit, reset, setValue } = useForm<Draft>({
    defaultValues: { tags: [] },
  })
  const [showError, setShowError] = useState(false)

  const validateDraft = (draft: Draft): Draft => {
    const counts = new Map<string, number>()
    const entries = draft.tags.map((value) => {
      const name = parseUserInput(value.name)
      return { value, name, key: name.toLowerCase() }
    })
    for (const { name, key } of entries) {
      if (name) counts.set(key, (counts.get(key) ?? 0) + 1)
    }
    return {
      tags: entries.map(({ value, name, key }) => ({ ...value, name, invalid: name !== '' && counts.get(key)! > 1 })),
    }
  }

  const updateValidatedDraft = (draft: Draft) => {
    const validated = validateDraft(draft)
    validated.tags.forEach((value, index) => {
      const current = draft.tags[index]
      if (value.name !== current.name) setValue(`tags.${index}.name`, value.name)
      if (value.invalid !== current.invalid) setValue(`tags.${index}.invalid`, value.invalid)
    })
    return validated
  }

  const handleClickSave = handleSubmit((draft: Draft) => {
    setShowError(true)

    const validated = updateValidatedDraft(draft)
    if (validated.tags.some(({ invalid }) => invalid)) return

    const tagColors: Record<string, TagColor> = {}
    const renamedTags: Record<string, string> = {}
    for (const { tag, color, name } of validated.tags) {
      if (color && name) {
        tagColors[name] = color
      }
      if (name !== tag) {
        renamedTags[tag] = name
      }
    }
    updateTags(tagColors, renamedTags)
    onClose?.()
  })

  useEffect(() => {
    if (opened) {
      reset({ tags: tagOptions.map((tag) => ({ tag, color: getTagColor(tag), name: tag, invalid: false })) })
      setShowError(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, reset])

  return (
    <Modal
      opened={opened}
      title={t('general.action.editTags')}
      width="md"
      actions={<TagsSaveButton control={control} onClick={handleClickSave} label={t('general.action.applyChanges')} />}
      onClose={onClose}
    >
      <div className="gap-y-xs-3 flex flex-col">
        {showError && (
          <Controller
            control={control}
            name="tags"
            render={({ field }) =>
              field.value.some(({ invalid }) => invalid) ? (
                <p role="alert" className="text-size-sm text-color-red-11 gap-xs-1 mb-xs-4 flex items-center">
                  <FontAwesomeIcon aria-hidden icon={faTriangleExclamation} />
                  {t('general.notice.invalidTagLabels')}
                </p>
              ) : (
                <></>
              )
            }
          />
        )}

        <table className="w-full table-fixed">
          <thead>
            <tr className="text-left">
              <th className="w-md-7 pb-xs-1">{t('general.label.tag')}</th>
              <th className="w-lg-6 pb-xs-1">{t('general.label.color')}</th>
              <th className="pb-xs-1 pr-xs-7 pl-xs-2 text-right">{t('general.label.current')}</th>
              <th className="pb-xs-1 pl-xs-7 flex">
                <span className="w-xs-6"></span>
                {t('general.label.updated')}
              </th>
            </tr>
          </thead>
          <tbody>
            {tagOptions.map((tag, index) => {
              const initialColor = getTagColor(tag)
              return (
                <tr key={tag}>
                  <td className="py-xs-1 pr-xs-4">
                    <TagNameField control={control} index={index} onBlur={() => updateValidatedDraft(getValues())} />
                  </td>

                  <td className="py-xs-1 pr-xs-4">
                    <TagColorSelector control={control} name={`tags.${index}.color`} />
                  </td>

                  <td className="py-xs-1 pr-xs-7 pl-xs-2">
                    <span id={`tag-${index}`} className="flex justify-end">
                      <Tag value={tag} size="sm" style={initialColor ? getTagColorStyle(initialColor) : undefined} />
                    </span>
                  </td>

                  <td className="py-xs-1">
                    <TagPreview control={control} tag={tag} index={index} initialColor={initialColor} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}
