import type { TagColor } from '@app-shared/data'
import { TagsInput as MantineTagsInput } from '@mantine/core'
import '@mantine/core/styles/Combobox.css'
import '@mantine/core/styles/Input.css'
import '@mantine/core/styles/Popover.css'
import '@mantine/core/styles/ScrollArea.css'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { parseTag } from '../../utils/various'
import { Tag } from '../tag/tag'
import { useStyles } from './_use-styles'

export interface TagsFieldProps extends ReactProps {
  id: string
  value?: string[]
  options?: string[]
  colors?: Record<string, TagColor>
  disabled?: boolean
  className?: string
  onChange?: (value: string[]) => void
}

export const TagsField = (props: TagsFieldProps) => {
  const { id, value, options, colors = {}, disabled, className, style, onChange } = props
  const { classNames, styles } = useStyles()
  const [searchValue, setSearchValue] = useState('')

  const normalizeTags = (tags?: string[]) => {
    const normalized = new Map<string, string>()
    for (const tag of tags ?? []) {
      const parsed = parseTag(tag)
      const key = parsed.toLowerCase()
      if (parsed && !normalized.has(key)) normalized.set(key, parsed)
    }
    return [...normalized.values()]
  }

  const sanitizeInput = (value: string) => {
    return value
      .normalize('NFC')
      .replace(/[^\p{L}\p{N}-]+/gu, '-')
      .replace(/^-+/, '')
  }

  const getTagColor = (tag?: string): TagColor | undefined => {
    const parsedTag = parseTag(tag || '').toLowerCase()
    return Object.entries(colors).find(([key]) => parseTag(key).toLowerCase() === parsedTag)?.[1]
  }

  return (
    <MantineTagsInput
      id={id}
      size="xs"
      value={normalizeTags(value)}
      data={normalizeTags(options)}
      disabled={disabled}
      searchValue={searchValue}
      maxTags={100}
      rightSection={<ChevronDownIcon aria-hidden className="h-xs-7 w-xs-7" />}
      renderOption={({ option }) => <Tag value={option.value} color={getTagColor(option.value)} />}
      renderPill={({ value, onRemove }) => (
        <Tag key={value} value={value} color={getTagColor(value)} onRemove={disabled ? undefined : onRemove} />
      )}
      className={className}
      classNames={classNames}
      style={style}
      styles={styles}
      onChange={(nextTags) => onChange?.(normalizeTags(nextTags))}
      onSearchChange={(nextValue) => setSearchValue(sanitizeInput(nextValue))}
    />
  )
}
