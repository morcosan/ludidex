import { defineConfig } from 'oxlint'

export default defineConfig({
  $schema: './node_modules/oxlint/configuration_schema.json',
  plugins: ['react', 'typescript', 'oxc'],
  jsPlugins: ['./scripts/oxlint-plugins/tokens-json/plugin.ts'],
  rules: {
    'react/rules-of-hooks': 'error',
    'react/only-export-components': ['warn', { allowConstantExport: true }],
    'react/set-state-in-effect': 'off', // TODO: rethink this
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
  },
  overrides: [
    {
      files: ['**/tokens.js'],
      rules: {
        'tokens-json/enforce-tokens-schema': 'error',
      },
    },
  ],
})
