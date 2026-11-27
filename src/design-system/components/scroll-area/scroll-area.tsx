import { type CSSObject } from '@emotion/react'
import type { CSSProperties, ReactNode, Ref } from 'react'
import { useThemeService } from '../../services/theme-service'

export interface ScrollAreaProps extends ReactProps {
  /**
   * Slots
   */
  /** Content to be rendered inside */
  children: ReactNode

  /**
   * Props
   */
  /** CSS class attribute for the wrapper element */
  className?: string
  /** CSS style attribute for the wrapper element */
  style?: CSSProperties

  /**
   * Reference
   */
  ref?: Ref<HTMLDivElement>
}

export const ScrollArea = ({ ref, children, className, style }: ScrollAreaProps) => {
  const { tokens } = useThemeService()

  const rootCss: CSSObject = {
    width: `calc(100% + ${tokens.spacing['a11y-padding']})`,
    minHeight: 0,
    marginLeft: `calc(-1 * ${tokens.spacing['a11y-padding']})`,
    padding: tokens.spacing['a11y-padding'],
    paddingBottom: tokens.spacing['xs-5'],
    overflowX: 'hidden',
    overflowY: 'auto',
  }

  return (
    <div ref={ref} css={rootCss} className={className} style={style}>
      {children}
    </div>
  )
}
