import { type GenshinCharacter_v0, type GenshinTeam_v0, USER_DATA_VERSION_V0, type UserData_v0 } from './v0'
import { type UserData_vn1 } from './vn1'

const migrate_vn1_to_v0 = (data: UserData_vn1): UserData_v0 => {
  return {
    version: USER_DATA_VERSION_V0,
    genshin: {
      characters: Object.fromEntries(
        Object.entries(data.genshin?.characters || {}).map(
          ([characterId, character]): [string, GenshinCharacter_v0] => [
            characterId,
            {
              ...character,
            },
          ],
        ),
      ),
      teams: Object.fromEntries(
        Object.entries(data.genshin?.teams || {}).map(([teamId, team]): [string, GenshinTeam_v0] => [
          teamId,
          {
            ...team,
          },
        ]),
      ),
    },
    preferences: {
      ...data.preferences,
    },
  }
}

export { migrate_vn1_to_v0 }
