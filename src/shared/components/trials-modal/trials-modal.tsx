import { Modal, ScrollArea } from '@design-system'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  GENSHIN_CHARACTERS_BY_ID,
  GENSHIN_DOMAIN_BY_TRIAL,
  GENSHIN_DOMAIN_TRIALS,
  getTrialName,
  getTrialNames,
  type DomainType,
  type GenshinNation,
  type TrialState,
} from '../../data'
import { useUserDataStore } from '../../state/use-user-data'
import { unpackTeamId } from '../../state/utils'
import { countFilters, formatTime, isTimerFailed, parseTime } from '../../utils/various'
import { ModalTitle } from '../_shared/modal-title'
import { FiltersSection, type Filters } from '../filters-section/filters-section'
import { ListHeader } from '../list-header/list-header'
import { TrialItem } from './_partials/trial-item'

const SORTED_TRIALS = [...GENSHIN_DOMAIN_TRIALS].sort((trialA, trialB) => {
  return getTrialName(trialA).localeCompare(getTrialName(trialB))
})

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
  const [filters, setFilters] = useState<Filters>({ search: '', nations: [], trialStates: [], domainTypes: [] })
  const [editing, setEditing] = useState(false)
  const { control, formState, handleSubmit, reset } = useForm<Record<string, string>>({
    defaultValues: {},
    mode: 'onTouched',
  })
  const filtersCount = countFilters(filters)
  const teamMembers = unpackTeamId(teamId).flatMap((id) => GENSHIN_CHARACTERS_BY_ID[id] ?? [])

  const listedTrials = useMemo(() => {
    const search = filters.search?.trim().toLocaleLowerCase()
    const matchesSearch = (trialNames: string[], domainName?: string) => {
      return (
        !search ||
        trialNames.some((name) => name.toLocaleLowerCase().includes(search)) ||
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
    const matchesDomainType = (domainType?: DomainType) => {
      return !filters.domainTypes?.length || Boolean(domainType && filters.domainTypes.includes(domainType))
    }

    return SORTED_TRIALS.filter((trial) => {
      const domain = GENSHIN_DOMAIN_BY_TRIAL[trial.id]
      return (
        matchesSearch(getTrialNames(trial), domain?.name) &&
        matchesNation(domain?.nation) &&
        matchesTrialState(userTrials?.[trial.id]) &&
        matchesDomainType(domain?.type)
      )
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
      domainTypes: nextFilters.domainTypes ?? [],
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

  const leftWidthClass = cx('w-lg-9')

  return (
    <Modal
      opened={opened}
      title={
        <ModalTitle
          title={title}
          subtitle={t('game.label.domainTrials')}
          members={teamMembers}
          className={leftWidthClass}
        />
      }
      width="xxl"
      height="full"
      editable
      editing={editing}
      noFooter
      noDismiss={formState.isDirty}
      classNames={{ body: 'gap-xs-9 flex h-full overflow-visible! pr-0!' }}
      data-trials-modal
      onEdit={handleEdit}
      onSave={handleSave}
      onDiscard={handleDiscard}
      onClose={onClose}
    >
      {/* LEFT SIDE */}
      <div className={cx(leftWidthClass, 'gap-sm-0 flex min-h-0 flex-col')}>
        <ScrollArea className="gap-sm-2 flex flex-1 flex-col">
          <FiltersSection type="trials" filters={filters} surface="paper" onChange={handleChangeFilters} />
        </ScrollArea>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex-1">
        <ListHeader
          title={t('game.label.trials')}
          itemsCount={listedTrials.length}
          filtersCount={filtersCount}
          search={filters.search}
          surface="paper"
          className="-top-xs-4 absolute left-0 z-10 -translate-y-full"
        />

        <ScrollArea className="h-full">
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
        </ScrollArea>
      </div>
    </Modal>
  )
}
