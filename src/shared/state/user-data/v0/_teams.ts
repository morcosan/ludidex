import { z } from 'zod'
import { GENSHIN_CHARACTER_IDS } from '../../../data'

const unpackTeamId_v0 = (id: string): string[] => id.split('_')
const packTeamId_v0 = (charIds: string[]): string => charIds.join('_')

const GenshinTeamSchema_v0 = z.object({
  name: z.string(),
  rating: z.number().optional(),
  tags: z.array(z.string()).optional(),
})

const GenshinTeamsSchema_v0 = z.record(z.string(), GenshinTeamSchema_v0).superRefine((teams, ctx) => {
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
})

export { GenshinTeamSchema_v0, GenshinTeamsSchema_v0, packTeamId_v0, unpackTeamId_v0 }
