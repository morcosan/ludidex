import { useThemeService } from '@design-system'
import { type CSSObject } from '@emotion/react'
import { Popover as MantinePopover } from '@mantine/core'
import '@mantine/core/styles/Popover.css'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'

type MantinePopoverProps = ComponentProps<typeof MantinePopover>
type PopoverMiddlewares = MantinePopoverProps['middlewares']
type PopoverWidth = MantinePopoverProps['width']
type PopoverTransitionProps = MantinePopoverProps['transitionProps']

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
  /** Offset between the trigger and dropdown */
  offset?: number
  /** Width of the dropdown, or `target` to match the trigger */
  width?: PopoverWidth
  /** Floating UI middleware configuration */
  middlewares?: PopoverMiddlewares
  /** Mantine dropdown role configuration */
  withRoles?: boolean
  /** Transition props for the dropdown */
  transitionProps?: PopoverTransitionProps
  /** CSS class attribute for the dropdown element */
  className?: string
  /** CSS style attribute for the dropdown element */
  style?: CSSProperties

  /**
   * Events
   */
  /** Event emitted when the popover opens or closes */
  onChange?: (opened: boolean) => void
}

export const Popover = (props: PopoverProps) => {
  const {
    trigger,
    children,
    opened,
    position = 'top',
    offset = 4,
    width,
    middlewares,
    withRoles,
    transitionProps,
    className,
    style,
    onChange,
  } = props
  const { tokens } = useThemeService()

  const surfaceCss: CSSObject = {
    zIndex: tokens.zIndex['dropdown'],
    overflow: 'auto',
    padding: `${tokens.spacing['xs-2']} ${tokens.spacing['xs-3']}`,
    border: `1px solid ${tokens.color['border-surface']}`,
    borderRadius: tokens.radius['sm'],
    backgroundColor: tokens.color['bg-card'],
    color: tokens.color['text-default'],
    boxShadow: tokens.shadow['md'],
  }

  return (
    <MantinePopover
      opened={opened}
      position={position}
      offset={offset}
      width={width}
      middlewares={middlewares}
      withRoles={withRoles}
      transitionProps={transitionProps}
      onChange={onChange}
    >
      <MantinePopover.Target>{trigger}</MantinePopover.Target>
      <MantinePopover.Dropdown css={surfaceCss} className={className} style={style}>
        {children}
      </MantinePopover.Dropdown>
    </MantinePopover>
  )
}
