import { Card } from '@design-system'
import { type GenshinCharacter } from '../../data/genshin'
import { type CharacterStatus } from '../../data/settings'
import { CharacterAvatar } from '../character-avatar/character-avatar'

interface ClassNames {
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
  const {
    character,
    status,
    size = 'md',
    selected,
    disabled,
    tooltip,
    labelTop,
    labelBottom,
    className,
    onClick,
  } = props
  const hasName = size !== 'sm'

  const classNames = ((): ClassNames => {
    if (size === 'sm') return { size: 'w-md-1', name: '' }
    if (size === 'md') return { size: 'w-md-2', name: 'py-px' }
    if (size === 'lg') return { size: 'w-md-4', name: 'py-xs-0' }
    return { size: '', name: '' }
  })()

  const labelRootClass = cx('right-xs-1 absolute left-px z-10 flex')
  const labelTextClass = cx(
    'px-xs-1 py-xs-0 bg-color-white-alpha-15 max-w-full rounded-xs',
    'text-size-xxs font-weight-md truncate leading-1',
  )

  return (
    <Card
      state={disabled ? 'disabled' : selected ? 'selected' : 'active'}
      className={className}
      tooltip={tooltip || (size === 'sm' ? character.name : undefined)}
      classNames={{
        surface: cx(hasName ? 'p-xs-0!' : 'p-px!'),
        content: 'relative flex w-full flex-col',
      }}
      data-character-item
      onClick={() => onClick?.(character)}
    >
      <span className="relative">
        {labelTop && (
          <span className={cx('top-px', labelRootClass)}>
            <span className={cx(labelTextClass, 'rounded-tl-sm!')}>{labelTop}</span>
          </span>
        )}

        <CharacterAvatar character={character} status={status} className={classNames.size} />

        {labelBottom && (
          <span className={cx('bottom-px', labelRootClass)}>
            <span className={cx(labelTextClass, 'rounded-bl-sm!')}>{labelBottom}</span>
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
