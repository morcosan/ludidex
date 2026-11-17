import { TagsInput as MantineTagsInput } from '@mantine/core'
import '@mantine/core/styles/Combobox.css'
import '@mantine/core/styles/Input.css'
import '@mantine/core/styles/Popover.css'
import '@mantine/core/styles/ScrollArea.css'
import { ChevronDownIcon } from 'lucide-react'
import { type ClipboardEvent, useState } from 'react'
import { Tag } from '../tag/tag'
import { type TagsFieldProps } from './_types'
import { useStyles } from './_use-styles'

export { type TagsFieldProps }

export const TagsField = (props: TagsFieldProps) => {
  const { id, value, options, size = 'md', disabled, className, style, getTagStyle, onChange } = props
  const { chevronCss, classNames, styles } = useStyles(props)
  const [searchValue, setSearchValue] = useState('')
  const tagSize = size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'md'

  const dedupeTags = (tags: string[]) => {
    const deduped = new Map<string, string>()
    for (const tag of tags) {
      const key = tag.toLowerCase()
      if (tag && !deduped.has(key)) deduped.set(key, tag)
    }
    return [...deduped.values()]
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    // Disable creating new tag on paste and fix paste action
    event.preventDefault()
    event.stopPropagation()
    const { selectionStart, selectionEnd, value: currentValue } = event.currentTarget
    const start = selectionStart ?? currentValue.length
    const end = selectionEnd ?? start
    const pastedText = event.clipboardData.getData('text/plain')
    setSearchValue((value) => value.slice(0, start) + pastedText + value.slice(end))
  }

  return (
    <MantineTagsInput
      id={id}
      size={size}
      value={dedupeTags(value)}
      data={dedupeTags(options)}
      disabled={disabled}
      searchValue={searchValue}
      maxTags={100}
      splitChars={[]} // Only Enter key creates new tag
      acceptValueOnBlur={false} // Only Enter key creates new tag
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
      onChange={(tags) => onChange?.(dedupeTags(tags))}
      onSearchChange={setSearchValue}
      onPasteCapture={handlePaste}
    />
  )
}
