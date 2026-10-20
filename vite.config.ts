/// <reference types="vitest/config" />
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin, type ResolvedConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const isCI = process.env.GITHUB_ACTIONS === 'true'

// Needed to resolve routes in GitHub Pages
const html404 = (): Plugin => {
  let config: ResolvedConfig
  return {
    name: '404.html',
    apply: 'build',
    configResolved(c) {
      config = c
    },
    closeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir)
      const index = path.resolve(outDir, 'index.html')
      if (existsSync(index)) {
        copyFileSync(index, path.resolve(outDir, '404.html'))
      }
    },
  }
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' }), svgr(), html404()],

  base: isCI ? '/ludidex/' : '/', // GitHub Pages path

  root: 'src',
  publicDir: 'public',
  build: {
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@app-shared': path.resolve(import.meta.dirname, 'src/shared'),
      '@design-system': path.resolve(import.meta.dirname, 'src/design-system/index.ts'),
      '@storybook-docs': path.resolve(import.meta.dirname, '.storybook/docs/index.ts'),
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
