import { Button, Card, IconButton, Image } from '@design-system'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ParseKeys } from 'i18next'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router'
import { Providers } from '../core/providers'
import LogoIcon from '../shared/assets/logo-icon.svg?react'
import { GAMES } from '../shared/data/games'

interface Route {
  to: string
  labelKey: ParseKeys
}
interface LayoutProps {
  routes: Route[]
}

export default function Layout({ routes }: LayoutProps) {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <Providers>
      <div className="flex h-dvh overflow-hidden">
        {/* SIDEBAR */}
        <aside className="p-xs-2 py-xs-6 flex flex-col items-center">
          <Link to="/" aria-label={t('general.label.appTitle')} className="flex-center mb-sm-2 mt-xs-3">
            <LogoIcon aria-hidden className="h-sm-3 w-sm-3" />
          </Link>

          <div className="gap-xs-9 flex flex-col">
            {GAMES.map((game) => (
              <Card
                key={game.id}
                state="selected"
                size="sm"
                tooltip={t(game.nameKey)}
                surfaceClassName="p-0!"
                contentClassName="flex-center h-full w-full"
              >
                <Image src={game.iconUrls} alt="" className="h-sm-4 w-sm-4 rounded-md" />
              </Card>
            ))}
          </div>

          <IconButton tooltip={t('general.label.settings')} className="mt-auto">
            <FontAwesomeIcon icon={faGear} aria-hidden className="h-sm-0 w-sm-0" />
          </IconButton>
        </aside>

        {/* PAGE */}
        <div
          className={cx(
            'm-xs-6 ml-0! min-w-0 flex-1',
            'py-xs-9 flex',
            'bg-color-bg-page border-color-border-surface shadow-below-sm rounded-xl border',
          )}
        >
          {/* SIDE NAV */}
          <nav className="w-md-7 gap-xs-2 mx-xs-9 flex flex-col">
            {routes.map(({ to, labelKey }) => (
              <Button key={to} linkHref={to} state={pathname === to ? 'selected' : 'active'} variant="menu-default">
                {t(labelKey)}
              </Button>
            ))}
          </nav>

          {/* CONTENT */}
          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </Providers>
  )
}
