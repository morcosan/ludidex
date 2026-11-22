import { createPortal } from 'react-dom'

// Storybook docgen requires component wrapper to resolve types
export const ReactPortal = ({ children }: ReactProps) => {
  return createPortal(children, document.body)
}
