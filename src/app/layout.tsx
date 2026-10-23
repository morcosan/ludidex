import { ImageSlideshow, type ImageSlideshowHandle } from '@app-shared/components'
import { BACKGROUND_SWAP_DURATION, BACKGROUND_SWAP_INTERVAL } from '@app-shared/data/settings'
import { Button, Card, IconButton, Image, Popover } from '@design-system'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ParseKeys } from 'i18next'
import { ImageIcon, SettingsIcon } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router'
import { Providers } from '../core/providers'
import LogoIcon from '../shared/assets/logo-icon.svg?react'
import { GAMES } from '../shared/data/games'

export interface Route {
  to: string
  labelKey: ParseKeys
  hidden?: boolean
}

interface LayoutProps {
  routes: Route[]
}

export default function Layout({ routes }: LayoutProps) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const slideshowRef = useRef<ImageSlideshowHandle>(null)

  const currentRoute = routes.find(({ to }) => to === pathname)
  const hasSideNav = !currentRoute?.hidden

  return (
    <Providers>
      <div className="relative flex h-dvh overflow-hidden">
        <ImageSlideshow
          ref={slideshowRef}
          srcs={GAMES[0].backgroundUrls}
          interval={BACKGROUND_SWAP_INTERVAL}
          duration={BACKGROUND_SWAP_DURATION}
          className="absolute! inset-0 -z-10"
        />

        {/* SIDEBAR */}
        <aside className="px-xs-3 py-xs-6 flex flex-col items-center">
          {/* LOGO */}
          <Link to="/" aria-label={t('general.label.appTitle')} className="flex-center mb-sm-2 mt-xs-3">
            <LogoIcon aria-hidden className="h-sm-3 w-sm-3" />
          </Link>

          {/* GAMES */}
          <div className="gap-xs-9 flex flex-col">
            {GAMES.map((game) => (
              <Card
                key={game.id}
                state="selected"
                size="sm"
                linkHref="/"
                tooltip={t(game.nameKey)}
                surfaceClassName="p-0!"
                contentClassName="flex-center h-full w-full"
              >
                <Image srcs={game.iconUrls} alt="" className="h-sm-4 w-sm-4 rounded-md" />
              </Card>
            ))}
          </div>

          {/* SETTINGS */}
          <Popover
            position="right-end"
            trigger={
              <IconButton tooltip={t('general.label.settings')} className="mt-auto" floating>
                <SettingsIcon strokeWidth={1.5} aria-hidden className="h-sm-0 w-sm-0" />
              </IconButton>
            }
            className="min-w-lg-3"
          >
            <Button variant="menu-default" size="sm" onClick={() => slideshowRef.current?.next()} className="w-full">
              <ImageIcon aria-hidden className="w-xs-9 h-xs-8 mr-xs-2" />
              {t('general.action.changeBackground')}
            </Button>

            <div className="border-color-border-subtle my-xs-2 border-t" />

            <Button variant="menu-default" size="sm" linkHref="/settings" className="w-full">
              <FontAwesomeIcon icon={faGear} aria-hidden className="w-xs-9! mr-xs-2" />
              {t('nav.label.settings')}
            </Button>
          </Popover>
        </aside>

        {/* PAGE */}
        <div
          className={cx(
            'm-xs-4 py-xs-5 ml-0! flex min-w-0 flex-1',
            'bg-color-bg-page border-color-border-inset shadow-below-sm rounded-xl border backdrop-blur-md',
          )}
        >
          {/* SIDE NAV */}
          {hasSideNav && (
            <nav className="w-md-7 gap-xs-2 mx-xs-9 flex flex-col">
              {routes
                .filter(({ hidden }) => !hidden)
                .map(({ to, labelKey }) => (
                  <Button key={to} linkHref={to} state={pathname === to ? 'selected' : 'active'} variant="menu-default">
                    {t(labelKey)}
                  </Button>
                ))}
            </nav>
          )}

          {/* CONTENT */}
          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </Providers>
  )
}
