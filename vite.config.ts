/// <reference types="vitest/config" />
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import path from 'node:path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const isCI = process.env.GITHUB_ACTIONS === 'true'

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' }), svgr()],

  base: isCI ? '/ludidex/' : '/', // GitHub Pages path

  root: 'src',
  publicDir: 'public',
  build: {
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@src-ds': path.resolve(import.meta.dirname, 'src/ds/index.ts'),
      '@src-storybook': path.resolve(import.meta.dirname, '.storybook/shared/index.ts'),
    },
  },

  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(import.meta.dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
})
