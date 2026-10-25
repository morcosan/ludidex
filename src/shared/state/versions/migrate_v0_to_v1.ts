import { type UserData_v0 } from './schema_v0'
import type { UserData_v1 } from './schema_v1'

const migrate_v0_to_v1 = (data: UserData_v0): UserData_v1 => {
  return {
    version: 'v1',
    ...(data.genshin && {
      genshin: {
        characters: Object.fromEntries(
          Object.entries(data.genshin.characters).map(([characterId, character]) => [
            characterId,
            {
              ...(character.likeScore !== undefined && { favorite: character.likeScore }),
              ...(character.tierScores !== undefined && { tierLists: character.tierScores }),
              ...(character.stats !== undefined && { stats: character.stats }),
              ...(character.talents !== undefined && { talents: character.talents }),
              ...(character.tags !== undefined && { tags: character.tags }),
            },
          ]),
        ),
      },
    }),
  }
}

export { migrate_v0_to_v1 }
