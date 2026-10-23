import { useThemeService } from '@design-system'
import type { CSSObject } from '@emotion/react'
import { Popover as MantinePopover } from '@mantine/core'
import '@mantine/core/styles/Popover.css'
import type { CSSProperties, ReactNode } from 'react'

export interface PopoverProps extends ReactProps {
  /**
   * Slots
   */
  /** Content for the trigger element */
  trigger: ReactNode
  /** Content for the dropdown element */
  children?: ReactNode

  /**
   * Props
   */
  /** Flag for displaying the modal */
  opened?: boolean
  /** Position of popover when it's opened */
  position?:
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'left-start'
    | 'left'
    | 'left-end'
    | 'right-start'
    | 'right'
    | 'right-end'
  /** CSS class attribute for the dropdown element */
  className?: string
  /** CSS style attribute for the dropdown element */
  style?: CSSProperties
}

export const Popover = (props: PopoverProps) => {
  const { trigger, children, opened, position = 'top', className, style } = props
  const { tokens } = useThemeService()

  const surfaceCss: CSSObject = {
    padding: `${tokens.spacing['xs-1']} ${tokens.spacing['xs-3']}`,
    border: `1px solid ${tokens.color['border-surface']}`,
    borderRadius: tokens.radius['sm'],
    backgroundColor: tokens.color['bg-card'],
    color: tokens.color['text-default'],
    boxShadow: tokens.shadow['md'],
  }

  return (
    <MantinePopover position={position} opened={opened} offset={4}>
      <MantinePopover.Target>{trigger}</MantinePopover.Target>
      <MantinePopover.Dropdown css={surfaceCss} className={className} style={style}>
        {children}
      </MantinePopover.Dropdown>
    </MantinePopover>
  )
}
