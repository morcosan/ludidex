import type { StorybookConfig } from '@storybook/react-vite'
import path from 'node:path'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
  previewAnnotations: (entry = []) => [...entry, path.resolve(import.meta.dirname, './preview/preview.tsx')],
  stories: ['../docs/**/*.mdx', '../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
    },
  ],
  framework: '@storybook/react-vite',
}
export default config
