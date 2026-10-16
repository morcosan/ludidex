import { type Config } from 'tailwindcss'
import { tailwindTheme } from '../ds/styles/tailwind/theme.ts'

const config: Config = {
  content: [
    '../{src}/**/*.{ts,tsx}', // app
    '../../ds/{src}/**/*.{ts,tsx}', // ds
  ],
  theme: tailwindTheme,
}

export default config
