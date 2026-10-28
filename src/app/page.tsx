import { Breadcrumb, ImageSlideshow } from '@app-shared/components'
import { GAMES } from '@app-shared/data/games'
import { Card } from '@design-system'
import { useTranslation } from 'react-i18next'
import { gameRouteDefaults } from '../routes'

export default function Page() {
  const { t } = useTranslation()

  return (
    <div className="px-sm-0 py-xs-6 flex h-full flex-col">
      <h1 className="mb-xs-9 flex">
        <Breadcrumb first large>
          {t('general.label.home')}
        </Breadcrumb>
        <Breadcrumb large>{t('marketing.organizeData')}</Breadcrumb>
      </h1>

      <div className="gap-xs-7 flex min-h-0 flex-1">
        {GAMES.map((game) => (
          <Card
            key={game.id}
            state="active"
            linkHref={gameRouteDefaults[game.id]}
            className="h-lg-9"
            surfaceClassName="p-xs-1!"
            contentClassName="relative overflow-hidden rounded-sm"
          >
            <ImageSlideshow
              srcs={game.bannerUrls}
              interval={4000}
              transition={2000}
              className={cx('aspect-video h-full object-cover')}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.6)_0%,transparent_30%)]">
              <span className="text-size-xl font-weight-lg text-color-white bottom-xs-3 left-xs-8 absolute text-shadow-md">
                {t(game.nameKey)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
