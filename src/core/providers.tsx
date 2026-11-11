import LogoIcon from '@app-shared/assets/logo-icon.svg?react'
import { useUserAssetsStore } from '@app-shared/state/use-user-assets'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { useUserSettingsStore } from '@app-shared/state/use-user-settings'
import {
  A11yService,
  ConfigService,
  HocComposer,
  LoadingScreen,
  RoutingService,
  ThemeService,
  ViewportService,
} from '@design-system'
import { StrictMode } from 'react'
import { useNavigate } from 'react-router'
import { QueryProvider } from './api'
import { I18nProvider, initClientI18n } from './i18n'

initClientI18n()
useUserDataStore.getState().loadUserData()
useUserSettingsStore.getState().loadUserSettings()
useUserAssetsStore.getState().loadUserAssets()

const RouterProvider = ({ children }: ReactProps) => {
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
  hoc(ThemeService, { cookieKeyMode: 'app-color-mode', colorMode: 'light' }),
]

const Providers = ({ children }: ReactProps) => {
  return <HocComposer hocs={providers}>{children}</HocComposer>
}

export { Providers }
