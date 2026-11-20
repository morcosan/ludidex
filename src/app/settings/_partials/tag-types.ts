import { type TagColor } from '@app-shared/data'

export type TagDraft = {
  tag: string
  name: string
  color: TagColor | null
  invalid: boolean
}

export interface Draft {
  tags: TagDraft[]
}
