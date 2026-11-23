import { Modal } from '@design-system'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GENSHIN_DOMAIN_BY_TRIAL, GENSHIN_DOMAIN_TRIALS, type GenshinNation, type TrialState } from '../../data'
import { useUserDataStore } from '../../state/use-user-data'
import { formatTime, isTimerFailed, parseTime } from '../../utils/various'
import { FiltersSection, type Filters } from '../filters-section/filters-section'
import { TrialItem } from './_partials/trial-item'

const SORTED_TRIALS = [...GENSHIN_DOMAIN_TRIALS].sort((trialA, trialB) => trialA.name.localeCompare(trialB.name))

export interface TrialsModalProps {
  opened: boolean
  title: string
  teamId: string
  onClose?: () => void
}

export const TrialsModal = (props: TrialsModalProps) => {
  const { opened, title, teamId, onClose } = props
  const { t } = useTranslation()
  const userTrials = useUserDataStore((state) => state.userData?.genshin?.teams?.[teamId]?.trials)
  const setGenshinTeam = useUserDataStore((state) => state.setGenshinTeam)
  const [filters, setFilters] = useState<Filters>({ search: '', nations: [], trialStates: [] })
  const [editing, setEditing] = useState(false)
  const { control, formState, handleSubmit, reset } = useForm<Record<string, string>>({
    defaultValues: {},
    mode: 'onTouched',
  })

  const listedTrials = useMemo(() => {
    const search = filters.search?.trim().toLocaleLowerCase()
    const matchesSearch = (trialName: string, domainName?: string) => {
      return (
        !search ||
        trialName.toLocaleLowerCase().includes(search) ||
        Boolean(domainName?.toLocaleLowerCase().includes(search))
      )
    }
    const matchesNation = (nation?: GenshinNation) => {
      return !filters.nations?.length || Boolean(nation && filters.nations.includes(nation))
    }
    const matchesTrialState = (time?: number) => {
      const trialState: TrialState = time === undefined ? 'pending' : isTimerFailed(time) ? 'failed' : 'completed'
      return !filters.trialStates?.length || filters.trialStates.includes(trialState)
    }

    return SORTED_TRIALS.filter(({ id, name }) => {
      const domain = GENSHIN_DOMAIN_BY_TRIAL[id]
      return matchesSearch(name, domain?.name) && matchesNation(domain?.nation) && matchesTrialState(userTrials?.[id])
    })
  }, [filters, userTrials])

  const getDefaultValues = () => {
    return Object.fromEntries(SORTED_TRIALS.map(({ id }) => [id, formatTime(userTrials?.[id]) ?? '']))
  }

  const handleChangeFilters = (nextFilters: Filters) => {
    setFilters({
      search: nextFilters.search ?? '',
      nations: nextFilters.nations ?? [],
      trialStates: nextFilters.trialStates ?? [],
    })
  }

  const handleEdit = () => {
    reset(getDefaultValues())
    setEditing(true)
  }

  const handleDiscard = () => {
    reset(getDefaultValues())
    setEditing(false)
  }

  const handleSave = handleSubmit((values) => {
    const currentTeam = useUserDataStore.getState().userData?.genshin?.teams?.[teamId]
    if (!currentTeam) return

    const parsedTrials = Object.fromEntries(
      Object.entries(values).flatMap(([trialId, value]) => {
        if (!value.trim()) return []
        const time = parseTime(value)
        return time === undefined ? [] : [[trialId, time]]
      }),
    )
    setGenshinTeam(teamId, { ...currentTeam, trials: parsedTrials })
    reset(values)
    setEditing(false)
  })

  useEffect(() => {
    if (!opened) return
    setEditing(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened])

  return (
    <Modal
      opened={opened}
      title={title}
      width="xxl"
      height="full"
      editable
      editing={editing}
      noFooter
      noDismiss={formState.isDirty}
      classNames={{ body: 'gap-xs-9 flex h-full overflow-auto! pr-0!' }}
      data-trials-modal
      onEdit={handleEdit}
      onSave={handleSave}
      onDiscard={handleDiscard}
      onClose={onClose}
    >
      {/* LEFT SIDE */}
      <div className="gap-sm-0 w-lg-9 flex min-h-0 flex-col">
        <div className="pr-xs-0 gap-sm-2 flex min-h-0 flex-1 flex-col overflow-y-auto">
          <FiltersSection type="trials" filters={filters} surface="paper" onChange={handleChangeFilters} />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {listedTrials.length === 0 ? (
          <p className="text-size-sm text-color-text-subtle">{t('general.notice.noTrials')}</p>
        ) : (
          <ul className="gap-y-xs-5 gap-x-xs-9 py-xs-0 flex w-full flex-wrap">
            {listedTrials.map((trial) => (
              <li key={trial.id}>
                <TrialItem
                  trial={trial}
                  control={control}
                  time={userTrials?.[trial.id]}
                  editing={editing}
                  search={filters.search}
                  className="w-xl-0"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  )
}
