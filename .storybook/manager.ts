import { addons, type State } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
  theme: create({
    base: 'dark',
  }),
  layout: {
    panelPosition: 'right',
  },
  layoutCustomisations: {
    showPanel(state: State) {
      const story = state.filteredIndex?.[state.storyId]
      // Show controls panel only if the story has 'controls' tag
      return Boolean(story?.tags.includes('controls') && state.viewMode !== 'docs')
    },
  },
  sidebar: {
    showRoots: true,
  },
})
