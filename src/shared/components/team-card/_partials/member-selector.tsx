import { useEffect, useState } from 'react'
import { type Control, useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GENSHIN_CHARACTERS_BY_ID, type GenshinCharacter } from '../../../data'
import { type GenshinTeam } from '../../../state/types'
import { useUserDataStore } from '../../../state/use-user-data'
import { packTeamId } from '../../../state/utils'
import { ErrorNotice } from '../../_shared/error-notice'
import { CharactersModal } from '../../characters-modal/characters-modal'
import { MemberItem } from './member-item'
import { type TeamDraft } from './use-draft-utils'

interface MemberSelectorProps {
  control: Control<TeamDraft>
  team: GenshinTeam
  editing: boolean
}

export const MemberSelector = ({ control, team, editing }: MemberSelectorProps) => {
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData?.genshin)
  const [memberIndex, setMemberIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { field, fieldState } = useController({
    control,
    name: 'charIds',
    rules: {
      validate: (charIds) => {
        const memberIds = charIds.filter((id): id is string => Boolean(id))
        const teamId = packTeamId(memberIds)
        return memberIds.length > 0 && (teamId === team.id || !userData?.teams?.[teamId])
      },
    },
  })
  const errorText = fieldState.error ? t('general.notice.invalidTeamId') : undefined
  const charIds = field.value
  const members = charIds.map((id) => GENSHIN_CHARACTERS_BY_ID[id || ''] || null)
  const selection = { slots: members, index: memberIndex }

  const getNextSlotIndex = (slots: (object | null)[], slotIndex: number): number | undefined => {
    for (let i = 1; i < slots.length; i++) {
      const index = (slotIndex + i) % slots.length
      if (!slots[index]) return index
    }
  }

  const handleClickMember = (index: number) => {
    setMemberIndex(index)
    setIsModalOpen(true)
  }

  const handleSelectMember = (character: GenshinCharacter | null, slotIndex: number = memberIndex) => {
    const nextCharIds = [...charIds]
    nextCharIds[slotIndex] = character?.id || null
    field.onChange(nextCharIds)

    if (character) {
      const updatedSlots = Object.assign([...members], { [slotIndex]: character })
      const nextSlotIndex = getNextSlotIndex(updatedSlots, slotIndex)
      setMemberIndex(nextSlotIndex ?? slotIndex)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    field.onBlur()
  }

  useEffect(() => {
    if (!editing) setIsModalOpen(false)
  }, [editing])

  return (
    <>
      <div>
        <ul className={cx('divide-color-border-subtle flex flex-col divide-y', editing && 'divide-transparent!')}>
          {members.map((character, index) => (
            <MemberItem
              key={index}
              character={character || undefined}
              status={character ? userData?.characters?.[character.id]?.status : undefined}
              editing={editing}
              onClick={() => handleClickMember(index)}
            />
          ))}
        </ul>
        {editing && errorText && <ErrorNotice text={errorText} className="mt-xs-2" />}
      </div>

      <CharactersModal
        opened={isModalOpen}
        title={t('general.action.selectTeamMembers')}
        selection={selection}
        onSelect={handleSelectMember}
        onChangeSlot={setMemberIndex}
        onClose={handleCloseModal}
      />
    </>
  )
}
