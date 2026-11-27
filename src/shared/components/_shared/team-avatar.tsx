import { type GenshinCharacter } from '../../data'
import { CharacterAvatar } from '../character-avatar/character-avatar'

interface TeamAvatarProps extends ReactProps {
  members?: GenshinCharacter[]
}

export const TeamAvatar = (props: TeamAvatarProps) => {
  const { members, className } = props

  const OVERLAP = 0.3

  return members?.length ? (
    <span className={cx('flex', className)}>
      {members.map((char, index) => {
        const isLast = index === members.length - 1
        return (
          <span
            key={char.id}
            className="relative h-full"
            style={{
              aspectRatio: isLast ? 1 : 1 - OVERLAP,
              zIndex: members.length - index,
            }}
          >
            <span className="absolute top-0 left-0 aspect-square h-full">
              <CharacterAvatar character={char} className="border-color-white border" />
            </span>
          </span>
        )
      })}
    </span>
  ) : null
}
