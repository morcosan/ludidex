import { z } from 'zod'
import { type UserData } from '../types'
import { migrate_vn1_to_v0 } from './migrate_vn1_to_v0'
import { UserDataSchema_v0 } from './v0'
import { UserDataSchema_vn1 } from './vn1'

const getLabelOverrides = <K extends PropertyKey>(labels: Partial<Record<K, string>>, defaults: Record<K, string>) => {
  const overrides: Partial<Record<K, string>> = {}
  for (const key of Object.keys(defaults) as K[]) {
    const label = labels[key]
    if (label && label !== defaults[key]) overrides[key] = label
  }
  return overrides
}

const parseUserData = (data: unknown): UserData | never => {
  const versions = [
    { schema: UserDataSchema_v0, migrate: (v: unknown) => v },
    { schema: UserDataSchema_vn1, migrate: migrate_vn1_to_v0 },
  ]

  let result

  for (let i = 0; i < versions.length; i++) {
    result = versions[i].schema.safeParse(data)
    if (!result.success) continue

    // Migrate iteratively from one version to the next
    for (let j = i; j > 0 && result.success; j--) {
      const migrate = versions[j].migrate as (data: unknown) => unknown
      result = versions[j - 1].schema.safeParse(migrate(result.data))
    }

    if (result.success) return result.data as UserData
  }

  throw result ? new Error(z.prettifyError(result.error)) : null
}

export { getLabelOverrides, parseUserData }
