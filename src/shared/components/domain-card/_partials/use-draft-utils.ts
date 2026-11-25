import { type GenshinDomainUserData } from '../../../state/types'

export interface DomainDraft {
  notes: string
}

export const useDraftUtils = () => {
  const createDraft = (userData?: GenshinDomainUserData): DomainDraft => ({
    notes: userData?.notes ?? '',
  })

  const buildDomain = (draft: DomainDraft): GenshinDomainUserData => ({
    ...(draft.notes ? { notes: draft.notes } : {}),
  })

  return { createDraft, buildDomain }
}
