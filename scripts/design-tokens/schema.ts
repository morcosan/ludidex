import { z } from 'zod'

const ScalarSchema = z.union([z.string(), z.number()])
const ScalarValueSchema = z.union([ScalarSchema, z.array(ScalarSchema)])
const ColoredValueSchema = z.object({ $light: ScalarValueSchema, $dark: ScalarValueSchema }).strict()
const TokenValueSchema = z.union([ScalarValueSchema, ColoredValueSchema])
const TokenSchema = z.object({ $value: TokenValueSchema }).strict()
const TokensJsonSchema = z
  .object({
    blur: z.record(z.string(), TokenSchema),
    breakpoint: z.record(z.string(), TokenSchema),
    color: z.record(z.string(), TokenSchema),
    duration: z.record(z.string(), TokenSchema),
    'font-family': z.record(z.string(), TokenSchema),
    'font-size': z.record(z.string(), TokenSchema),
    'font-weight': z.record(z.string(), TokenSchema),
    'line-height': z.record(z.string(), TokenSchema),
    radius: z.record(z.string(), TokenSchema),
    shadow: z.record(z.string(), TokenSchema),
    spacing: z.record(z.string(), TokenSchema),
    'z-index': z.record(z.string(), TokenSchema),
  })
  .strict()

type Token = z.infer<typeof TokenSchema>
type TokensJson = z.infer<typeof TokensJsonSchema>
type TokenColorMode = '$light' | '$dark'
type TokenScalar = z.infer<typeof ScalarSchema>
type TokenScalarValue = z.infer<typeof ScalarValueSchema>
type TokenColoredValue = z.infer<typeof ColoredValueSchema>
type TokenValue = z.infer<typeof TokenValueSchema>

export { TokensJsonSchema }
export type { Token, TokenColoredValue, TokenColorMode, TokenScalar, TokenScalarValue, TokensJson, TokenValue }
