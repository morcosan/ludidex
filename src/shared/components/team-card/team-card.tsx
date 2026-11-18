import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tag } from '../../../design-system/components/tag/tag'
import { TagsField } from '../../../design-system/components/tags-field/tags-field'
import { GENSHIN_CHARACTERS_BY_ID, type GenshinCharacter } from '../../data'
import { useUserDataStore } from '../../state/use-user-data'
import { packTeamId } from '../../state/utils'
import { useUserTags } from '../../utils/use-user-tags'
import { parseUserInput } from '../../utils/various'
import { CardActions } from '../_shared/card-actions'
import { CardSection } from '../_shared/card-section'
import { CardTemplate } from '../_shared/card-template'
import { CharacterModal, type CharacterModalSelection } from '../character-modal/character-modal'
import { BannerImage } from './_partials/banner-image'
import { ErrorNotice } from './_partials/error-notice'
import { MemberItem } from './_partials/member-item'
import { TeamDeleteModal } from './_partials/team-delete-modal'
import { TeamName } from './_partials/team-name'
import { useDraft } from './_partials/use-draft'
import { type TeamCardProps } from './_types'

export { type TeamCardProps }

export const TeamCard = (props: TeamCardProps) => {
  const { team, opened = true, className, onClose, onDelete } = props
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData?.genshin)
  const {
    draft,
    hasChanges,
    isEditing,
    handleClickDiscard,
    handleClickEdit,
    handleMemberChange,
    handleNameChange,
    handleRatingChange,
    handleTagsChange,
    saveChanges,
  } = useDraft(props)
  const { getTagStyle, sortTags, tagOptions } = useUserTags()
  const [memberIndex, setMemberIndex] = useState(0)
  const [isCharModalOpen, setIsCharModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [hasChangedName, setHasChangedName] = useState(false)
  const [hasChangedMembers, setHasChangedMembers] = useState(false)

  const teamName = parseUserInput(draft.name).toLowerCase()
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

    if (character) {
      const updatedSlots = Object.assign([...members], { [slotIndex]: character })
      const nextSlotIndex = getNextSlotIndex(updatedSlots, slotIndex)
      setMemberIndex(nextSlotIndex ?? slotIndex)
    }
  }

  const getNextSlotIndex = (slots: (object | null)[], slotIndex: number): number | undefined => {
    for (let i = 1; i < slots.length; i++) {
      const index = (slotIndex + i) % slots.length
      const isEmpty = !slots[index]
      if (isEmpty) return index
    }
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
    <CardTemplate
      editing={isEditing}
      banner={<BannerImage members={members} editing={isEditing} />}
      title={
        <TeamName
          name={team.name}
          value={draft.name}
          editing={isEditing}
          invalid={hasChangedName && hasInvalidTeamName}
          onChange={handleNameChange}
          onBlur={() => setHasChangedName(true)}
        />
      }
      actions={
        <CardActions
          editing={isEditing}
          hasChanges={hasChanges}
          onDiscard={handleClickDiscard}
          onClose={handleClickClose}
          onSave={handleClickSave}
          onEdit={handleClickEdit}
          onDelete={handleClickDelete}
        />
      }
      modals={[
        <CharacterModal
          key="character-modal"
          opened={isCharModalOpen}
          title={t('general.action.selectTeamMembers')}
          selection={memberSelection}
          onSelect={handleSelectMember}
          onChangeSlot={setMemberIndex}
          onClose={() => {
            setIsCharModalOpen(false)
            setHasChangedMembers(true)
          }}
        />,
        <TeamDeleteModal
          key="team-delete-modal"
          opened={isDeleteModalOpen}
          team={team}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />,
      ]}
      ratingValue={draft.rating}
      className={className}
      classNames={{ content: 'min-h-[1200px]' }}
      onChangeRating={handleRatingChange}
    >
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

      <CardSection title={t('game.label.tags')} classNames={{ body: 'min-h-field-h-sm' }}>
        {isEditing ? (
          <TagsField
            id="team-card-tags"
            size="sm"
            value={draft.tags}
            options={tagOptions}
            getTagStyle={getTagStyle}
            onChange={handleTagsChange}
          />
        ) : team.tags?.length ? (
          <div className="gap-xs-1 flex flex-wrap">
            {sortTags(team.tags).map((tag) => (
              <Tag key={tag} value={tag} style={getTagStyle(tag)} />
            ))}
          </div>
        ) : (
          <span className="text-size-sm">--</span>
        )}
      </CardSection>
    </CardTemplate>
  )
}
