import { z } from 'zod'

const ItemSizeSchema = z.enum(['sm', 'md', 'lg'])
const CharacterLabelSchema = z.enum([
  'rating',
  'status',
  'level',
  'hp',
  'atk',
  'def',
  'em',
  'er',
  'critRate',
  'critDmg',
])
const UserSettingsSchema = z.object({
  charItemSize: ItemSizeSchema.default('md'),
  charLabelTop: CharacterLabelSchema.nullable().default(null),
  charLabelBottom: CharacterLabelSchema.nullable().default(null),
  teamItemSize: ItemSizeSchema.default('md'),
})

export { CharacterLabelSchema, ItemSizeSchema, UserSettingsSchema }
