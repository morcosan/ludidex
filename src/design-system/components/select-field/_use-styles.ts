import { css } from '@emotion/react'
import { useFieldStyles } from '../_shared/use-field-styles'
import { type SelectFieldProps } from './_types'

export const useStyles = (props: SelectFieldProps) => {
  const { size, prefix } = props
  const { cssBaseVars } = useFieldStyles({ size })

  const fieldCss = {
    styles: css`
      display: flex;
      align-items: center;
      min-width: 0;
      height: ${cssBaseVars.minHeight};
      border: 1px solid var(--ds-color-border-default);
      border-radius: ${cssBaseVars.borderRadius};
      background-color: var(--ds-color-bg-field);
      color: var(--ds-color-text-default);

      &:focus-within {
        border-color: var(--ds-color-border-active);
      }

      &:has(input:disabled) {
        opacity: 0.4;
        cursor: not-allowed;
      }
    `,
    prefixStyles: css`
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
    `,
    prefixWidth: cssBaseVars.minHeight,
    inputStyles: css`
      width: 100%;
      min-width: 0;
      height: 100%;
      padding: 0 ${prefix ? 0 : cssBaseVars.textPaddingX} 0 ${prefix ? 0 : cssBaseVars.textPaddingX};
      border: 0;
      outline: 0;
      background: transparent;
      color: var(--ds-color-text-default);
      font-size: ${cssBaseVars.fontSize};
      text-overflow: ellipsis;
      cursor: default;

      &::placeholder {
        color: var(--ds-color-text-placeholder);
        opacity: 1;
      }

      &:disabled {
        cursor: not-allowed;
      }
    `,
    suffixStyles: css`
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      gap: var(--ds-spacing-xs-2);
      padding: 0 var(--ds-spacing-xs-3);
    `,
    clearButtonStyles: css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.25em;
      height: 1.25em;
      padding: 0;
      border: 0;
      border-radius: var(--ds-radius-full);
      background: transparent;
      color: var(--ds-color-text-subtle);
      cursor: pointer;
      font-size: inherit;
      line-height: 1;

      &:hover {
        background-color: var(--ds-color-hover-text-default);
      }
    `,
    chevronStyles: css`
      width: 0.45em;
      height: 0.45em;
      border-right: 1px solid currentColor;
      border-bottom: 1px solid currentColor;
      transform: translateY(-0.15em) rotate(45deg);
    `,
  }

  const dropdownCss = css`
    z-index: var(--ds-z-index-dropdown) !important;
    max-height: 400px;
    padding: var(--ds-spacing-xs-1) !important;
    overflow: auto;
    border: 1px solid var(--ds-color-border-subtle) !important;
    border-radius: var(--ds-radius-sm);
    background-color: var(--ds-color-bg-popup) !important;
    box-shadow: var(--ds-shadow-md) !important;
  `

  const optionCss = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: var(--ds-spacing-field-h-xs);
    padding: var(--ds-spacing-xs-1) var(--ds-spacing-xs-3);
    border-radius: var(--ds-radius-xs);
    color: var(--ds-color-text-default);
    cursor: pointer;

    &:hover:not([data-disabled='true']) {
      background: var(--ds-color-hover-text-default);
    }

    &[data-selected='true'] {
      background: var(--ds-color-bg-highlight);
    }

    &[data-disabled='true'] {
      opacity: 0.4;
      cursor: not-allowed;
    }

    & .select-field-option-check {
      margin-left: var(--ds-spacing-xs-3);
    }
  `

  return {
    dropdownCss,
    fieldCss,
    optionCss,
  }
}
