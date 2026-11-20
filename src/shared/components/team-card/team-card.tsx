import { useEffect, useState } from 'react'
import { CardActions } from '../_shared/card-actions'
import { CardTemplate } from '../_shared/card-template'
import { TagsSection } from '../_shared/tags-section'
import { TeamDeleteModal } from './_modals/team-delete-modal'
import { BannerImage } from './_partials/banner-image'
import { MemberSelector } from './_partials/member-selector'
import { TeamName } from './_partials/team-name'
import { useDraft } from './_partials/use-draft'
import { type TeamDraft } from './_partials/use-draft-utils'
import { TrialsSection } from './_partials/trials-section'
import { type TeamCardProps } from './_types'

export { type TeamCardProps }

export const TeamCard = (props: TeamCardProps) => {
  const { team, opened = true, className, onClose, onDelete } = props
  const { control, hasChanges, isEditing, handleClickDiscard, handleClickEdit, handleClickSave } = useDraft(props)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    if (!opened && isEditing) handleClickDiscard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, isEditing])

  const handleClickClose = () => {
    if (isEditing) handleClickDiscard()
    onClose?.()
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
      control={control}
      fieldNames={['rating'] satisfies (keyof TeamDraft)[]}
      banner={<BannerImage control={control} editing={isEditing} />}
      title={<TeamName team={team} control={control} editing={isEditing} />}
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
      className={className}
      classNames={{ content: 'min-h-[1200px]' }}
    >
      {/* MEMBERS */}
      <MemberSelector team={team} control={control} editing={isEditing} />

      {/* TAGS */}
      <TagsSection editing={isEditing} control={control} tags={team.tags} />

      {/* TRIALS */}
      <TrialsSection editing={isEditing} control={control} />

      <TeamDeleteModal
        key="team-delete-modal"
        opened={isDeleteModalOpen}
        team={team}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </CardTemplate>
  )
}
