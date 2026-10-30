import { css } from '@emotion/react'
import { useFieldStyles } from '../_shared/use-field-styles'
import { type SelectFieldProps } from './_types'

export const useStyles = (props: SelectFieldProps) => {
  const { size, prefix } = props
  const { cssBaseVars } = useFieldStyles({ size })

  const fieldCss = css`
    border-radius: var(--ds-radius-sm);

    & .mantine-Input-wrapper {
      --input-height-sm: ${cssBaseVars.minHeight};
    }

    & .mantine-Input-section {
      justify-content: end;
    }

    & [data-combined-clear-section] {
      gap: 0 !important;
      padding: 0 !important;
    }

    & .mantine-Select-input {
      cursor: default;
      border: 1px solid var(--ds-color-border-default);
      border-radius: ${cssBaseVars.borderRadius};
      background-color: var(--ds-color-bg-field);
      padding-right: var(--ds-spacing-sm-5);
      padding-left: ${prefix ? cssBaseVars.minHeight : cssBaseVars.textPaddingX};
      pointer-events: auto;
      color: var(--ds-color-text-default);
      font-size: ${cssBaseVars.fontSize};
      text-overflow: ellipsis;

      &:not(.clearable) {
        padding-right: var(--ds-spacing-xs-8);
      }

      &:not(.disabled):focus {
        border: 1px solid var(--ds-color-border-active);
      }

      &::placeholder {
        color: var(--ds-color-text-placeholder);
      }

      &.disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    & .mantine-InputClearButton-root {
      cursor: pointer;
      border-radius: var(--ds-radius-full);
      background-color: transparent !important;
      color: var(--ds-color-text-subtle);

      &:hover {
        background-color: var(--ds-color-hover-text-default) !important;
      }
    }
  `

  const dropdownCss = css`
    z-index: var(--ds-z-index-dropdown) !important;
    box-shadow: var(--ds-shadow-md) !important;
    border: 1px solid var(--ds-color-border-subtle) !important;
    background-color: var(--ds-color-bg-popup) !important;
    padding: var(--ds-spacing-xs-1) !important;
    overflow: auto !important;

    & .mantine-Select-option {
      position: relative !important;
      color: var(--ds-color-text-default) !important;

      &:hover:not([data-combobox-disabled]) {
        background: var(--ds-color-hover-text-default);
      }

      &[data-combobox-selected] {
        background: var(--ds-color-bg-highlight) !important;
      }

      & > svg {
        opacity: 1 !important;
        margin-top: -2px !important;
      }
    }
  `

  return {
    dropdownCss,
    fieldCss,
  }
}
