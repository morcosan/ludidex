import prettier from 'prettier'
import { type TransformedToken } from 'style-dictionary'
import { type Format, type FormatFnArguments } from 'style-dictionary/types'
import { formattedVariables } from 'style-dictionary/utils'
import { isColoredValue, NOTICE, prettierConfig } from './_utils.ts'
import { type TokenColorMode } from './schema.ts'

const CSS_PREFIX = '--ds-'
const LIGHT_SELECTOR = "[data-color-mode='light']"
const DARK_SELECTOR = "[data-color-mode='dark']"

const createCssFormat = (): Format => {
  return {
    name: '',
    format: async ({ dictionary, options }: FormatFnArguments) => {
      const formatOptions = {
        usesDtcg: true,
        format: 'css',
        formatting: { prefix: CSS_PREFIX },
        outputReferences: options.outputReferences,
      }
      const mapTokens = (tokens: TransformedToken[], mode: TokenColorMode) => {
        return tokens
          .filter((token) => mode === '$light' || isColoredValue(token.$value))
          .map((token) => {
            const modeValue = isColoredValue(token.$value) ? token.$value[mode] : token.$value
            return {
              ...token,
              $value: modeValue,
              original: {
                ...token.original,
                $value: isColoredValue(token.original.$value) ? token.original.$value[mode] : token.original.$value,
              },
            }
          })
      }
      const renderCssVars = (mode: TokenColorMode) => {
        const allTokens = mapTokens(dictionary.allTokens, mode)
        return formattedVariables({ dictionary: { ...dictionary, allTokens }, ...formatOptions })
      }
      const lightVarsCode = renderCssVars('$light')
      const darkVarsCode = renderCssVars('$dark')
      const lightSelector = darkVarsCode ? `,${LIGHT_SELECTOR}` : ''
      const lightVarsOutput = lightVarsCode ? `\n:root,:host${lightSelector}{${lightVarsCode}}\n` : ''
      const darkVarsOutput = darkVarsCode ? `\n${DARK_SELECTOR}{${darkVarsCode}}\n` : ''
      const output = NOTICE + lightVarsOutput + darkVarsOutput

      return await prettier.format(output, { ...prettierConfig, parser: 'css' })
    },
  }
}

export { createCssFormat }
