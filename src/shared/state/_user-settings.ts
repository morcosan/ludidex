import { z } from 'zod'

const displaySizeSchema = z.enum(['small', 'medium', 'large'])

const userSettingsSchema = z.object({
  displaySize: displaySizeSchema.default('medium'),
})

type DisplaySize = z.infer<typeof displaySizeSchema>
type UserSettings = z.infer<typeof userSettingsSchema>

export { userSettingsSchema, type DisplaySize, type UserSettings }
