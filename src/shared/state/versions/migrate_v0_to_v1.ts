import { type UserData_v0 } from './schema_v0'
import { type GenshinCharacter_v1, USER_DATA_VERSION_V1, type UserData_v1 } from './schema_v1'

const TIER_LIST_VALUES_V0 = ['D', 'C', 'B', 'A', 'S', 'SS'] as const

const migrateTier = (value?: number) => (value === undefined ? undefined : TIER_LIST_VALUES_V0[value - 1])
const migrateRating = (value?: number) => (value === undefined ? undefined : value === -1 ? 1 : value * 2)

const migrateRatingLabels = (labels?: Record<string, string | undefined>) => {
  if (!labels) return undefined

  const migrated: Record<string, string> = {}
  for (const [key, label] of Object.entries(labels)) {
    if (Number(key) <= 0 || label === undefined) continue
    migrated[String(Number(key) * 2)] = label
  }
  return migrated
}

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
              rating: migrateRating(character.rating),
              status: character.status === 'active' ? 'main' : character.status,
              tierLists: character.tierLists && {
                mainDps: migrateTier(character.tierLists.mainDps),
                subDps: migrateTier(character.tierLists.subDps),
                support: migrateTier(character.tierLists.support),
                exploration: migrateTier(character.tierLists.exploration),
                outfit: migrateTier(character.tierLists.outfit),
                personality: migrateTier(character.tierLists.personality),
              },
            },
          ],
        ),
      ),
    },
    preferences: {
      ratingLabels: migrateRatingLabels(data.preferences?.ratingLabels),
    },
  }
}

export { migrate_v0_to_v1 }
