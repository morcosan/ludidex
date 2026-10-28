import { type UserData_v0 } from './schema_v0'
import { type GenshinCharacter_v1, USER_DATA_VERSION_V1, type UserData_v1 } from './schema_v1'

const migrate_v0_to_v1 = (data: UserData_v0): UserData_v1 => {
  return {
    version: USER_DATA_VERSION_V1,
    genshin: {
      characters: Object.fromEntries(
        Object.entries(data.genshin?.characters || {}).map(
          ([characterId, character]): [string, GenshinCharacter_v1] => [
            characterId,
            {
              ...character,
              status: character.status === 'skipped' ? 'ignored' : character.status,
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
