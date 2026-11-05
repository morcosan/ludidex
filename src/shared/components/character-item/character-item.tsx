import { Card } from '@design-system'
import { type GenshinCharacter } from '../../data/genshin/characters'
import { type CharacterStatus } from '../../data/settings'
import { CharacterAvatar } from '../character-avatar/character-avatar'

export interface CharacterItemProps extends ReactProps {
  character: GenshinCharacter
  status?: CharacterStatus
  size?: 'sm' | 'md' | 'lg'
  selected?: boolean
  disabled?: boolean
  tooltip?: string
  className?: string
  onClick?: (character: GenshinCharacter) => void
}

export const CharacterItem = (props: CharacterItemProps) => {
  const { character, status, size = 'md', selected, disabled, tooltip, className, onClick } = props
  const hasLabel = size !== 'sm'
  const sizeClass = (() => {
    if (size === 'sm') return 'w-md-1'
    if (size === 'md') return 'w-md-2'
    if (size === 'lg') return 'w-md-4'
    return ''
  })()

  return (
    <Card
      state={disabled ? 'disabled' : selected ? 'selected' : 'active'}
      className={className}
      tooltip={tooltip}
      classNames={{
        surface: cx(hasLabel ? 'p-xs-0!' : 'p-px!'),
        content: 'relative flex w-full flex-col',
      }}
      data-character-item
      onClick={() => onClick?.(character)}
    >
      <CharacterAvatar character={character} status={status} className={sizeClass} />
      {hasLabel && (
        <div className={cx('translate-y-xs-0 text-size-xs truncate rounded-b-md text-center', sizeClass)}>
          {character.name}
        </div>
      )}
    </Card>
  )
}
