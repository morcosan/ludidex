import { type CSSProperties, type Ref } from 'react'

interface TextHighlightProps extends ReactProps {
  /**
   * Props
   */
  text: string
  keyword?: string
  className?: string
  style?: CSSProperties

  /**
   * Reference
   */
  ref?: Ref<HTMLSpanElement>
}

export const TextHighlight = (props: TextHighlightProps) => {
  const { text, keyword, className, style, ref } = props
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
    <span ref={ref} className={className} style={style}>
      {content}
    </span>
  )
}
