import { useThemeService } from '@design-system'
import { type BaseFieldSize } from './types'

interface FieldProps {
  size?: BaseFieldSize
}

export const useFieldStyles = (props: FieldProps) => {
  const { size } = props
  const { tokens } = useThemeService()

  const cssBaseVars = {
    minHeight: (() => {
      if (size === 'xs') return tokens.spacing['field-h-xs']
      if (size === 'sm') return tokens.spacing['field-h-sm']
      if (size === 'md') return tokens.spacing['field-h-md']
      if (size === 'lg') return tokens.spacing['field-h-lg']
      if (size === 'xl') return tokens.spacing['field-h-xl']
      return ''
    })(),
    borderRadius: (() => {
      if (size === 'xs') return tokens.radius['xs']
      if (size === 'sm') return tokens.radius['sm']
      if (size === 'md') return tokens.radius['sm']
      if (size === 'lg') return tokens.radius['md']
      if (size === 'xl') return tokens.radius['md']
      return ''
    })(),
    textPaddingX: (() => {
      if (size === 'xs') return tokens.spacing['xs-3']
      if (size === 'sm') return tokens.spacing['xs-4']
      if (size === 'md') return tokens.spacing['xs-5']
      if (size === 'lg') return tokens.spacing['xs-7']
      if (size === 'xl') return tokens.spacing['xs-8']
      return ''
    })(),
    fontSize: (() => {
      if (size === 'xs') return tokens.fontSize['xs']
      if (size === 'sm') return tokens.fontSize['sm']
      if (size === 'md') return tokens.fontSize['md']
      if (size === 'lg') return tokens.fontSize['md']
      if (size === 'xl') return tokens.fontSize['md']
      return ''
    })(),
  }

  return {
    cssBaseVars,
  }
}
