import { TeamCard, type Filters } from '@app-shared/components'
import {
  GENSHIN_DOMAINS,
  GENSHIN_ELEMENTS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPONS,
  TEAM_SIZES,
  getTrialName,
} from '@app-shared/data'
import { type GenshinTeam } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { useClickOutside } from '@app-shared/utils/use-click-outside'
import { useTeamListing } from '@app-shared/utils/use-team-listing'
import { useUrlFilters } from '@app-shared/utils/use-url-filters'
import { useUserTags } from '@app-shared/utils/use-user-tags'
import { useViewOptions } from '@app-shared/utils/use-view-options'
import { countFilters } from '@app-shared/utils/various'
import { IconButton } from '@design-system'
import { PlusIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageTemplate } from '../_shared/page-template'
import { PreviewDrawer } from '../_shared/preview-drawer'
import { TEAM_VIEW_TYPES } from './_config'
import { TeamListing } from './_partials/team-listing'

export default function Page() {
  const { t } = useTranslation()
  const setGenshinTeam = useUserDataStore((state) => state.setGenshinTeam)
  const viewOptionsHook = useViewOptions({ viewTypes: TEAM_VIEW_TYPES, defaultView: 'default' })
  const { viewType, tabParam, viewOptions, viewLabel, handleViewChange, handleTabChange } = viewOptionsHook
  const { tagOptions } = useUserTags()
  const [previewTeamId, setPreviewTeamId] = useState<string | undefined>(undefined)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [emptyTeams, setEmptyTeams] = useState<GenshinTeam[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const canScrollRef = useRef(false)
  const [filters, setFilters] = useUrlFilters({
    elements: GENSHIN_ELEMENTS,
    nations: GENSHIN_NATIONS,
    weaponTypes: GENSHIN_WEAPONS,
    teamSizes: TEAM_SIZES,
    tags: tagOptions,
    search: '',
  })
  const { allTeams, listedTeams } = useTeamListing(filters)
  const selectedDomain = GENSHIN_DOMAINS.find(({ id }) => id === viewType)
  const selectedTrial = selectedDomain?.trials.find(({ id }) => id === tabParam) ?? selectedDomain?.trials[0]
  const trialOptions = selectedDomain?.trials.map((trial) => ({ value: trial.id, label: getTrialName(trial) }))

  useClickOutside({
    enabled: isPreviewOpen,
    allowlist: [
      '[data-characters-modal]',
      '[data-team-delete-modal]',
      '[data-team-item]',
      '[data-trials-modal]',
      '[data-preview-drawer]',
    ],
    callback: () => setIsPreviewOpen(false),
  })

  const previewTeam = [...allTeams, ...emptyTeams].find((team) => team.id === previewTeamId)
  const isEmptyPreview = emptyTeams.some((team) => team.id === previewTeamId)
  const currTeams = [...listedTeams, ...emptyTeams]
  const filtersCount = countFilters(filters)
  const topBarFilters: Filters = { search: filters.search, elements: filters.elements }
  const sectionFilters: Filters = {
    statuses: filters.statuses,
    nations: filters.nations,
    weaponTypes: filters.weaponTypes,
    teamSizes: filters.teamSizes,
    tags: filters.tags,
  }

  const handleClosePreview = () => setIsPreviewOpen(false)
  const handleChangeFilters = (newFilters: Filters) => setFilters({ ...filters, ...newFilters })

  const handleClickTeam = (team: GenshinTeam) => {
    if (isPreviewOpen && previewTeamId === team.id) {
      setIsPreviewOpen(false)
      return
    }
    setPreviewTeamId(team.id)
    setIsPreviewOpen(true)
  }

  const handleSaveTeam = (team: GenshinTeam) => {
    if (!previewTeamId) return
    setGenshinTeam(previewTeamId, null)
    setGenshinTeam(team.id, team)
    setPreviewTeamId(team.id)
    setEmptyTeams((state) => state.filter((emptyTeam) => emptyTeam.id !== previewTeamId))
  }

  const handleDeleteTeam = (team: GenshinTeam) => {
    const isEmptyTeam = emptyTeams.some((emptyTeam) => emptyTeam.id === team.id)
    if (isEmptyTeam) {
      setEmptyTeams((state) => state.filter((emptyTeam) => emptyTeam.id !== team.id))
    } else {
      setGenshinTeam(team.id, null)
    }
    setPreviewTeamId(undefined)
    setIsPreviewOpen(false)
  }

  const handleClickNewTeam = () => {
    canScrollRef.current = true
    const id = `empty-team-${emptyTeams.length}`
    setEmptyTeams((state) => [...state, { id, name: '', charIds: [] }])
    setPreviewTeamId(id)
    setIsPreviewOpen(true)
  }

  useEffect(() => {
    if (!canScrollRef.current) return
    canScrollRef.current = false
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [emptyTeams])

  return (
    <PageTemplate
      type="teams"
      title={t('general.label.teams')}
      itemsCount={currTeams.length}
      filtersCount={filtersCount}
      topBarFilters={topBarFilters}
      sectionFilters={sectionFilters}
      search={filters.search}
      viewLabel={viewLabel}
      viewType={viewType}
      viewOptions={viewOptions}
      tabOptions={trialOptions}
      activeTab={selectedTrial?.id}
      leftSide={
        <>
          <TeamListing
            teams={currTeams}
            teamsPool={allTeams}
            viewType={viewType}
            selectedTrialId={selectedTrial?.id}
            selectedTeamId={isPreviewOpen ? previewTeamId : undefined}
            scrollRef={scrollRef}
            search={filters.search}
            className={viewType === 'default' ? 'mt-xs-9' : 'mt-xs-7'}
            onClickItem={handleClickTeam}
          />

          <IconButton
            tooltip={t('general.action.createNewTeam')}
            variant="primary"
            size="xl"
            floating
            className="bottom-xs-3 right-xs-8 z-sticky absolute!"
            onClick={handleClickNewTeam}
          >
            <PlusIcon aria-hidden className="h-sm-1 w-sm-1" />
          </IconButton>
        </>
      }
      rightSide={
        <PreviewDrawer opened={isPreviewOpen}>
          {previewTeam && (
            <TeamCard
              team={previewTeam}
              opened={isPreviewOpen}
              editing={isEmptyPreview}
              className="h-full"
              onSave={handleSaveTeam}
              onClose={handleClosePreview}
              onDelete={handleDeleteTeam}
            />
          )}
        </PreviewDrawer>
      }
      onChangeFilters={handleChangeFilters}
      onChangeTab={handleTabChange}
      onChangeView={handleViewChange}
    />
  )
}
