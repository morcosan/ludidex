import { type Config } from 'tailwindcss'
import { tailwindTheme } from '../../../src/ds/styles/tailwind/theme.ts'

const config: Config = {
  content: [
    '../../../{src,docs}/**/*.{ts,tsx,mdx}', // ds + docs
  ],
  theme: tailwindTheme,
}

export default config
