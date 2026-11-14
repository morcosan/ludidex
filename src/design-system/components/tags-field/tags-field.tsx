import { TagsInput as MantineTagsInput } from '@mantine/core'
import '@mantine/core/styles/Combobox.css'
import '@mantine/core/styles/Input.css'
import '@mantine/core/styles/Popover.css'
import '@mantine/core/styles/ScrollArea.css'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Tag, type TagColor } from '../tag/tag'
import { type TagsFieldProps } from './_types'
import { useStyles } from './_use-styles'

export const TagsField = (props: TagsFieldProps) => {
  const {
    id,
    value,
    options,
    size = 'md',
    colors = {},
    disabled,
    className,
    style,
    parseTag = (tag: string) => tag,
    onChange,
  } = props
  const { chevronCss, classNames, styles } = useStyles(props)
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
      size={size}
      value={normalizeTags(value)}
      data={normalizeTags(options)}
      disabled={disabled}
      searchValue={searchValue}
      maxTags={100}
      rightSection={<ChevronDownIcon aria-hidden css={chevronCss} />}
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
