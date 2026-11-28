export type GenshinElement = 'anemo' | 'geo' | 'electro' | 'dendro' | 'hydro' | 'pyro' | 'cryo'
export const GENSHIN_ELEMENTS: GenshinElement[] = [
  'anemo',
  'geo',
  'electro',
  'dendro',
  'hydro',
  'pyro',
  'cryo',
] as const

export type GenshinElementType =
  'anemo' | 'geo' | 'electro' | 'dendro' | 'hydro' | 'pyro' | 'cryo' | 'physical' | 'dynamic'
export const GENSHIN_ELEMENT_TYPES: GenshinElementType[] = [...GENSHIN_ELEMENTS, 'physical', 'dynamic'] as const

export type GenshinWeaponType = 'sword' | 'claymore' | 'polearm' | 'catalyst' | 'bow'
export const GENSHIN_WEAPON_TYPES: GenshinWeaponType[] = ['sword', 'claymore', 'polearm', 'catalyst', 'bow'] as const

export type GenshinNation =
  'mondstadt' | 'liyue' | 'inazuma' | 'sumeru' | 'fontaine' | 'natlan' | 'nodkrai' | 'snezhnaya' | 'other'
export const GENSHIN_NATIONS: GenshinNation[] = [
  'mondstadt',
  'liyue',
  'inazuma',
  'sumeru',
  'fontaine',
  'natlan',
  'nodkrai',
  'snezhnaya',
  'other',
] as const

export const GENSHIN_ELEMENT_COLORS: Record<GenshinElement, string> = {
  anemo: '#5CC6B0',
  geo: '#E8B53A',
  electro: '#A98BD0',
  dendro: '#9CC93F',
  hydro: '#4A9BEA',
  pyro: '#EB6B4A',
  cryo: '#B5E3EE',
}
