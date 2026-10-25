import { useButtonBase } from '../_shared/use-button-base'
import { type ButtonProps } from './_types'

export type { LinkType } from '../_shared/types'
export type { ButtonProps, ButtonSize, ButtonState, ButtonVariant } from './_types'

/** Fundamental component for user actions and navigation */
export const Button = (props: ButtonProps) => {
  const { linkHref, linkType = 'internal', size = 'md', variant = 'default', state = 'active', ref } = props
  const { bindings, content, buttonCss } = useButtonBase({ ...props, linkType, size, state, variant })

  return linkHref ? (
    <a ref={ref} {...bindings} css={buttonCss}>
      {content}
    </a>
  ) : (
    <button ref={ref} type="button" {...bindings} css={buttonCss}>
      {content}
    </button>
  )
}
