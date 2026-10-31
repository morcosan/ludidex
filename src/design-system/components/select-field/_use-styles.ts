import { type CSSObject } from '@emotion/react'
import { useThemeService } from '../../services/theme-service'
import { useFieldStyles } from '../_shared/use-field-styles'
import { type SelectFieldProps } from './_types'

export const useStyles = (props: SelectFieldProps) => {
  const { size } = props
  const { cssBaseVars } = useFieldStyles({ size })
  const { tokens } = useThemeService()

  const fieldCss: CSSObject = {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    height: cssBaseVars.minHeight,
    border: `1px solid ${tokens.color['border-default']}`,
    borderRadius: cssBaseVars.borderRadius,
    backgroundColor: tokens.color['bg-field'],
    color: tokens.color['text-default'],
    '&:focus-within': {
      borderColor: tokens.color['border-active'],
    },
    '&:has(input:disabled)': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  }
  const prefixCss: CSSObject = {
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    height: '100%',
    margin: `0 calc(-1 * ${tokens.spacing['xs-1']}) 0 ${tokens.spacing['xs-1']}`,
  }
  const inputCss: CSSObject = {
    flex: '1 1 0%',
    width: 'auto',
    minWidth: 0,
    height: '100%',
    padding: `0 ${cssBaseVars.textPaddingX}`,
    border: 0,
    outline: 0,
    background: 'transparent',
    color: tokens.color['text-default'],
    fontSize: cssBaseVars.fontSize,
    textOverflow: 'ellipsis',
    cursor: 'default',
    '&::placeholder': {
      color: tokens.color['text-placeholder'],
      opacity: 1,
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  }
  const suffixCss: CSSObject = {
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    gap: tokens.spacing['xs-2'],
    paddingRight: tokens.spacing['xs-2'],
  }
  const clearButtonCss: CSSObject = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: tokens.spacing['button-h-xs'],
    height: tokens.spacing['button-h-xs'],
    padding: tokens.spacing['xs-1'],
    borderRadius: tokens.radius['full'],
    background: 'transparent',
    color: tokens.color['text-subtle'],
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tokens.color['hover-text-default'],
    },
  }
  const chevronSize = (() => {
    if (size === 'xs') return tokens.fontSize['sm']
    if (size === 'sm') return tokens.fontSize['sm']
    if (size === 'md') return tokens.fontSize['lg']
    if (size === 'lg') return tokens.fontSize['lg']
    if (size === 'xl') return tokens.fontSize['lg']
    return ''
  })()
  const chevronCss: CSSObject = {
    display: 'block',
    width: chevronSize,
    height: chevronSize,
    flex: '0 0 auto',
  }
  const optionCss: CSSObject = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: tokens.spacing['field-h-xs'],
    padding: `${tokens.spacing['xs-2']} ${tokens.spacing['xs-3']}`,
    borderRadius: tokens.radius['xs'],
    color: tokens.color['text-default'],
    cursor: 'pointer',
    '&:hover:not([data-disabled="true"])': {
      background: tokens.color['hover-text-default'],
    },
    '&[data-selected="true"]': {
      background: tokens.color['bg-highlight'],
    },
    '&[data-disabled="true"]': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  }
  const optionCheckCss: CSSObject = {
    position: 'absolute',
    top: '50%',
    right: tokens.spacing['xs-1'],
    width: tokens.spacing['xs-7'],
    transform: 'translateY(-50%)',
  }

  return {
    fieldCss,
    prefixCss,
    inputCss,
    suffixCss,
    clearButtonCss,
    chevronCss,
    optionCss,
    optionCheckCss,
  }
}
