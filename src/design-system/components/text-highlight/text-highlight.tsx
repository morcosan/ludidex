import { type CSSProperties } from 'react'

interface TextHighlightProps extends ReactProps {
  text: string
  keyword?: string
  className?: string
  style?: CSSProperties
}

export const TextHighlight = (props: TextHighlightProps) => {
  const { text, keyword, className, style } = props
  const trimmed = keyword?.trim()

  const content = (() => {
    if (!trimmed) return text

    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(`(${escaped})`, 'gi')

    return text.split(pattern).map((part, index) =>
      part.toLocaleLowerCase() === trimmed.toLocaleLowerCase() ? (
        <mark key={index} className="bg-color-bg-highlight">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  })()

  return (
    <span className={className} style={style}>
      {content}
    </span>
  )
}
