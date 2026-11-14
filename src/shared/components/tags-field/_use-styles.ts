import { useThemeService } from '@design-system'
import { type CSSProperties } from '@mantine/core'

export const useStyles = () => {
  const { tokens } = useThemeService()

  const styles: Record<string, CSSProperties> = {
    input: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      width: '100%',
      height: 'auto',
      minHeight: tokens.spacing['field-h-xs'],
      paddingBlock: tokens.spacing['xs-0'],
      paddingInlineStart: tokens.spacing['xs-2'],
      paddingInlineEnd: tokens.spacing['sm-1'],
      border: `1px solid ${tokens.color['border-default']}`,
      borderRadius: tokens.radius.xs,
      backgroundColor: tokens.color['bg-field'],
      color: tokens.color['text-default'],
      cursor: 'text',
    },
    wrapper: {
      minWidth: 0,
    },
    pillsList: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: tokens.spacing['xs-1'],
      minWidth: 0,
    },
    inputField: {
      flex: '1 1 0%',
      width: 'auto',
      minWidth: tokens.spacing['sm-9'],
      height: tokens.spacing['xs-8'],
      padding: 0,
      border: 0,
      outline: 0,
      background: 'transparent',
      color: tokens.color['text-default'],
      fontSize: tokens.fontSize.xs,
      lineHeight: tokens.lineHeight.md,
    },
    section: {
      color: tokens.color['text-subtle'],
    },
    dropdown: {
      padding: tokens.spacing['xs-1'],
      border: `1px solid ${tokens.color['border-surface']}`,
      borderRadius: tokens.radius.sm,
      backgroundColor: tokens.color['bg-popup'],
      color: tokens.color['text-default'],
      boxShadow: tokens.shadow.md,
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
      fontSize: tokens.fontSize.xs,
      cursor: 'pointer',
    },
    empty: {
      padding: `${tokens.spacing['xs-2']} ${tokens.spacing['xs-3']}`,
      color: tokens.color['text-placeholder'],
      fontSize: tokens.fontSize.xs,
    },
  }

  const classNames = {
    input:
      'focus-within:border-color-border-active! has-[input:disabled]:cursor-not-allowed! has-[input:disabled]:opacity-40',
    inputField: 'placeholder:text-color-text-placeholder',
    option:
      'hover:bg-color-hover-text-default! data-[combobox-selected]:bg-color-bg-highlight! data-[combobox-selected]:text-color-text-default! data-[combobox-disabled]:cursor-not-allowed data-[combobox-disabled]:opacity-40',
  }

  return {
    classNames,
    styles,
  }
}
