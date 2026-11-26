import { z } from 'zod'
import { GENSHIN_DOMAINS } from '../../../data'
import {
  GenshinCharactersSchema_v0,
  GenshinDomainsSchema_v0,
  GenshinTeamSchema_v0,
  refineTeam_v0,
  UserPreferencesSchema_v0,
} from '../v0'

const USER_DATA_VERSION_VN1 = 'v0.5'

const OLD_TRIAL_PREFIX_TO_DOMAIN_ID: Record<string, string> = {
  purification: 'midsummer',
  danceofsteel: 'remembrance',
  elegiacrime: 'vindagnyr',
  spring: 'guyun',
  stonechamber: 'clearpool',
  roaringfire: 'zhouformula',
  unyielding: 'ridgewatch',
  machinenest: 'lostvalley',
  autumnhunt: 'momiji',
  necropolis: 'slumbering',
  sevensenses: 'enlightenment',
  desertcitadel: 'cityofgold',
  forsakenrampart: 'molteniron',
  harmony: 'denouement',
  assembly: 'waterfallwen',
  variation: 'theater',
  gauntlet: 'rainbow',
  deepfire: 'derelict',
  derivations: 'frostladen',
  moonchild: 'moonchild',
  cecilia: 'cecilia',
  lianshan: 'lianshan',
  flowingsand: 'flowingsand',
  abjectpride: 'abjectpride',
  deeptides: 'deeptides',
  atchtower: 'watchtower',
  mooncourt: 'mooncourt',
  forsakenrift: 'forsakenrift',
  taishan: 'taishan',
  violetcourt: 'violetcourt',
  ignorance: 'ignorance',
  paleglory: 'paleglory',
  blazingruins: 'blazingruins',
  lightless: 'lightless',
  thornyrown: 'thornycrown',
  sacredvault: 'glacier',
  obsession: 'obsession',
  fallengrace: 'fallengrace',
  storming: 'stormterror',
  earthshaking: 'dragonqueller',
}

const OLD_TRIAL_IDS = Object.entries(OLD_TRIAL_PREFIX_TO_DOMAIN_ID).flatMap(([prefix, domainId]) => {
  const domain = GENSHIN_DOMAINS.find((domain) => domain.id === domainId)
  return domain ? domain.trials.map((_, index) => `${prefix}${index + 1}`) : []
})

const GenshinTeamSchema_vn1 = GenshinTeamSchema_v0.omit({ trials: true }).extend({
  trials: z.partialRecord(z.enum(OLD_TRIAL_IDS), z.number()).optional(),
})

const GenshinTeamsSchema_vn1 = z.record(z.string(), GenshinTeamSchema_vn1).superRefine(refineTeam_v0)

const UserDataSchema_vn1 = z.object({
  version: z.literal(USER_DATA_VERSION_VN1),
  genshin: z
    .object({
      characters: GenshinCharactersSchema_v0.optional(),
      domains: GenshinDomainsSchema_v0.optional(),
      teams: GenshinTeamsSchema_vn1.optional(),
    })
    .optional(),
  preferences: UserPreferencesSchema_v0.optional(),
})

type GenshinTeam_vn1 = z.infer<typeof GenshinTeamSchema_vn1>
type UserData_vn1 = z.infer<typeof UserDataSchema_vn1>

export {
  GenshinTeamsSchema_vn1,
  OLD_TRIAL_PREFIX_TO_DOMAIN_ID,
  UserDataSchema_vn1,
  type GenshinTeam_vn1,
  type UserData_vn1,
}
