import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PreviewDrawerProps {
  children: ReactNode
  opened: boolean
}

export const PreviewDrawer = ({ opened, children }: PreviewDrawerProps) => {
  return createPortal(
    <div
      className={cx(
        'z-navbar pr-xs-7 py-xs-7 fixed inset-y-0 right-0',
        'duration-md transition-transform ease-in-out',
        opened ? 'translate-x-0' : 'translate-x-[110%]',
      )}
      data-preview-drawer
    >
      {children}
    </div>,
    document.body,
  )
}
