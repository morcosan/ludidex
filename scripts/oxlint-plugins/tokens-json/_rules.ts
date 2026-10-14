import { TokensJsonSchema } from '../../design-tokens/schema.ts'
import { defineJsonValidation } from './_eslint-utils.ts'

const enforceTokensSchema = {
  meta: {
    type: 'problem',
    docs: { description: 'Enforce tokens.json schema' },
    messages: {
      invalidJson: 'Invalid tokens json: {{message}}',
      invalidKeyExtra: 'Invalid tokens schema for "{{key}}": unrecognized key',
      invalidKeyMissing: 'Invalid tokens schema for "{{key}}": {{error}}',
      invalidSchema: 'Invalid tokens schema: {{message}}',
    },
  },
  create: defineJsonValidation(TokensJsonSchema, {
    invalidSchema: 'invalidSchema',
    invalidJson: 'invalidJson',
    invalidKeyExtra: 'invalidKeyExtra',
    invalidKeyMissing: 'invalidKeyMissing',
  }),
}

export { enforceTokensSchema }
