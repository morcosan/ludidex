import { TAG_COLORS, TAG_STYLES, type TagColor } from '@app-shared/data'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { getTagColorStyle, parseInput, useUserTags } from '@app-shared/utils/use-user-tags'
import { Button, IconButton, Modal, Tag, TextField } from '@design-system'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BanIcon, MoveRightIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface TagsModalProps {
  opened: boolean
  onClose: () => void
}

interface TagDraft {
  color: TagColor | null
  label: string
  invalid: boolean
}

export const TagsModal = (props: TagsModalProps) => {
  const { opened, onClose } = props
  const { t } = useTranslation()
  const { getTagColor, tagOptionsWithColor, tagOptionsWithoutColor } = useUserTags()
  const updateTags = useUserDataStore((state) => state.updateTags)
  const [draft, setDraft] = useState<Record<string, TagDraft>>({})
  const [validated, setValidated] = useState(false)
  const hasDeletedTags = Object.values(draft).some(({ label }) => label === '')

  const validateDraft = (draft: Record<string, TagDraft>): Record<string, TagDraft> => {
    const labelCounts = new Map<string, number>()
    for (const { label } of Object.values(draft)) {
      if (label) {
        const normalizedLabel = label.toLowerCase()
        labelCounts.set(normalizedLabel, (labelCounts.get(normalizedLabel) ?? 0) + 1)
      }
    }
    return Object.fromEntries(
      Object.entries(draft).map(([tag, value]) => [
        tag,
        { ...value, invalid: value.label !== '' && (labelCounts.get(value.label.toLowerCase()) ?? 0) > 1 },
      ]),
    )
  }

  const handleClickSave = () => {
    const validatedDraft = validateDraft(draft)
    setDraft(validatedDraft)

    if (Object.values(validatedDraft).some(({ invalid }) => invalid)) {
      setValidated(true)
      return
    }

    const tagColors: Record<string, TagColor> = {}
    const renamedTags: Record<string, string> = {}
    for (const [tag, { color, label }] of Object.entries(draft)) {
      if (color && label) {
        tagColors[label] = color
      }
      if (label !== tag) {
        renamedTags[tag] = label
      }
    }
    updateTags(tagColors, renamedTags)
    onClose()
  }

  useEffect(() => {
    if (opened) {
      const tags = [
        ...[...tagOptionsWithColor].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })),
        ...[...tagOptionsWithoutColor].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })),
      ]
      setDraft(Object.fromEntries(tags.map((tag) => [tag, { color: getTagColor(tag), label: tag, invalid: false }])))
      setValidated(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened])

  return (
    <Modal
      opened={opened}
      title={t('general.action.editTags')}
      width="md"
      actions={
        <Button variant={hasDeletedTags ? 'danger' : 'primary'} onClick={handleClickSave}>
          {t('general.action.applyChanges')}
        </Button>
      }
      onClose={onClose}
    >
      <div className="gap-y-xs-3 flex flex-col">
        {validated && Object.values(draft).some(({ invalid }) => invalid) && (
          <p role="alert" className="text-size-sm text-color-red-11 gap-xs-1 mb-xs-4 flex items-center">
            <FontAwesomeIcon aria-hidden icon={faTriangleExclamation} />
            {t('general.notice.invalidTagLabels')}
          </p>
        )}

        <table className="w-full table-fixed">
          <thead>
            <tr className="text-left">
              <th className="w-md-8 pb-xs-1">{t('general.label.tag')}</th>
              <th className="w-lg-7 pb-xs-1">{t('general.label.color')}</th>
              <th className="pb-xs-1 pr-xs-8 text-right">{t('general.label.current')}</th>
              <th className="pb-xs-1 pl-sm-2">{t('general.label.updated')}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(draft).map(([tag, { color, label, invalid }], index) => {
              const initialColor = getTagColor(tag)
              return (
                <tr key={tag}>
                  <td className="py-xs-1 pr-xs-4">
                    <TextField
                      id={`tag-label-${index}`}
                      value={label}
                      size="xs"
                      className="w-full"
                      invalid={invalid}
                      ariaDescribedBy={`tag-${index}`}
                      onBlur={() => setDraft((state) => validateDraft(state))}
                      onChange={(value) => {
                        setDraft((state) => ({ ...state, [tag]: { ...state[tag], label: parseInput(value) } }))
                      }}
                    />
                  </td>
                  <td className="py-xs-1 pr-xs-4">
                    <div role="group" aria-label={t('general.label.color')} className="gap-xs-0 flex items-center">
                      <IconButton
                        tooltip={t('general.label.noColor')}
                        variant="optional"
                        size="xs"
                        state={color === null ? 'selected' : 'active'}
                        onClick={() => setDraft((state) => ({ ...state, [tag]: { ...state[tag], color: null } }))}
                      >
                        <BanIcon aria-hidden className="size-xs-7 text-color-text-placeholder" />
                      </IconButton>
                      {TAG_COLORS.map((tagColor) => (
                        <IconButton
                          key={tagColor}
                          tooltip={t(`general.colors.${tagColor}`)}
                          variant="optional"
                          size="xs"
                          state={color === tagColor ? 'selected' : 'active'}
                          onClick={() => setDraft((state) => ({ ...state, [tag]: { ...state[tag], color: tagColor } }))}
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
                  </td>
                  <td className="py-xs-1 pr-xs-8">
                    <label id={`tag-${index}`} className="flex justify-end">
                      <Tag value={tag} size="sm" style={initialColor ? getTagColorStyle(initialColor) : undefined} />
                    </label>
                  </td>
                  <td className="py-xs-1 pr-xs-4">
                    {(label !== tag || color !== initialColor) && (
                      <span className="gap-xs-8 flex items-center">
                        <MoveRightIcon strokeWidth={1.5} aria-hidden className="size-xs-6" />
                        {invalid && label !== tag ? (
                          <span className="text-color-red-12 text-size-xs flex items-center">
                            <FontAwesomeIcon aria-hidden icon={faTriangleExclamation} className="mr-xs-0" />
                            {t('general.label.invalid')}
                          </span>
                        ) : label === '' ? (
                          <span className="text-color-red-12 text-size-xs flex items-center">
                            <FontAwesomeIcon icon={faTrashCan} className="mr-xs-0" />
                            {t('general.label.deleted')}
                          </span>
                        ) : (
                          <Tag value={label} size="sm" style={color ? getTagColorStyle(color) : undefined} />
                        )}
                      </span>
                    )}
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
