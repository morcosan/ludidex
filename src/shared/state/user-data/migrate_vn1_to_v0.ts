import { type GenshinTeam_v0, USER_DATA_VERSION_V0, type UserData_v0 } from './v0'
import { OLD_TRIAL_PREFIX_TO_DOMAIN_ID, type UserData_vn1 } from './vn1'

const migrateTrialIds = (
  trials: Partial<Record<string, number>> | undefined,
): Record<string, number> | undefined => {
  if (!trials) return undefined

  return Object.fromEntries(
    Object.entries(trials)
      .filter((entry): entry is [string, number] => entry[1] !== undefined)
      .map(([oldId, rating]) => {
        const match = /^(.*?)([1-9]\d*)$/.exec(oldId)
        if (!match) return [oldId, rating]

        const [, prefix, level] = match
        const domainId = OLD_TRIAL_PREFIX_TO_DOMAIN_ID[prefix]
        return [domainId ? `${domainId}_${level}` : oldId, rating]
      }),
  )
}

const migrate_vn1_to_v0 = (data: UserData_vn1): UserData_v0 => {
  return {
    version: USER_DATA_VERSION_V0,
    genshin: {
      ...data.genshin,
      teams: Object.fromEntries(
        Object.entries(data.genshin?.teams || {}).map(([teamId, team]): [string, GenshinTeam_v0] => [
          teamId,
          {
            ...team,
            trials: migrateTrialIds(team.trials),
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
