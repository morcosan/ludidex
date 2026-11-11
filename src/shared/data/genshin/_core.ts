export const GENSHIN_ELEMENTS = ['anemo', 'geo', 'electro', 'dendro', 'hydro', 'pyro', 'cryo'] as const
export const GENSHIN_WEAPONS = ['sword', 'claymore', 'polearm', 'bow', 'catalyst'] as const
export const GENSHIN_NATIONS = [
  'mondstadt',
  'liyue',
  'inazuma',
  'sumeru',
  'fontaine',
  'natlan',
  'nodkrai',
  'snezhnaya',
  'none',
] as const

export type GenshinElement = (typeof GENSHIN_ELEMENTS)[number]
export type GenshinWeaponType = (typeof GENSHIN_WEAPONS)[number]
export type GenshinNation = (typeof GENSHIN_NATIONS)[number]

export const GENSHIN_ELEMENT_COLORS: Record<GenshinElement, string> = {
  anemo: '#5CC6B0',
  geo: '#E8B53A',
  electro: '#A98BD0',
  dendro: '#9CC93F',
  hydro: '#4A9BEA',
  pyro: '#EB6B4A',
  cryo: '#B5E3EE',
}
