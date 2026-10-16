'use client'

import {
  A11yService,
  ConfigService,
  HocComposer,
  LoadingScreen,
  RoutingService,
  ThemeService,
  ViewportService,
} from '@src-ds'
import { StrictMode } from 'react'
import { useNavigate } from 'react-router'
import LogoIcon from '../shared/assets/logo-icon.svg?react'
import { QueryProvider } from './api'
import { I18nProvider, initClientI18n } from './i18n'

initClientI18n()

export const RouterProvider = ({ children }: ReactProps) => {
  const navigate = useNavigate()
  return <RoutingService navigate={navigate}>{children}</RoutingService>
}

const hoc = HocComposer.hoc
const providers = [
  hoc(StrictMode, {}),
  hoc(ConfigService, {}),
  hoc(A11yService, {}),
  hoc(ViewportService, {}),
  hoc(I18nProvider, {}),
  hoc(QueryProvider, {}),
  hoc(RouterProvider, {}),
  hoc(LoadingScreen, { logo: LogoIcon }),
  hoc(ThemeService, { cookieKeyMode: 'app-color-mode' }),
]

export const Providers = ({ children }: ReactProps) => {
  return <HocComposer hocs={providers}>{children}</HocComposer>
}
