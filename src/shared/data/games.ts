import type { ParseKeys } from 'i18next'

export interface Game {
  id: string
  nameKey: ParseKeys
  iconUrls: string[]
}

export const GAMES: Game[] = [
  {
    id: 'genshin',
    nameKey: 'game.label.genshin',
    iconUrls: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd6K1nBJAu2P4JeIGXCRjbZbJMA7GrWqOl0b4J9s35Sg&s=10',
    ],
  },
]
