import { type GameId } from '@app-shared/data/games'
import { type ParseKeys } from 'i18next'
import { type ReactElement } from 'react'
import { type RouteObject } from 'react-router'
import CharactersPage from './app/genshin/characters/page'
import TeamsPage from './app/genshin/teams/page'
import Layout from './app/layout'
import HomePage from './app/page'
import SettingsPage from './app/settings/page'

interface AppRoute {
  to: string
  labelKey: ParseKeys
  element: ReactElement
}

const appRoutes: AppRoute[] = [
  { to: '/', labelKey: 'general.label.home', element: <HomePage /> },
  { to: '/genshin/characters', labelKey: 'general.label.characters', element: <CharactersPage /> },
  { to: '/genshin/teams', labelKey: 'general.label.teams', element: <TeamsPage /> },
  { to: '/settings', labelKey: 'general.label.settings', element: <SettingsPage /> },
]

const gameRouteDefaults: Record<GameId, string> = {
  genshin: '/genshin/characters',
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: appRoutes.map(({ to, element }) =>
      to === '/' ? { index: true, element } : { path: to.slice(1), element },
    ),
  },
]

export { appRoutes, gameRouteDefaults, routes }
