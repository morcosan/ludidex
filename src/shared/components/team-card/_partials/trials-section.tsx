import { Button } from '@design-system'
import { faSkullCrossbones, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SwordsIcon } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GENSHIN_DOMAIN_TRIALS } from '../../../data'
import { type GenshinTeam } from '../../../state/types'
import { isFailedTrial } from '../../../utils/various'
import { CardSection, type SectionItem } from '../../_shared/card-section'
import { TrialsModal } from '../../trials-modal/trials-modal'

interface TrialsSectionProps {
  team: GenshinTeam
}

export const TrialsSection = (props: TrialsSectionProps) => {
  const { team } = props
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const trials = Object.values(team.trials ?? {})
  const completedTrials = trials.filter((time) => !isFailedTrial(time)).length
  const failedTrials = trials.filter(isFailedTrial).length
  const pendingTrials = GENSHIN_DOMAIN_TRIALS.length - completedTrials - failedTrials
  const items: SectionItem[] = [
    {
      key: 'completed',
      label: (
        <span className="gap-xs-2 flex items-center leading-1">
          <FontAwesomeIcon icon={faTrophy} aria-hidden className="size-xs-7 text-color-text-subtle" />
          {t('game.label.completed')}
        </span>
      ),
      value: completedTrials,
    },
    {
      key: 'failed',
      label: (
        <span className="gap-xs-2 flex items-center leading-1">
          <FontAwesomeIcon icon={faSkullCrossbones} aria-hidden className="size-xs-7 text-color-text-subtle" />
          {t('game.label.failed')}
        </span>
      ),
      value: failedTrials,
    },
    {
      key: 'pending',
      label: (
        <span className="gap-xs-2 flex items-center leading-1">
          <SwordsIcon strokeWidth={2.5} aria-hidden className="size-xs-7 text-color-text-subtle" />
          {t('game.label.pending')}
        </span>
      ),
      value: pendingTrials,
    },
  ]

  return (
    <>
      <CardSection
        title={t('game.label.domainTrials')}
        items={items}
        classNames={{ value: 'text-size-sm font-weight-md pr-xs-0' }}
      >
        <div className="mt-xs-1 mb-xs-3 h-xs-9 rounded-max relative flex overflow-hidden" aria-hidden>
          <div className="rounded-max shadow-inset-sm absolute inset-0 z-10" />
          {[
            { key: 'completed', count: completedTrials, className: 'bg-color-green-8 text-color-white px-xs-1' },
            { key: 'failed', count: failedTrials, className: 'bg-color-red-8 text-color-white px-xs-0' },
            { key: 'pending', count: pendingTrials, className: 'bg-color-grey-4 text-color-black px-xs-1' },
          ]
            .filter(({ count }) => count > 0)
            .map(({ key, count, className }) => (
              <div
                key={key}
                className={cx('flex-center text-size-xxs min-w-fit leading-0 text-shadow-md', className)}
                style={{ width: `${(count / GENSHIN_DOMAIN_TRIALS.length) * 100}%` }}
              >
                {count}
              </div>
            ))}
        </div>

        <Button size="xs" onClick={() => setIsModalOpen(true)}>
          {t('general.action.editTrials')}
        </Button>
      </CardSection>

      <TrialsModal
        opened={isModalOpen}
        title={t('general.action.editTrials')}
        teamId={team.id}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
