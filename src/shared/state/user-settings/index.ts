import { z } from 'zod'

const ItemSizeSchema = z.enum(['sm', 'md', 'lg'])
const CharacterSortingSchema = z.enum(['name', 'level', 'rating', 'status'])
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
  charSorting: CharacterSortingSchema.default('name'),
  charItemSize: ItemSizeSchema.default('md'),
  charLabelTop: CharacterLabelSchema.nullable().default(null),
  charLabelBottom: CharacterLabelSchema.nullable().default(null),
  teamItemSize: ItemSizeSchema.default('md'),
})

export { CharacterLabelSchema, CharacterSortingSchema, ItemSizeSchema, UserSettingsSchema }
