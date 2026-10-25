interface HighlightTextProps {
  text: string
  keyword: string
}

export const TextHighlight = ({ text, keyword }: HighlightTextProps) => {
  const trimmed = keyword.trim()
  if (!trimmed) return <span className="whitespace-pre-wrap">{text}</span>

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`(${escaped})`, 'gi')

  return (
    <span className="whitespace-pre-wrap">
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
