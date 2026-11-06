import { Card } from '@design-system'
import { useTranslation } from 'react-i18next'
import { GENSHIN_CHARACTERS_BY_ID, type GenshinCharacter } from '../../data/genshin'
import { type GenshinTeam } from '../../state/types'
import { CharacterAvatar } from '../character-avatar/character-avatar'

interface SizeClasses {
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

  const classes = ((): SizeClasses => {
    if (size === 'sm') return { size: 'w-lg-1', list: 'gap-xs-0 p-xs-0', label: 'py-xs-0' }
    if (size === 'md') return { size: 'w-lg-2', list: 'gap-xs-1 p-xs-1', label: 'py-xs-0' }
    if (size === 'lg') return { size: 'w-lg-4', list: 'gap-xs-1 p-xs-1', label: 'py-xs-1' }
    return { size: '', list: '', label: '' }
  })()

  const characters = team.charIds
    .map((id) => GENSHIN_CHARACTERS_BY_ID[id])
    .filter((character): character is GenshinCharacter => Boolean(character))

  return (
    <Card
      state={selected ? 'selected' : 'active'}
      className={cx(classes.size, className)}
      classNames={{ surface: 'p-xs-0!', content: 'flex w-full flex-col' }}
      data-team-item
      onClick={() => onClick?.(team)}
    >
      <span className={cx('bg-color-grey-3 flex w-full justify-center rounded-sm', classes.list)}>
        {Array.from({ length: 4 }, (_, index) => {
          const character = characters[index]
          return character ? (
            <CharacterAvatar key={character.id} character={character} className="w-1/4" />
          ) : (
            <div key={`empty-${index}`} className="aspect-square w-1/4" />
          )
        })}
      </span>

      <span
        className={cx(
          'translate-y-xs-0 min-h-lh rounded-md',
          'text-size-xs truncate text-center leading-1',
          classes.label,
        )}
      >
        {team.name || <span className="text-color-text-placeholder">{t('general.label.newTeam')}</span>}
      </span>
    </Card>
  )
}
