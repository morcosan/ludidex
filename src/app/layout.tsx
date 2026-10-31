import { ImageSlideshow, type ImageSlideshowHandle } from '@app-shared/components'
import { BACKGROUND_SWAP_DURATION, BACKGROUND_SWAP_INTERVAL } from '@app-shared/data/settings'
import { isPathUnderSegment } from '@app-shared/utils/various'
import { Button, Card, IconButton, Image, Popover } from '@design-system'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ImageIcon, SettingsIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router'
import { Providers } from '../core/providers'
import { appRoutes, gameRouteDefaults } from '../routes'
import LogoIcon from '../shared/assets/logo-icon.svg?react'
import { GAMES } from '../shared/data/games'

export default function Layout() {
  const { t } = useTranslation()
  const location = useLocation()
  const bgSlideshowRef = useRef<ImageSlideshowHandle>(null)
  const [isBgLoading, setIsBgLoading] = useState(false)
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false)
  const isCurrentPath = (gameId: string) => isPathUnderSegment(location.pathname, gameId)
  const currentGame = GAMES.find(({ id }) => isCurrentPath(id))
  const gameRoutes = currentGame ? appRoutes.filter(({ to }) => to.startsWith(`/${currentGame.id}/`)) : []
  const currentHref = `${location.pathname}${location.search}${location.hash}`
  const [lastGameHref, setLastGameHref] = useState(() => (currentGame ? currentHref : ''))

  useEffect(() => {
    if (!currentGame) return
    setLastGameHref(currentHref)
  }, [currentHref, currentGame])

  return (
    <Providers>
      <div className="relative flex h-dvh overflow-hidden">
        <ImageSlideshow
          ref={bgSlideshowRef}
          srcs={GAMES[0].backgroundUrls}
          interval={BACKGROUND_SWAP_INTERVAL}
          transition={BACKGROUND_SWAP_DURATION}
          onLoading={setIsBgLoading}
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
                state={isCurrentPath(game.id) ? 'selected' : 'active'}
                size="sm"
                linkHref={lastGameHref || gameRouteDefaults[game.id]}
                tooltip={t(game.nameKey)}
                classNames={{ surface: 'p-px!', content: 'flex-center h-full w-full' }}
              >
                <Image srcs={game.iconUrls} alt="" className="h-sm-4 w-sm-4 rounded-md" />
              </Card>
            ))}
          </div>

          {/* QUICK SETTINGS */}
          <Popover
            opened={isQuickSettingsOpen}
            position="right-end"
            className="min-w-lg-3"
            trigger={
              <IconButton
                tooltip={t('general.label.settings')}
                className="mt-auto"
                floating
                onClick={() => setIsQuickSettingsOpen((open) => !open)}
              >
                <SettingsIcon strokeWidth={1.5} aria-hidden className="h-sm-0 w-sm-0" />
              </IconButton>
            }
            onChange={setIsQuickSettingsOpen}
          >
            <div className="py-xs-2 pl-button-px-sm flex items-center">
              <ImageIcon aria-hidden className="w-xs-9 h-xs-8 mr-xs-2" />
              <span className="text-size-sm flex-1">{t('general.label.background')}</span>
              <Button
                variant="secondary"
                size="xs"
                state={isBgLoading ? 'loading' : 'active'}
                onClick={() => bgSlideshowRef.current?.next()}
              >
                {t('general.action.next')}
              </Button>
            </div>

            <div className="border-color-border-subtle my-xs-2 border-t" />

            <Button
              linkHref="/settings"
              variant="menu-default"
              size="sm"
              className="w-full"
              onClick={() => setIsQuickSettingsOpen(false)}
            >
              <FontAwesomeIcon icon={faGear} aria-hidden className="w-xs-9! mr-xs-2" />
              {t('general.label.settings')}
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
          {gameRoutes.length > 0 && (
            <nav className="w-md-7 gap-xs-2 mx-xs-9 flex flex-col">
              {gameRoutes.map(({ to, labelKey }) => (
                <Button
                  key={to}
                  linkHref={to}
                  state={location.pathname === to ? 'selected' : 'active'}
                  variant="menu-default"
                >
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
