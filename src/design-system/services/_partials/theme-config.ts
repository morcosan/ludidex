import { type ColorMode, CSS_PREFIX, getTokenValue, type TokenGroup, TOKENS } from '../../styles/tokens'

interface ThemeTokens {
  blur: Record<keyof typeof TOKENS.BLUR, string>
  breakpoint: Record<keyof typeof TOKENS.BREAKPOINT, string>
  color: Record<keyof typeof TOKENS.COLOR, string>
  duration: Record<keyof typeof TOKENS.DURATION, string>
  fontFamily: Record<keyof typeof TOKENS.FONT_FAMILY, string>
  fontSize: Record<keyof typeof TOKENS.FONT_SIZE, string>
  fontWeight: Record<keyof typeof TOKENS.FONT_WEIGHT, string>
  lineHeight: Record<keyof typeof TOKENS.LINE_HEIGHT, string>
  radius: Record<keyof typeof TOKENS.RADIUS, string>
  shadow: Record<keyof typeof TOKENS.SHADOW, string>
  spacing: Record<keyof typeof TOKENS.SPACING, string>
  zIndex: Record<keyof typeof TOKENS.Z_INDEX, string>
}

const ENV__USE_CSS_VARS = true

const mapAtomicTokens = (tokenGroup: TokenGroup, cssPrefix: string, mode: ColorMode) => {
  return Object.fromEntries(
    Object.keys(tokenGroup).map((tokenName: string) => [
      tokenName,
      ENV__USE_CSS_VARS ? `var(${cssPrefix}${tokenName})` : String(getTokenValue(tokenGroup[tokenName], mode)),
    ]),
  ) as Record<string, string>
}

const createTokens = (mode: ColorMode): ThemeTokens => {
  return {
    blur: mapAtomicTokens(TOKENS.BLUR, CSS_PREFIX.BLUR, mode),
    breakpoint: mapAtomicTokens(TOKENS.BREAKPOINT, CSS_PREFIX.BREAKPOINT, mode),
    color: mapAtomicTokens(TOKENS.COLOR, CSS_PREFIX.COLOR, mode),
    duration: mapAtomicTokens(TOKENS.DURATION, CSS_PREFIX.DURATION, mode),
    fontFamily: mapAtomicTokens(TOKENS.FONT_FAMILY, CSS_PREFIX.FONT_FAMILY, mode),
    fontSize: mapAtomicTokens(TOKENS.FONT_SIZE, CSS_PREFIX.FONT_SIZE, mode),
    fontWeight: mapAtomicTokens(TOKENS.FONT_WEIGHT, CSS_PREFIX.FONT_WEIGHT, mode),
    lineHeight: mapAtomicTokens(TOKENS.LINE_HEIGHT, CSS_PREFIX.LINE_HEIGHT, mode),
    radius: mapAtomicTokens(TOKENS.RADIUS, CSS_PREFIX.RADIUS, mode),
    shadow: mapAtomicTokens(TOKENS.SHADOW, CSS_PREFIX.SHADOW, mode),
    spacing: mapAtomicTokens(TOKENS.SPACING, CSS_PREFIX.SPACING, mode),
    zIndex: mapAtomicTokens(TOKENS.Z_INDEX, CSS_PREFIX.Z_INDEX, mode),
  }
}

const lightModeTokens = createTokens('light')
const darkModeTokens = createTokens('dark')

export { darkModeTokens, lightModeTokens, type ThemeTokens }
