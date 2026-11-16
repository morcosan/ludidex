interface TextHighlightProps extends ReactProps {
  text: string
  keyword: string
}

export const TextHighlight = ({ text, keyword, className }: TextHighlightProps) => {
  const trimmed = keyword.trim()
  if (!trimmed) return <span className={cx('whitespace-pre-wrap', className)}>{text}</span>

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`(${escaped})`, 'gi')

  return (
    <span className={cx('whitespace-pre-wrap', className)}>
      {text.split(pattern).map((part, index) =>
        part.toLocaleLowerCase() === trimmed.toLocaleLowerCase() ? (
          <mark key={index} className="bg-color-bg-highlight">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </span>
  )
}
