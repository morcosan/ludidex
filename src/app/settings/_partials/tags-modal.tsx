import { type TagColor } from '@app-shared/data'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { getTagColorStyle, useUserTags } from '@app-shared/utils/use-user-tags'
import { parseUserInput } from '@app-shared/utils/various'
import { Button, Modal, Tag, TextField } from '@design-system'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { debounce } from 'lodash-es'
import { MoveRightIcon } from 'lucide-react'
import { memo, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TagColorSelector } from './tag-color-selector'

type Draft = Record<string, TagDraft>
type TagDraft = {
  name: string
  color: TagColor | null
  invalid: boolean
}
type PendingData = {
  tag: string
  name: string
}

interface TagsModalProps {
  opened: boolean
  onClose: () => void
}

export const TagsModal = (props: TagsModalProps) => {
  const { opened, onClose } = props
  const { t } = useTranslation()
  const { getTagColor, tagOptions } = useUserTags()
  const updateTags = useUserDataStore((state) => state.updateTags)
  const [draft, setDraft] = useState<Draft>({})
  const [showError, setShowError] = useState(false)
  const pendingDataRef = useRef<PendingData | null>(null)
  const debouncedFnRef = useRef<ReturnType<typeof debounce>>(null)
  const hasDeletedTags = Object.values(draft).some(({ name }) => name === '')

  const validateDraft = (draft: Draft): Draft => {
    const counts = new Map<string, number>()
    const entries = Object.entries(draft).map(([tag, value]) => {
      const name = parseUserInput(value.name)
      return { tag, value, name, key: name.toLowerCase() }
    })
    for (const { name, key } of entries) {
      if (name) counts.set(key, (counts.get(key) ?? 0) + 1)
    }
    return Object.fromEntries(
      entries.map(({ tag, value, name, key }) => [
        tag,
        { ...value, name, invalid: name !== '' && counts.get(key)! > 1 } satisfies TagDraft,
      ]),
    )
  }

  const takePendingData = () => {
    const pending = pendingDataRef.current
    pendingDataRef.current = null
    if (pending) debouncedFnRef.current?.cancel()
    return pending
  }

  const applyPendingData = (state: Draft, pending: PendingData | null): Draft => {
    return pending ? { ...state, [pending.tag]: { ...state[pending.tag], name: pending.name } } : state
  }

  const handleBlurLabel = () => {
    const pending = takePendingData()
    setDraft((state) => validateDraft(applyPendingData(state, pending)))
  }

  const handleClickSave = () => {
    setShowError(true)

    const validated = validateDraft(applyPendingData(draft, takePendingData()))
    setDraft(validated)
    if (Object.values(validated).some(({ invalid }) => invalid)) return

    const tagColors: Record<string, TagColor> = {}
    const renamedTags: Record<string, string> = {}
    for (const [tag, { color, name }] of Object.entries(validated)) {
      if (color && name) {
        tagColors[name] = color
      }
      if (name !== tag) {
        renamedTags[tag] = name
      }
    }
    updateTags(tagColors, renamedTags)
    onClose()
  }

  useEffect(() => {
    debouncedFnRef.current = debounce(() => {
      const pending = pendingDataRef.current
      if (!pending) return
      pendingDataRef.current = null
      setDraft((state) => ({ ...state, [pending.tag]: { ...state[pending.tag], name: pending.name } }))
    }, 300)
    return () => debouncedFnRef.current?.cancel()
  }, [])

  useEffect(() => {
    if (opened) {
      setDraft(
        Object.fromEntries(tagOptions.map((tag) => [tag, { color: getTagColor(tag), name: tag, invalid: false }])),
      )
      setShowError(false)
      pendingDataRef.current = null
      debouncedFnRef.current?.cancel()
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
        {showError && Object.values(draft).some(({ invalid }) => invalid) && (
          <p role="alert" className="text-size-sm text-color-red-11 gap-xs-1 mb-xs-4 flex items-center">
            <FontAwesomeIcon aria-hidden icon={faTriangleExclamation} />
            {t('general.notice.invalidTagLabels')}
          </p>
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
            {Object.entries(draft).map(([tag, tagDraft], index) => (
              <TableRow
                {...tagDraft}
                key={tag}
                tag={tag}
                index={index}
                initialColor={getTagColor(tag)}
                onBlur={handleBlurLabel}
                onChangeColor={(tag, color) => setDraft((state) => ({ ...state, [tag]: { ...state[tag], color } }))}
                onChangeLabel={(tag, name) => {
                  pendingDataRef.current = { tag, name }
                  debouncedFnRef.current?.()
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}

//--------------------------------------------------------------------------------------------//

interface TableRowProps extends TagDraft {
  tag: string
  index: number
  initialColor: TagColor | null
  onBlur: () => void
  onChangeLabel: (tag: string, name: string) => void
  onChangeColor: (tag: string, color: TagColor | null) => void
}

const TableRow = memo(
  (props: TableRowProps) => {
    const { tag, index, color, name, invalid, initialColor, onBlur, onChangeLabel, onChangeColor } = props
    const { t } = useTranslation()

    return (
      <tr>
        <td className="py-xs-1 pr-xs-4">
          <TextField
            id={`tag-name-${index}`}
            value={name}
            size="xs"
            invalid={invalid}
            ariaDescribedBy={`tag-${index}`}
            onBlur={onBlur}
            onChange={(value) => onChangeLabel(tag, value)}
          />
        </td>

        <td className="py-xs-1 pr-xs-4">
          <TagColorSelector value={color} onChange={(nextColor) => onChangeColor(tag, nextColor)} />
        </td>

        <td className="py-xs-1 pr-xs-7 pl-xs-2">
          <span id={`tag-${index}`} className="flex justify-end">
            <Tag value={tag} size="sm" style={initialColor ? getTagColorStyle(initialColor) : undefined} />
          </span>
        </td>

        <td className="py-xs-1">
          {(name !== tag || color !== initialColor) && (
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
          )}
        </td>
      </tr>
    )
  },
  (previous, next) =>
    previous.tag === next.tag &&
    previous.index === next.index &&
    previous.color === next.color &&
    previous.name === next.name &&
    previous.invalid === next.invalid &&
    previous.initialColor === next.initialColor,
)
