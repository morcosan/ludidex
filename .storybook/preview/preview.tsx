import { HocComposer, RoutingService } from '@design-system'
import { type Preview } from '@storybook/react-vite'
import { I18nProvider, initClientI18n } from '../../src/core/i18n'
import { argTypesEnhancers, getDocsConfig, getStoryConfig, mockNavigate, toolbarConfig } from './_preview-config'
import './styles/index.css'

initClientI18n()

const hoc = HocComposer.hoc
const providers = [
  hoc(I18nProvider, {}),
  hoc(RoutingService, { navigate: mockNavigate }),
  //
]

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    docs: {
      ...getDocsConfig(providers),
    },
  },
  ...toolbarConfig,
  ...getStoryConfig(providers),
}

export default preview
export { argTypesEnhancers }
