import { z } from 'zod'
import { GENSHIN_CHARACTER_IDS, GENSHIN_DOMAIN_TRIAL_IDS, TIER_LIST_VALUES } from '../../../data'

const unpackTeamId_v0 = (id: string): string[] => id.split('_')
const packTeamId_v0 = (charIds: string[]): string => charIds.join('_')

const refineTeam_v0 = <T>(teams: Record<string, T>, ctx: z.core.$RefinementCtx<Record<string, T>>) => {
  for (const teamId of Object.keys(teams)) {
    const characterIds = unpackTeamId_v0(teamId)
    if (characterIds.length < 1 || characterIds.length > 4) {
      ctx.addIssue({ code: 'custom', message: 'Teams must contain between one and four character IDs', path: [teamId] })
    }
    if (characterIds.some((id) => !GENSHIN_CHARACTER_IDS.includes(id))) {
      ctx.addIssue({ code: 'custom', message: 'Team keys must contain valid character IDs', path: [teamId] })
    }
    if (new Set(characterIds).size !== characterIds.length) {
      ctx.addIssue({ code: 'custom', message: 'Team character IDs must be unique', path: [teamId] })
    }
  }
}

const GenshinTeamSchema_v0 = z.object({
  name: z.string(),
  rating: z.number().optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  tierLists: z
    .object({
      synergy: z.enum(TIER_LIST_VALUES).optional(),
      story: z.enum(TIER_LIST_VALUES).optional(),
      aesthetic: z.enum(TIER_LIST_VALUES).optional(),
      affinity: z.enum(TIER_LIST_VALUES).optional(),
    })
    .optional(),
  trials: z.partialRecord(z.enum(GENSHIN_DOMAIN_TRIAL_IDS), z.number()).optional(),
})

const GenshinTeamsSchema_v0 = z.record(z.string(), GenshinTeamSchema_v0).superRefine(refineTeam_v0)

export { GenshinTeamSchema_v0, GenshinTeamsSchema_v0, packTeamId_v0, refineTeam_v0, unpackTeamId_v0 }
