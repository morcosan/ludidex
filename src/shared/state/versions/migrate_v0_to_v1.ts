import { type UserData_v0 } from './schema_v0'
import { type GenshinCharacter_v1, type UserData_v1 } from './schema_v1'

const migrate_v0_to_v1 = (data: UserData_v0): UserData_v1 => {
  return {
    version: 'v1',
    genshin: {
      characters: Object.fromEntries(
        Object.entries(data.genshin?.characters || {}).map(
          ([characterId, character]): [string, GenshinCharacter_v1] => [
            characterId,
            {
              rating: character.favorite,
              tierLists: character.tierLists,
              stats: character.stats,
              talents: character.talents,
              tags: character.tags,
            },
          ],
        ),
      ),
    },
    preferences: {
      ratingLabels: data.preferences?.ratingLabels,
    },
  }
}

export { migrate_v0_to_v1 }
