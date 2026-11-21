import { Button, TextField } from '@design-system'
import { SwordsIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useController, useWatch, type Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GENSHIN_DOMAIN_TRIALS } from '../../../data'
import { formatTime, isFailedTrial, parseTime } from '../../../utils/various'
import { CardSection, type SectionItem } from '../../_shared/card-section'
import { FailureLabel } from '../../failure-label/failure-label'
import { TrialModal } from '../../trial-modal/trial-modal'
import { type TeamDraft } from './use-draft-utils'

interface TrialsSectionProps {
  editing: boolean
  control: Control<TeamDraft>
}

export const TrialsSection = (props: TrialsSectionProps) => {
  const { editing, control } = props
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [invalidTrials, setInvalidTrials] = useState<Record<string, boolean>>({})
  const { field } = useController({ control, name: 'trials' })
  const trials = useWatch({ control, name: 'trials' }) ?? {}

  const selection = Object.fromEntries(Object.entries(trials).map(([trialId, value]) => [trialId, parseTime(value)]))

  const renderValue = (value: string, trialId: string) => {
    return editing ? (
      <Controller
        control={control}
        name={`trials.${trialId}`}
        render={({ field }) => (
          <TextField
            id={`team-card-trials-${trialId}`}
            size="xs"
            value={field.value}
            invalid={Boolean(invalidTrials[trialId] && !isFailedTrial(parseTime(field.value)))}
            className="w-md-1 [&_input]:font-family-mono"
            onChange={(nextValue) => field.onChange(nextValue)}
            onBlur={() => {
              field.onBlur()
              const time = parseTime(field.value)
              setInvalidTrials((current) => ({
                ...current,
                [trialId]: field.value.trim() !== '' && time === undefined,
              }))
              if (time !== undefined && !isFailedTrial(time)) {
                field.onChange(formatTime(time) ?? '')
              }
            }}
          />
        )}
      />
    ) : (
      <span className="text-size-sm font-weight-md pr-xs-0 font-family-mono">
        {isFailedTrial(parseTime(value)) ? (
          <FailureLabel />
        ) : (
          (formatTime(parseTime(value)) ?? '--')
        )}
      </span>
    )
  }

  const items: SectionItem[] = Object.entries(trials)
    .sort(([trialIdA], [trialIdB]) => {
      const nameA = GENSHIN_DOMAIN_TRIALS.find(({ id }) => id === trialIdA)?.name ?? trialIdA
      const nameB = GENSHIN_DOMAIN_TRIALS.find(({ id }) => id === trialIdB)?.name ?? trialIdB
      return nameA.localeCompare(nameB)
    })
    .map(([trialId, value]) => {
      const isInvalid = invalidTrials[trialId] && !isFailedTrial(parseTime(value))
      return {
        key: trialId,
        label: (
          <span className={cx('gap-xs-2 flex items-center leading-1', isInvalid && 'text-color-red-11')}>
            <SwordsIcon
              aria-hidden
              className={cx('size-xs-7', isInvalid ? 'text-color-red-11' : 'text-color-text-subtle')}
            />
            {GENSHIN_DOMAIN_TRIALS.find(({ id }) => id === trialId)?.name ?? trialId}
          </span>
        ),
        value: renderValue(value, trialId),
      }
    })

  const handleCloseModal = () => {
    setIsModalOpen(false)
    field.onBlur()
  }

  useEffect(() => {
    if (!editing) {
      setIsModalOpen(false)
      setInvalidTrials({})
    }
  }, [editing])

  return (
    <>
      <CardSection
        title={t('game.label.trials')}
        items={items}
        actions={
          editing && (
            <Button size="xs" variant="secondary" onClick={() => setIsModalOpen(true)}>
              {t('general.action.selectTrials')}
            </Button>
          )
        }
      >
        {!items.length && <span className="text-size-sm">--</span>}
      </CardSection>

      <TrialModal
        opened={isModalOpen}
        title={t('general.action.selectTrials')}
        selection={selection}
        onSelect={(trialIds) =>
          field.onChange(Object.fromEntries(trialIds.map((trialId) => [trialId, trials[trialId] ?? ''])))
        }
        onClose={handleCloseModal}
      />
    </>
  )
}
