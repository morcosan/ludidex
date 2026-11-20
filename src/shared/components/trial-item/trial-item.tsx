import { Card, Image } from '@design-system'
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { GENSHIN_DOMAINS, type GenshinDomainTrial } from '../../data'
import { useUserAssetsStore } from '../../state/use-user-assets'
import { formatTime, isFailedTrial } from '../../utils/various'

export interface TrialItemProps extends ReactProps {
  trial: GenshinDomainTrial
  time?: number
  selected?: boolean
  className?: string
  onClick?: (trial: GenshinDomainTrial) => void
}

export const TrialItem = (props: TrialItemProps) => {
  const { trial, time, selected, className, onClick } = props
  const { t } = useTranslation()
  const { getDomainImages } = useUserAssetsStore()
  const domain = GENSHIN_DOMAINS.find((item) => item.trials.some(({ id }) => id === trial.id))

  const sizeClass = cx('w-lg-2')

  return (
    <Card
      state={selected ? 'selected' : 'active'}
      className={className}
      classNames={{
        surface: 'p-xs-0!',
        content: 'relative flex w-full flex-col',
      }}
      data-trial-item
      onClick={() => onClick?.(trial)}
    >
      <span className={cx(sizeClass, 'bg-color-grey-3 relative aspect-2/1 overflow-hidden rounded-md')}>
        {domain && <Image srcs={getDomainImages(domain.id)} className="size-full object-cover" />}

        {time !== undefined && (
          <span className="right-xs-1 absolute top-px left-px z-10 flex">
            <span
              className={cx(
                'px-xs-2 py-xs-1 flex items-center rounded-xs rounded-tl-sm!',
                'text-size-xs font-weight-md bg-color-white-alpha-15 leading-1',
              )}
            >
              {isFailedTrial(time) ? (
                <span className="text-size-xs font-family-sans font-weight-sm flex items-center">
                  <FontAwesomeIcon icon={faSkullCrossbones} className="mr-xs-0 text-size-xxs -mt-px" />
                  {t('general.label.failed')}
                </span>
              ) : (
                formatTime(time)
              )}
            </span>
          </span>
        )}
      </span>

      <span
        className={cx(
          'translate-y-xs-0 py-xs-1 min-h-lh rounded-b-md',
          'text-size-xs truncate text-center leading-1',
          sizeClass,
        )}
      >
        {trial.name}
      </span>
    </Card>
  )
}
