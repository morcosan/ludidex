import { enforceTokensSchema } from './_rules.ts'

export default {
  meta: { name: 'tokens-json' },
  rules: {
    'enforce-tokens-schema': enforceTokensSchema,
  },
}
