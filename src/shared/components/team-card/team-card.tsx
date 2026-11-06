import { formatUserInput } from '@app-shared/utils/various'
import { Card, TextField } from '@design-system'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GENSHIN_CHARACTERS_BY_ID, type GenshinCharacter } from '../../data/genshin'
import { packTeamId } from '../../state/types'
import { useStickyOnTop } from '../../utils/use-sticky-on-top'
import { CardActions } from '../_shared/card-actions'
import { CardBanner } from '../_shared/card-banner'
import { CardSection } from '../_shared/card-section'
import { CharacterModal, type CharacterModalSelection } from '../character-modal/character-modal'
import { Tag } from '../tag/tag'
import { ErrorNotice } from './_partials/error-notice'
import { MemberItem } from './_partials/member-item'
import { TeamDeleteModal } from './_partials/team-delete-modal'
import { useDraft } from './_partials/use-draft'
import { type TeamCardProps } from './_types'

export { type TeamCardProps }

export const TeamCard = (props: TeamCardProps) => {
  const { team, userData, userPrefs, opened = true, className, onClose, onDelete } = props
  const { t } = useTranslation()
  const {
    draft,
    hasChanges,
    isEditing,
    handleMemberChange,
    handleNameChange,
    handleRatingChange,
    handleTagsChange,
    handleClickDiscard,
    handleClickEdit,
    saveChanges,
  } = useDraft(props)
  const scrollRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const isNameSticky = useStickyOnTop({ scrollRef, stickyRef: nameRef })
  const [memberIndex, setMemberIndex] = useState(0)
  const [isCharModalOpen, setIsCharModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [hasChangedName, setHasChangedName] = useState(false)
  const [hasChangedMembers, setHasChangedMembers] = useState(false)

  const teamName = formatUserInput(draft.name).toLowerCase()
  const hasInvalidTeamName = (() => {
    return (
      teamName.length === 0 ||
      Object.entries(userData?.teams ?? {}).some(
        ([otherId, otherTeam]) => otherId !== team.id && otherTeam.name.toLowerCase() === teamName,
      )
    )
  })()

  const members = draft.charIds.map((id) => GENSHIN_CHARACTERS_BY_ID[id || ''] || null)
  const memberIds = draft.charIds.filter((id) => id) as string[]
  const memberSelection = { slots: members, index: memberIndex } satisfies CharacterModalSelection
  const hasInvalidTeamId = (() => {
    const teamId = packTeamId(memberIds)
    return memberIds.length === 0 || (teamId !== team.id && Boolean(userData?.teams?.[teamId]))
  })()

  useEffect(() => {
    if (isEditing) {
      setHasChangedName(false)
      setHasChangedMembers(false)
    }
  }, [isEditing])

  useEffect(() => {
    if (!opened && isEditing) handleClickDiscard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, isEditing])

  const handleClickClose = () => {
    if (isEditing) handleClickDiscard()
    onClose?.()
  }

  const handleClickMember = (index: number) => {
    setMemberIndex(index)
    setIsCharModalOpen(true)
  }

  const handleSelectMember = (character: GenshinCharacter | null, slotIndex: number = memberIndex) => {
    handleMemberChange(slotIndex, character?.id || null)
  }

  const handleClickSave = () => {
    setHasChangedName(true)
    setHasChangedMembers(true)
    const isValid = !hasInvalidTeamName && !hasInvalidTeamId
    isValid && saveChanges()
  }

  const handleClickDelete = () => {
    if (!team.charIds.length && !team.name) {
      onDelete?.(team)
    } else {
      setIsDeleteModalOpen(true)
    }
  }

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false)
    onDelete?.(team)
  }

  return (
    <Card className={cx('w-xl-0', className)} classNames={{ surface: 'p-0!', content: 'flex flex-col' }}>
      <div ref={scrollRef} className="p-xs-0 pb-xs-2! flex h-full flex-col overflow-y-auto">
        {/* BANNER */}
        <CardBanner
          banner={<div className="bg-color-grey-9 aspect-3/2 rounded-md object-cover" />}
          editing={isEditing}
          userPrefs={userPrefs}
          ratingValue={draft.rating}
          onChangeRating={handleRatingChange}
        />

        {/* NAME */}
        <div
          ref={nameRef}
          className={cx(
            'my-xs-2 px-xs-8 py-xs-2 bg-color-bg-card -top-xs-0 sticky z-10 transition-[padding] ease-in-out',
            isNameSticky && 'border-color-border-subtle shadow-below-sm',
          )}
        >
          {isEditing ? (
            <TextField
              id="team-card-name"
              size="md"
              value={draft.name}
              invalid={hasChangedName && hasInvalidTeamName}
              ariaDescribedBy={hasChangedName && hasInvalidTeamName ? 'team-card-name-error' : undefined}
              onChange={handleNameChange}
              onBlur={() => setHasChangedName(true)}
            />
          ) : (
            <h3 className="text-size-xl font-weight-lg h-field-h-md flex items-center">
              {team.name || <span className="text-color-text-placeholder">{t('general.label.newTeam')}</span>}
            </h3>
          )}
          {isEditing && hasChangedName && hasInvalidTeamName && (
            <ErrorNotice id="team-card-name-error" text={t('general.notice.invalidTeamName')} className="mt-xs-1" />
          )}
        </div>

        {/* CONTENT */}
        <div className="px-xs-8 pb-xs-4 gap-y-sm-2 flex min-h-[1200px] flex-col">
          {/* MEMBERS */}
          <div>
            <ul className={cx('divide-color-border-subtle flex flex-col divide-y', isEditing && 'divide-transparent!')}>
              {members.map((character, index) => (
                <MemberItem
                  key={index}
                  character={character || undefined}
                  status={character ? userData?.characters?.[character.id]?.status : undefined}
                  editing={isEditing}
                  onClick={() => handleClickMember(index)}
                />
              ))}
            </ul>
            {isEditing && hasChangedMembers && hasInvalidTeamId && (
              <ErrorNotice text={t('general.notice.invalidTeamId')} className="mt-xs-2" />
            )}
          </div>

          {/* TAGS */}
          <CardSection title={t('game.label.tags')}>
            {isEditing ? (
              <TextField
                id="team-card-tags"
                size="xs"
                value={draft.tags}
                placeholder={t('game.placeholder.tags')}
                multiline
                onChange={handleTagsChange}
              />
            ) : team.tags?.length ? (
              <div className="gap-xs-1 min-h-field-h-xs flex flex-wrap">
                {team.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            ) : (
              <span className="text-size-sm min-h-field-h-xs">--</span>
            )}
          </CardSection>
        </div>

        <CardActions
          editing={isEditing}
          hasChanges={hasChanges}
          onDiscard={handleClickDiscard}
          onClose={handleClickClose}
          onSave={handleClickSave}
          onEdit={handleClickEdit}
          onDelete={handleClickDelete}
        />
      </div>

      <CharacterModal
        opened={isCharModalOpen}
        title={t('general.action.selectTeamMembers')}
        userData={userData}
        selection={memberSelection}
        onSelect={handleSelectMember}
        onChangeSlot={setMemberIndex}
        onClose={() => {
          setIsCharModalOpen(false)
          setHasChangedMembers(true)
        }}
      />

      <TeamDeleteModal
        opened={isDeleteModalOpen}
        team={team}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  )
}
