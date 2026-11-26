import { Card, Image, TextField, TextHighlight } from '@design-system'
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CalendarDaysIcon } from 'lucide-react'
import { Controller, type Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GENSHIN_DOMAINS, getTrialName, getTrialNames, type GenshinDomainTrial } from '../../../data'
import { useUserAssetsStore } from '../../../state/use-user-assets'
import { formatTime, isTimerFailed, parseTime } from '../../../utils/various'

export interface TrialItemProps extends ReactProps {
  trial: GenshinDomainTrial
  control: Control<Record<string, string>>
  time?: number
  editing?: boolean
  search?: string
  className?: string
}

export const TrialItem = (props: TrialItemProps) => {
  const { trial, time, editing, control, search, className } = props
  const { t } = useTranslation()
  const { getDomainImages } = useUserAssetsStore()
  const domain = GENSHIN_DOMAINS.find((item) => item.trials.some(({ id }) => id === trial.id))
  const trialName = getTrialName(trial)
  const trialNames = getTrialNames(trial)
  const numeral = trialName.match(/\s+([IVXLCDM]+|\d+)$/i)?.[1]

  return (
    <Card
      className={className}
      classNames={{
        surface: 'p-px!',
        content: 'flex w-full items-center',
      }}
      data-trial-item
    >
      <span className="bg-color-grey-4 w-sm-8 relative aspect-square overflow-hidden rounded-md">
        {domain && <Image srcs={getDomainImages(domain.id)} className="size-full object-cover" />}
        {numeral && (
          <span className="text-size-xl text-color-white flex-center font-weight-md absolute inset-0 text-shadow-md">
            {numeral}
          </span>
        )}
      </span>

      <span className="gap-xs-2 pl-xs-3 pr-xs-7 flex min-w-0 flex-1 flex-col leading-1">
        <span className="text-size-sm font-weight-md max-h-sm-2 line-clamp-2 flex items-center">
          <TextHighlight text={trialName} keyword={search} />
          {trialNames.length > 1 && (
            <span title={t('general.notice.nameChangesDaily')}>
              <CalendarDaysIcon strokeWidth={1.5} aria-hidden className="ml-xs-3 size-xs-6 text-color-text-subtle" />
            </span>
          )}
        </span>
        {domain && (
          <TextHighlight text={domain.name} keyword={search} className="text-size-xs text-color-text-subtle truncate" />
        )}
      </span>

      {editing ? (
        <Controller
          control={control}
          name={trial.id}
          rules={{
            validate: (value) => !value.trim() || parseTime(value) !== undefined,
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id={`trials-modal-time-${trial.id}`}
              size="xs"
              invalid={fieldState.invalid}
              className="w-sm-8 [&_input]:font-family-mono mr-xs-4"
              onBlur={() => {
                field.onBlur()
                const parsedTime = parseTime(field.value)
                if (parsedTime !== undefined && !isTimerFailed(parsedTime)) {
                  field.onChange(formatTime(parsedTime) ?? '')
                }
              }}
            />
          )}
        />
      ) : (
        <span className="text-size-xs mr-xs-4 font-family-mono">
          {time === undefined ? (
            '--'
          ) : isTimerFailed(time) ? (
            <span className="text-size-xs font-family-sans font-weight-sm flex items-center">
              <FontAwesomeIcon icon={faSkullCrossbones} aria-hidden className="mr-xs-0 text-size-xxs -mt-px" />
              {t('general.label.failed')}
            </span>
          ) : (
            formatTime(time)
          )}
        </span>
      )}
    </Card>
  )
}
