import { Card } from '@design-system'
import { type GenshinCharacter } from '../../data/genshin'
import { type CharacterStatus } from '../../data/settings'
import { CharacterAvatar } from '../character-avatar/character-avatar'

interface SizeClasses {
  size: string
  name: string
}

export interface CharacterItemProps extends ReactProps {
  character: GenshinCharacter
  status?: CharacterStatus
  size?: 'sm' | 'md' | 'lg'
  selected?: boolean
  disabled?: boolean
  tooltip?: string
  labelTop?: string
  labelBottom?: string
  className?: string
  onClick?: (character: GenshinCharacter) => void
}

export const CharacterItem = (props: CharacterItemProps) => {
  const { character, status, size = 'md', selected, disabled, tooltip, labelBottom, className, onClick } = props
  const hasName = size !== 'sm'

  const classNames = ((): SizeClasses => {
    if (size === 'sm') return { size: 'w-md-1', name: '' }
    if (size === 'md') return { size: 'w-md-2', name: 'py-px' }
    if (size === 'lg') return { size: 'w-md-4', name: 'py-xs-0' }
    return { size: '', name: '' }
  })()

  return (
    <Card
      state={disabled ? 'disabled' : selected ? 'selected' : 'active'}
      className={className}
      tooltip={tooltip}
      classNames={{
        surface: cx(hasName ? 'p-xs-0!' : 'p-px!'),
        content: 'relative flex w-full flex-col',
      }}
      data-character-item
      onClick={() => onClick?.(character)}
    >
      <span className="relative">
        <CharacterAvatar character={character} status={status} className={classNames.size} />

        {labelBottom && (
          <span
            className={cx(
              'px-xs-1 py-xs-0 absolute bottom-px left-px max-w-full',
              'bg-color-white rounded-xs rounded-bl-sm!',
              'text-size-xxs font-weight-lg truncate leading-1',
            )}
          >
            {labelBottom}
          </span>
        )}
      </span>

      {hasName && (
        <span
          className={cx(
            'translate-y-xs-0 rounded-md',
            'text-size-xs truncate text-center leading-1',
            classNames.size,
            classNames.name,
          )}
        >
          {character.name}
        </span>
      )}
    </Card>
  )
}
