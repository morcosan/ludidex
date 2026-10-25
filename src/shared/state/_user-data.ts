import { FAVORITE_LABELS } from '@app-shared/data/settings'
import { z } from 'zod'
import { UserDataSchema_v1 } from './versions/schema_v1'

type UserData = z.infer<typeof UserDataSchema_v1>
type UserPrefs = UserData['preferences']
type FavoriteLabels = Record<keyof typeof FAVORITE_LABELS, string>

const EMPTY_USER_DATA: UserData = { version: 'v1' }

export { EMPTY_USER_DATA, type FavoriteLabels, type UserData, type UserPrefs }
