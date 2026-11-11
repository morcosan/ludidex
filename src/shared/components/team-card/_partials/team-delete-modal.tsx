import { Button, Modal } from '@design-system'
import { useTranslation } from 'react-i18next'
import { GENSHIN_CHARACTERS_BY_ID } from '../../../data'
import { type GenshinTeam } from '../../../state/types'
import { CharacterAvatar } from '../../character-avatar/character-avatar'
import { ErrorNotice } from './error-notice'

interface TeamDeleteModalProps {
  opened: boolean
  team: GenshinTeam
  onClose?: () => void
  onConfirm?: () => void
}

export const TeamDeleteModal = (props: TeamDeleteModalProps) => {
  const { opened, team, onClose, onConfirm } = props
  const { t } = useTranslation()
  const members = team.charIds.map((id) => GENSHIN_CHARACTERS_BY_ID[id] || null)

  return (
    <Modal
      opened={opened}
      title={t('general.action.deleteTeam')}
      width="sm"
      actions={
        <Button variant="danger" onClick={onConfirm}>
          {t('general.action.delete')}
        </Button>
      }
      data-team-delete-modal
      onClose={onClose}
    >
      <div className="flex flex-col">
        <p className="font-weight-lg mb-xs-3">{team.name}</p>

        <ul className="gap-xs-2 flex">
          {members.map((character, index) => (
            <li key={character?.id ?? index}>
              {character ? (
                <CharacterAvatar character={character} className="w-sm-7" />
              ) : (
                <div className="bg-color-grey-3 h-sm-7 w-sm-7 rounded-md" />
              )}
            </li>
          ))}
        </ul>

        <ErrorNotice text={t('general.notice.cannotBeUndone')} className="mt-xs-7 text-size-md!" />
      </div>
    </Modal>
  )
}
