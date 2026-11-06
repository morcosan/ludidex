import { Card } from '@design-system'
import { useTranslation } from 'react-i18next'
import { GENSHIN_CHARACTERS_BY_ID, type GenshinCharacter } from '../../data/genshin'
import { type GenshinTeam } from '../../state/types'
import { CharacterAvatar } from '../character-avatar/character-avatar'

interface ClassConfig {
  size: string
  list: string
  label: string
}

export interface TeamItemProps extends ReactProps {
  team: GenshinTeam
  size?: 'sm' | 'md' | 'lg'
  selected?: boolean
  className?: string
  onClick?: (team: GenshinTeam) => void
}

export const TeamItem = (props: TeamItemProps) => {
  const { team, size = 'md', selected, className, onClick } = props
  const { t } = useTranslation()

  const config = ((): ClassConfig => {
    if (size === 'sm') return { size: 'w-lg-1', list: 'gap-xs-0 p-xs-0', label: 'leading-1' }
    if (size === 'md') return { size: 'w-lg-2', list: 'gap-xs-1 p-xs-1', label: 'leading-1' }
    if (size === 'lg') return { size: 'w-lg-4', list: 'gap-xs-1 p-xs-1', label: 'leading-sm' }
    return { size: '', list: '', label: '' }
  })()

  const characters = team.charIds
    .map((id) => GENSHIN_CHARACTERS_BY_ID[id])
    .filter((character): character is GenshinCharacter => Boolean(character))

  return (
    <Card
      state={selected ? 'selected' : 'active'}
      className={cx(config.size, className)}
      classNames={{ surface: 'p-xs-0!', content: 'flex w-full flex-col' }}
      data-team-item
      onClick={() => onClick?.(team)}
    >
      <div className={cx('bg-color-grey-3 flex w-full justify-center rounded-sm', config.list)}>
        {Array.from({ length: 4 }, (_, index) => {
          const character = characters[index]
          return character ? (
            <CharacterAvatar key={character.id} character={character} className="w-1/4" />
          ) : (
            <div key={`empty-${index}`} className="aspect-square w-1/4" />
          )
        })}
      </div>
      <div
        className={cx('translate-y-xs-0 px-xs-1 my-xs-0 min-h-lh', 'text-size-xs truncate text-center', config.label)}
      >
        {team.name || <span className="text-color-text-placeholder">{t('general.label.newTeam')}</span>}
      </div>
    </Card>
  )
}
