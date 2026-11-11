import { type UserData } from './types'
import { packTeamId_v0, unpackTeamId_v0, USER_DATA_VERSION_V0 } from './user-data/v0'

const EMPTY_USER_DATA: UserData = { version: USER_DATA_VERSION_V0 }
const packTeamId = packTeamId_v0
const unpackTeamId = unpackTeamId_v0

export { EMPTY_USER_DATA, packTeamId, unpackTeamId }
