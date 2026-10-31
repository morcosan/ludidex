import { type CSSObject } from '@emotion/react'
import { useThemeService } from '../../services/theme-service'
import { useFieldStyles } from '../_shared/use-field-styles'
import { type SelectFieldProps } from './_types'

export const useStyles = (props: SelectFieldProps) => {
  const { size, prefix } = props
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
    justifyContent: 'flex-end',
    height: '100%',
  }
  const inputCss: CSSObject = {
    width: '100%',
    minWidth: 0,
    height: '100%',
    padding: `0 ${prefix ? 0 : cssBaseVars.textPaddingX} 0 ${prefix ? 0 : cssBaseVars.textPaddingX}`,
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
    padding: `0 ${tokens.spacing['xs-3']}`,
  }
  const clearButtonCss: CSSObject = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.25em',
    height: '1.25em',
    padding: 0,
    border: 0,
    borderRadius: tokens.radius['full'],
    background: 'transparent',
    color: tokens.color['text-subtle'],
    cursor: 'pointer',
    fontSize: 'inherit',
    lineHeight: 1,
    '&:hover': {
      backgroundColor: tokens.color['hover-text-default'],
    },
  }
  const chevronCss: CSSObject = {
    width: '0.45em',
    height: '0.45em',
    borderRight: '1px solid currentColor',
    borderBottom: '1px solid currentColor',
    transform: 'translateY(-0.15em) rotate(45deg)',
  }

  const dropdownCss: CSSObject = {
    zIndex: `${tokens.zIndex['dropdown']} !important`,
    maxHeight: 400,
    padding: `${tokens.spacing['xs-1']} !important`,
    overflow: 'auto',
    border: `1px solid ${tokens.color['border-subtle']} !important`,
    borderRadius: tokens.radius['sm'],
    backgroundColor: `${tokens.color['bg-popup']} !important`,
    boxShadow: `${tokens.shadow['md']} !important`,
  }

  const optionCss: CSSObject = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: tokens.spacing['field-h-xs'],
    padding: `${tokens.spacing['xs-1']} ${tokens.spacing['xs-3']}`,
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
    '& .select-field-option-check': {
      marginLeft: tokens.spacing['xs-3'],
    },
  }

  return {
    dropdownCss,
    fieldCss,
    prefixCss,
    prefixWidth: cssBaseVars.minHeight,
    inputCss,
    suffixCss,
    clearButtonCss,
    chevronCss,
    optionCss,
  }
}
