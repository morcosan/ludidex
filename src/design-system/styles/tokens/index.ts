import { CSS_PREFIX__BLUR, TOKENS__BLUR } from '../../tokens/output/blur.ts'
import { CSS_PREFIX__BREAKPOINT, TOKENS__BREAKPOINT } from '../../tokens/output/breakpoint.ts'
import { CSS_PREFIX__COLOR, TOKENS__COLOR } from '../../tokens/output/color.ts'
import { CSS_PREFIX__DURATION, TOKENS__DURATION } from '../../tokens/output/duration.ts'
import { CSS_PREFIX__FONT_FAMILY, TOKENS__FONT_FAMILY } from '../../tokens/output/font-family.ts'
import { CSS_PREFIX__FONT_SIZE, TOKENS__FONT_SIZE } from '../../tokens/output/font-size.ts'
import { CSS_PREFIX__FONT_WEIGHT, TOKENS__FONT_WEIGHT } from '../../tokens/output/font-weight.ts'
import { CSS_PREFIX__LINE_HEIGHT, TOKENS__LINE_HEIGHT } from '../../tokens/output/line-height.ts'
import { CSS_PREFIX__RADIUS, TOKENS__RADIUS } from '../../tokens/output/radius.ts'
import { CSS_PREFIX__SHADOW, TOKENS__SHADOW } from '../../tokens/output/shadow.ts'
import { CSS_PREFIX__SPACING, TOKENS__SPACING } from '../../tokens/output/spacing.ts'
import { CSS_PREFIX__Z_INDEX, TOKENS__Z_INDEX } from '../../tokens/output/z-index.ts'
import {
  type ColorMode,
  type Token,
  type TokenColoredValue,
  type TokenCompositeValue,
  type TokenGroup,
  type TokenScalarValue,
} from './_types.ts'

const TOKENS = {
  BLUR: TOKENS__BLUR,
  BREAKPOINT: TOKENS__BREAKPOINT,
  COLOR: TOKENS__COLOR,
  DURATION: TOKENS__DURATION,
  FONT_FAMILY: TOKENS__FONT_FAMILY,
  FONT_SIZE: TOKENS__FONT_SIZE,
  FONT_WEIGHT: TOKENS__FONT_WEIGHT,
  LINE_HEIGHT: TOKENS__LINE_HEIGHT,
  RADIUS: TOKENS__RADIUS,
  SHADOW: TOKENS__SHADOW,
  SPACING: TOKENS__SPACING,
  Z_INDEX: TOKENS__Z_INDEX,
} satisfies Record<string, TokenGroup>

const CSS_PREFIX = {
  BLUR: CSS_PREFIX__BLUR,
  BREAKPOINT: CSS_PREFIX__BREAKPOINT,
  COLOR: CSS_PREFIX__COLOR,
  DURATION: CSS_PREFIX__DURATION,
  FONT_FAMILY: CSS_PREFIX__FONT_FAMILY,
  FONT_SIZE: CSS_PREFIX__FONT_SIZE,
  FONT_WEIGHT: CSS_PREFIX__FONT_WEIGHT,
  LINE_HEIGHT: CSS_PREFIX__LINE_HEIGHT,
  RADIUS: CSS_PREFIX__RADIUS,
  SHADOW: CSS_PREFIX__SHADOW,
  SPACING: CSS_PREFIX__SPACING,
  Z_INDEX: CSS_PREFIX__Z_INDEX,
} satisfies Record<string, string>

const getTokenValue = <V = TokenScalarValue | TokenCompositeValue>(token: Token, mode?: ColorMode): V => {
  if (token.type === 'composite') {
    const result: Record<string, TokenScalarValue> = {}
    for (const key in token.value) {
      result[key] =
        typeof token.value[key] === 'object' && !Array.isArray(token.value[key])
          ? (token.value[key] as TokenColoredValue)[mode || 'light']
          : token.value[key]
    }
    return result as V
  }

  return typeof token.value === 'object' && !Array.isArray(token.value)
    ? ((token.value as TokenColoredValue)[mode || 'light'] as V)
    : (token.value as V)
}

export * from './_types.ts'
export { CSS_PREFIX, getTokenValue, TOKENS }
