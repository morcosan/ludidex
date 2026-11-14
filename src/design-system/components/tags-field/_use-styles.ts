import { useThemeService } from '@design-system'
import { type CSSObject } from '@emotion/react'
import { type CSSProperties } from '@mantine/core'
import { type TagsFieldProps } from './_types'

export const useStyles = (props: TagsFieldProps) => {
  const { size } = props
  const { tokens } = useThemeService()

  const fieldHeight = (() => {
    if (size === 'xs') return tokens.spacing['field-h-xs']
    if (size === 'sm') return tokens.spacing['field-h-sm']
    if (size === 'md') return tokens.spacing['field-h-md']
    if (size === 'lg') return tokens.spacing['field-h-lg']
    if (size === 'xl') return tokens.spacing['field-h-xl']
    return ''
  })()

  const inputFontSize = (() => {
    if (size === 'xs') return tokens.fontSize.xs
    if (size === 'sm') return tokens.fontSize.sm
    if (size === 'md') return tokens.fontSize.sm
    if (size === 'lg') return tokens.fontSize.sm
    if (size === 'xl') return tokens.fontSize.sm
    return ''
  })()

  const fieldPaddingLeft = (() => {
    if (size === 'xs') return tokens.spacing['xs-0']
    if (size === 'sm') return tokens.spacing['xs-1']
    if (size === 'md') return tokens.spacing['xs-3']
    if (size === 'lg') return tokens.spacing['xs-4']
    if (size === 'xl') return tokens.spacing['xs-5']
    return ''
  })()

  const fieldPaddingRight = (() => {
    if (size === 'xs') return tokens.spacing['sm-0']
    if (size === 'sm') return tokens.spacing['sm-0']
    if (size === 'md') return tokens.spacing['sm-1']
    if (size === 'lg') return tokens.spacing['sm-1']
    if (size === 'xl') return tokens.spacing['sm-1']
    return ''
  })()

  const chevronSize = (() => {
    if (size === 'xs') return tokens.spacing['xs-6']
    if (size === 'sm') return tokens.spacing['xs-6']
    if (size === 'md') return tokens.spacing['xs-7']
    if (size === 'lg') return tokens.spacing['xs-7']
    if (size === 'xl') return tokens.spacing['xs-7']
    return ''
  })()
  const chevronCss: CSSObject = {
    width: chevronSize,
    height: chevronSize,
  }

  const styles: Record<string, CSSProperties> = {
    input: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      width: '100%',
      height: 'auto',
      minHeight: fieldHeight,
      paddingBlock: size === 'xs' ? tokens.spacing['xs-0'] : tokens.spacing['xs-1'],
      paddingInlineStart: fieldPaddingLeft,
      paddingInlineEnd: fieldPaddingRight,
      border: `1px solid ${tokens.color['border-default']}`,
      borderRadius: tokens.radius.xs,
      backgroundColor: tokens.color['bg-field'],
      color: tokens.color['text-default'],
    },
    pillsList: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: size === 'xs' ? tokens.spacing['xs-0'] : tokens.spacing['xs-1'],
    },
    inputField: {
      flex: '1 1 0%',
      width: 'auto',
      minWidth: tokens.spacing['sm-9'],
      height: '100%',
      padding: `0 ${tokens.spacing['xs-1']}`,
      color: tokens.color['text-default'],
      fontSize: inputFontSize,
    },
    section: {
      color: tokens.color['text-subtle'],
    },
    dropdown: {
      padding: tokens.spacing['xs-0'],
      border: `1px solid ${tokens.color['border-surface']}`,
      borderRadius: tokens.radius.sm,
      backgroundColor: tokens.color['bg-popup'],
      color: tokens.color['text-default'],
      boxShadow: tokens.shadow.md,
      zIndex: tokens.zIndex['dropdown'],
    },
    options: {
      padding: 0,
    },
    option: {
      display: 'flex',
      alignItems: 'center',
      minHeight: tokens.spacing['field-h-xs'],
      padding: `${tokens.spacing['xs-1']} ${tokens.spacing['xs-2']}`,
      borderRadius: tokens.radius.xs,
      color: tokens.color['text-default'],
      fontSize: inputFontSize,
      cursor: 'pointer',
    },
    empty: {
      padding: `${tokens.spacing['xs-2']} ${tokens.spacing['xs-3']}`,
      color: tokens.color['text-placeholder'],
      fontSize: inputFontSize,
    },
  }

  const classNames = {
    input: cx(
      'focus-within:border-color-border-active!',
      'has-[input:disabled]:cursor-not-allowed! has-[input:disabled]:opacity-40',
    ),
    inputField: cx('placeholder:text-color-text-placeholder'),
    option: cx(
      'hover:bg-color-hover-text-default!',
      'data-[combobox-selected]:bg-color-bg-highlight! data-[combobox-selected]:text-color-text-default!',
      'data-[combobox-disabled]:cursor-not-allowed data-[combobox-disabled]:opacity-40',
    ),
  }

  return {
    chevronCss,
    classNames,
    styles,
  }
}
