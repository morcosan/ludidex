/// <reference types="vitest/config" />
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import path from 'node:path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' }), svgr()],

  root: 'src',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@src-ds': path.resolve(import.meta.dirname, 'src/ds/index.ts'),
      '@src-storybook': path.resolve(import.meta.dirname, '.storybook/shared/index.ts'),
    },
  },

  server: {
    port: 8080,
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
