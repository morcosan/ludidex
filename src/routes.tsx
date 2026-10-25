import { type ReactElement } from 'react'
import CharactersPage from './app/characters/page'
import Layout, { type Route } from './app/layout'
import HomePage from './app/page'
import SettingsPage from './app/settings/page'
import TeamsPage from './app/teams/page'

interface AppRoute extends Route {
  element: ReactElement
}

const appRoutes: AppRoute[] = [
  { to: '/', labelKey: 'nav.label.dashboard', element: <HomePage /> },
  { to: '/characters', labelKey: 'nav.label.characters', element: <CharactersPage /> },
  { to: '/teams', labelKey: 'nav.label.teams', element: <TeamsPage /> },
  { to: '/settings', labelKey: 'nav.label.settings', element: <SettingsPage />, hidden: true },
]

// eslint-disable-next-line react/only-export-components
export default [
  {
    path: '/',
    element: <Layout routes={appRoutes} />,
    children: appRoutes.map(({ to, element }) =>
      to === '/' ? { index: true, element } : { path: to.slice(1), element },
    ),
  },
]
