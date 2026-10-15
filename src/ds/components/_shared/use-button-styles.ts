import { type CSSObject } from '@emotion/react'
import { useThemeService } from '../../services/theme-service'
import { type BaseButtonSize, type BaseButtonState, type BaseButtonVariant } from './types'

interface Props {
  state: BaseButtonState
  size: BaseButtonSize
  variant: BaseButtonVariant
}

const stripes = (color: string) => `repeating-linear-gradient(150deg, ${color} 0% 50%, transparent 50% 100%)`

export const useButtonStyles = ({ state, size, variant }: Props) => {
  const { tokens } = useThemeService()
  const { color, shadow } = tokens
  const isMenuItem = variant === 'menu-default' || variant === 'menu-caution'
  const isDefault = variant === 'default' || variant === 'menu-default'
  const isCaution = variant === 'caution' || variant === 'menu-caution'

  const height = (() => {
    if (size === 'xs') return tokens.spacing['button-h-xs']
    if (size === 'sm') return tokens.spacing['button-h-sm']
    if (size === 'md') return tokens.spacing['button-h-md']
    if (size === 'lg') return tokens.spacing['button-h-lg']
    return ''
  })()
  const paddingX = (() => {
    // Subtract border from padding
    if (isMenuItem) return `calc(${tokens.spacing['button-px-item']} - 1px)`
    if (size === 'xs') return `calc(${tokens.spacing['button-px-xs']} - 1px)`
    if (size === 'sm') return `calc(${tokens.spacing['button-px-sm']} - 1px)`
    if (size === 'md') return `calc(${tokens.spacing['button-px-md']} - 1px)`
    if (size === 'lg') return `calc(${tokens.spacing['button-px-lg']} - 1px)`
  })()
  const spinnerSize = (() => {
    if (size === 'xs') return tokens.spacing['xs-5']
    if (size === 'sm') return tokens.spacing['xs-7']
    if (size === 'md') return tokens.spacing['xs-9']
    if (size === 'lg') return tokens.spacing['sm-0']
    return ''
  })()
  const fontSize = (() => {
    if (isMenuItem) return 'unset'
    if (size === 'xs') return tokens.fontSize['xs']
    if (size === 'sm') return tokens.fontSize['sm']
    if (size === 'md') return tokens.fontSize['md']
    if (size === 'lg') return tokens.fontSize['lg']
  })()
  const fontWeight = isMenuItem ? tokens.fontWeight['sm'] : tokens.fontWeight['md']

  const hoverCss: CSSObject = { boxShadow: shadow['sm'], transform: 'translateY(-1px)' }
  const pressCss: CSSObject = { boxShadow: shadow['inset-sm'] }

  const surfaceDefault = ((): CSSObject => {
    if (state === 'selected') {
      return {
        color: color['text-selection'],
        backgroundColor: color['bg-selection'],
        border: `1px solid ${color['border-selection']}`,
      }
    }
    if (variant === 'primary') {
      return {
        color: color['button-primary-text'],
        backgroundColor: color['button-primary-bg'],
        backgroundImage: stripes(color['button-primary-stripe']),
      }
    }
    if (variant === 'secondary') {
      return {
        color: color['button-secondary-text'],
        backgroundColor: color['button-secondary-bg'],
        backgroundImage: stripes(color['button-secondary-stripe']),
        border: `1px solid ${color['button-secondary-border']}`,
      }
    }
    if (isDefault) return { color: color['text-default'] }
    if (variant === 'optional') return { color: color['text-subtle'] }
    if (variant === 'danger') {
      return {
        color: color['button-danger-text'],
        backgroundColor: color['button-danger-bg'],
        backgroundImage: stripes(color['button-danger-stripe']),
      }
    }
    if (isCaution) return { color: color['button-caution-text'] }
    return {}
  })()
  const surfaceHover = ((): CSSObject => {
    if (state === 'selected') {
      return {
        color: color['text-selection-hover'],
        backgroundColor: color['bg-selection-hover'],
        border: `1px solid ${color['border-selection-hover']}`,
      }
    }
    if (variant === 'primary') {
      return {
        ...hoverCss,
        color: color['button-primary-text-hover'],
        backgroundColor: color['button-primary-bg-hover'],
        backgroundImage: stripes(color['button-primary-stripe-hover']),
      }
    }
    if (variant === 'secondary') {
      return {
        ...hoverCss,
        color: color['button-secondary-text-hover'],
        backgroundColor: color['button-secondary-bg-hover'],
        backgroundImage: stripes(color['button-secondary-stripe-hover']),
        border: `1px solid ${color['button-secondary-border-hover']}`,
      }
    }
    if (isDefault) {
      return { ...hoverCss, color: color['text-default'], backgroundColor: color['button-default-bg-hover'] }
    }
    if (variant === 'optional') {
      return { ...hoverCss, color: color['text-default'], backgroundColor: color['button-optional-bg-hover'] }
    }
    if (variant === 'danger') {
      return {
        ...hoverCss,
        color: color['button-danger-text-hover'],
        backgroundColor: color['button-danger-bg-hover'],
        backgroundImage: stripes(color['button-danger-stripe-hover']),
      }
    }
    if (isCaution) {
      return {
        ...hoverCss,
        color: color['button-caution-text-hover'],
        backgroundColor: color['button-caution-bg-hover'],
      }
    }
    return {}
  })()
  const surfacePress = ((): CSSObject => {
    if (state === 'selected') {
      return {
        color: color['text-selection-press'],
        backgroundColor: color['bg-selection-press'],
        border: `1px solid ${color['border-selection-press']}`,
      }
    }
    if (variant === 'primary') {
      return {
        ...pressCss,
        color: color['button-primary-text-press'],
        backgroundColor: color['button-primary-bg-press'],
        backgroundImage: stripes(color['button-primary-stripe-press']),
      }
    }
    if (variant === 'secondary') {
      return {
        ...pressCss,
        color: color['button-secondary-text-press'],
        backgroundColor: color['button-secondary-bg-press'],
        backgroundImage: stripes(color['button-secondary-stripe-press']),
        border: `1px solid ${color['button-secondary-border-press']}`,
      }
    }
    if (isDefault) {
      return { ...pressCss, color: color['text-default'], backgroundColor: color['button-default-bg-press'] }
    }
    if (variant === 'optional') {
      return { ...pressCss, color: color['text-default'], backgroundColor: color['button-optional-bg-press'] }
    }
    if (variant === 'danger') {
      return {
        ...pressCss,
        color: color['button-danger-text-press'],
        backgroundColor: color['button-danger-bg-press'],
        backgroundImage: stripes(color['button-danger-stripe-press']),
      }
    }
    if (isCaution) {
      return {
        ...pressCss,
        color: color['button-caution-text-press'],
        backgroundColor: color['button-caution-bg-press'],
      }
    }
    return {}
  })()

  return {
    fontSize,
    fontWeight,
    height,
    paddingX,
    spinnerSize,
    surfaceDefault,
    surfaceHover,
    surfacePress,
  }
}
