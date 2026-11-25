import { z } from 'zod'
import { GENSHIN_DOMAIN_IDS } from '../../../data'

const GenshinDomainSchema_v0 = z.object({
  notes: z.string().optional(),
})

const GenshinDomainsSchema_v0 = z.partialRecord(z.enum(GENSHIN_DOMAIN_IDS), GenshinDomainSchema_v0)

export { GenshinDomainSchema_v0, GenshinDomainsSchema_v0 }
