import { TagsInput as MantineTagsInput } from '@mantine/core'
import '@mantine/core/styles/Combobox.css'
import '@mantine/core/styles/Input.css'
import '@mantine/core/styles/Popover.css'
import '@mantine/core/styles/ScrollArea.css'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Tag } from '../tag/tag'
import { type TagsFieldProps } from './_types'
import { useStyles } from './_use-styles'

export { type TagsFieldProps }

export const TagsField = (props: TagsFieldProps) => {
  const {
    id,
    value,
    options,
    size = 'md',
    disabled,
    className,
    style,
    getTagStyle,
    parseTag = (v: string) => v,
    parseInput = (v: string) => v,
    onChange,
  } = props
  const { chevronCss, classNames, styles } = useStyles(props)
  const [searchValue, setSearchValue] = useState('')
  const tagSize = size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'md'

  const normalizeTags = (tags: string[]) => {
    const normalized = new Map<string, string>()
    for (const tag of tags) {
      const parsed = parseTag(tag)
      const key = parsed.toLowerCase()
      if (parsed && !normalized.has(key)) normalized.set(key, parsed)
    }
    return [...normalized.values()]
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
      renderOption={({ option }) => <Tag value={option.value} size="xs" style={getTagStyle?.(option.value)} />}
      renderPill={({ value = '', onRemove }) => (
        <Tag
          key={value}
          value={value}
          size={tagSize}
          removable={!disabled}
          style={getTagStyle?.(value)}
          onRemove={onRemove}
        />
      )}
      className={className}
      classNames={classNames}
      style={style}
      styles={styles}
      onChange={(nextTags) => onChange?.(normalizeTags(nextTags))}
      onSearchChange={(nextValue) => setSearchValue(parseInput(nextValue))}
    />
  )
}
