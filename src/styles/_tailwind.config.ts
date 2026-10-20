import { type Config } from 'tailwindcss'
import { tailwindTheme } from '../design-system/styles/tailwind/theme.ts'

const config: Config = {
  content: [
    '../../{src}/**/*.{ts,tsx}', // app
  ],
  theme: tailwindTheme,
}

export default config
