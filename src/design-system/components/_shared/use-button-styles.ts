import { type CSSObject } from '@emotion/react'
import { useThemeService } from '../../services/theme-service'
import { type BaseButtonSize, type BaseButtonState, type BaseButtonVariant } from './types'

type SurfaceCssKey = 'selected' | BaseButtonVariant
type SurfaceCss = Record<SurfaceCssKey, CSSObject>

interface Props {
  state: BaseButtonState
  variant: BaseButtonVariant
  size: BaseButtonSize
  floating?: boolean
}

export const useButtonStyles = ({ state, size, variant, floating }: Props) => {
  const { tokens } = useThemeService()
  const { color, shadow } = tokens
  const isMenuItem = variant === 'menu-default' || variant === 'menu-caution'
  const getBgImage = (color: string) => `repeating-linear-gradient(150deg, ${color} 0% 50%, transparent 50% 100%)`

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
    if (isMenuItem) return tokens.fontSize['sm']
    if (size === 'xs') return tokens.fontSize['xs']
    if (size === 'sm') return tokens.fontSize['sm']
    if (size === 'md') return tokens.fontSize['md']
    if (size === 'lg') return tokens.fontSize['lg']
  })()
  const fontWeight = isMenuItem ? tokens.fontWeight['sm'] : tokens.fontWeight['md']

  const floatCss: CSSObject = floating
    ? {
        backgroundColor: color['bg-card'],
        borderColor: color['border-subtle'],
        boxShadow: shadow['sm'],
      }
    : {}
  const hoverCss: CSSObject = {
    boxShadow: floating ? shadow['md'] : shadow['sm'],
    transform: 'translateY(-1px)',
    '&::before, &::after': { opacity: 0 },
  }
  const pressCss: CSSObject = {
    borderColor: 'transparent',
    boxShadow: 'none',
  }

  const surfaceDefaultCss: SurfaceCss = {
    selected: {
      ...floatCss,
      color: color['text-selection'],
      backgroundColor: color['bg-selection'],
      borderColor: color['border-selection'],
    },
    primary: {
      ...floatCss,
      color: color['button-primary-text'],
      backgroundColor: color['button-primary-bg'],
      backgroundImage: getBgImage(color['button-primary-stripe']),
    },
    secondary: {
      ...floatCss,
      color: color['button-secondary-text'],
      backgroundColor: color['button-secondary-bg'],
      backgroundImage: getBgImage(color['button-secondary-stripe']),
      borderColor: color['button-secondary-border'],
    },
    danger: {
      ...floatCss,
      color: color['button-danger-text'],
      backgroundColor: color['button-danger-bg'],
      backgroundImage: getBgImage(color['button-danger-stripe']),
    },
    default: { ...floatCss, color: color['text-default'] },
    optional: { ...floatCss, color: color['text-subtle'] },
    caution: { ...floatCss, color: color['button-caution-text'] },
    'menu-default': { color: color['text-default'] },
    'menu-caution': { color: color['button-caution-text'] },
  }

  const surfaceHoverCss: SurfaceCss = {
    selected: {
      ...floatCss,
      color: color['text-selection-hover'],
      backgroundColor: color['bg-selection-hover'],
      borderColor: color['border-selection-hover'],
    },
    primary: {
      ...floatCss,
      ...hoverCss,
      color: color['button-primary-text-hover'],
      backgroundColor: color['button-primary-bg-hover'],
      backgroundImage: getBgImage(color['button-primary-stripe-hover']),
    },
    secondary: {
      ...floatCss,
      ...hoverCss,
      color: color['button-secondary-text-hover'],
      backgroundColor: color['button-secondary-bg-hover'],
      backgroundImage: getBgImage(color['button-secondary-stripe-hover']),
      borderColor: color['button-secondary-border-hover'],
    },
    danger: {
      ...floatCss,
      ...hoverCss,
      color: color['button-danger-text-hover'],
      backgroundColor: color['button-danger-bg-hover'],
      backgroundImage: getBgImage(color['button-danger-stripe-hover']),
    },
    default: {
      backgroundColor: color['button-default-bg-hover'],
      ...floatCss,
      ...hoverCss,
      color: color['text-default'],
    },
    optional: {
      backgroundColor: color['button-optional-bg-hover'],
      ...floatCss,
      ...hoverCss,
      color: color['text-default'],
    },
    caution: {
      backgroundColor: color['button-caution-bg-hover'],
      ...floatCss,
      ...hoverCss,
      color: color['button-caution-text-hover'],
    },
    'menu-default': { ...hoverCss, color: color['text-default'], backgroundColor: color['button-default-bg-hover'] },
    'menu-caution': {
      ...hoverCss,
      color: color['button-caution-text-hover'],
      backgroundColor: color['button-caution-bg-hover'],
    },
  }

  const surfacePressCss: SurfaceCss = {
    selected: {
      ...floatCss,
      color: color['text-selection-press'],
      backgroundColor: color['bg-selection-press'],
      borderColor: color['border-selection-press'],
    },
    primary: {
      ...floatCss,
      ...pressCss,
      color: color['button-primary-text-press'],
      backgroundColor: color['button-primary-bg-press'],
      backgroundImage: getBgImage(color['button-primary-stripe-press']),
    },
    secondary: {
      ...floatCss,
      ...pressCss,
      color: color['button-secondary-text-press'],
      backgroundColor: color['button-secondary-bg-press'],
      backgroundImage: getBgImage(color['button-secondary-stripe-press']),
      borderColor: color['button-secondary-border-press'],
    },
    danger: {
      ...floatCss,
      ...pressCss,
      color: color['button-danger-text-press'],
      backgroundColor: color['button-danger-bg-press'],
      backgroundImage: getBgImage(color['button-danger-stripe-press']),
    },
    default: {
      backgroundColor: color['button-default-bg-press'],
      ...floatCss,
      ...pressCss,
      color: color['text-default'],
    },
    optional: {
      backgroundColor: color['button-optional-bg-press'],
      ...floatCss,
      ...pressCss,
      color: color['text-default'],
    },
    caution: {
      backgroundColor: color['button-caution-bg-press'],
      ...floatCss,
      ...pressCss,
      color: color['button-caution-text-press'],
    },
    'menu-default': { ...pressCss, color: color['text-default'], backgroundColor: color['button-default-bg-press'] },
    'menu-caution': {
      ...pressCss,
      color: color['button-caution-text-press'],
      backgroundColor: color['button-caution-bg-press'],
    },
  }

  const surfaceDefault = surfaceDefaultCss[state === 'selected' ? state : variant]
  const surfaceHover = surfaceHoverCss[state === 'selected' ? state : variant]
  const surfacePress = surfacePressCss[state === 'selected' ? state : variant]

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
