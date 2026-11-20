import { Modal } from '@design-system'
import { useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { GENSHIN_DOMAIN_BY_TRIAL, GENSHIN_DOMAIN_TRIALS } from '../../data'
import { FiltersSection, type Filters } from '../filters-section/filters-section'
import { TrialItem } from '../trial-item/trial-item'

const SORTED_TRIALS = [...GENSHIN_DOMAIN_TRIALS].sort((trialA, trialB) => trialA.name.localeCompare(trialB.name))

export interface TrialModalProps {
  // Slots
  title: ReactNode
  // Props
  opened: boolean
  selection: Record<string, number | undefined>
  // Events
  onSelect?: (trials: string[]) => void
  onClose?: () => void
}

export const TrialModal = (props: TrialModalProps) => {
  const { opened, title, selection, onSelect, onClose } = props
  const { t } = useTranslation()
  const [filters, setFilters] = useState<Filters>({ search: '', nations: [] })

  const listedTrials = useMemo(() => {
    const search = filters.search?.trim().toLocaleLowerCase()

    return SORTED_TRIALS.filter(({ id, name }) => {
      const domain = GENSHIN_DOMAIN_BY_TRIAL[id]
      const matchesSearch =
        !search ||
        name.toLocaleLowerCase().includes(search) ||
        Boolean(domain?.name.toLocaleLowerCase().includes(search))
      const matchesNation = !filters.nations?.length || Boolean(domain && filters.nations.includes(domain.nation))
      return matchesSearch && matchesNation
    })
  }, [filters])

  const handleChangeFilters = (nextFilters: Filters) => {
    setFilters({ search: nextFilters.search ?? '', nations: nextFilters.nations ?? [] })
  }

  const handleClickTrial = (trialId: string) => {
    const selectedTrials = Object.keys(selection)
    onSelect?.(
      selectedTrials.includes(trialId)
        ? selectedTrials.filter((selectedTrial) => selectedTrial !== trialId)
        : [...selectedTrials, trialId],
    )
  }

  return (
    <Modal
      opened={opened}
      title={title}
      width="xl"
      height="full"
      noFooter
      classNames={{ body: 'gap-sm-1 flex h-full' }}
      data-trial-modal
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
          <ul className="gap-xs-3 py-xs-0 flex flex-wrap">
            {listedTrials.map((trial) => (
              <li key={trial.id}>
                <TrialItem
                  trial={trial}
                  time={selection[trial.id]}
                  selected={trial.id in selection}
                  onClick={() => handleClickTrial(trial.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  )
}
