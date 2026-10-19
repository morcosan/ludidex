export const GENSHIN_ELEMENTS = ['Anemo', 'Geo', 'Electro', 'Dendro', 'Hydro', 'Pyro', 'Cryo'] as const
export const GENSHIN_WEAPONS = ['Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'] as const
export const GENSHIN_NATIONS = [
  'Mondstadt',
  'Liyue',
  'Inazuma',
  'Sumeru',
  'Fontaine',
  'Natlan',
  'Nod-Krai',
  'Snezhnaya',
  'None',
] as const

export type GenshinElement = (typeof GENSHIN_ELEMENTS)[number]
export type GenshinWeaponType = (typeof GENSHIN_WEAPONS)[number]
export type GenshinNation = (typeof GENSHIN_NATIONS)[number]

export const GenshinElementIconUrls: Record<GenshinElement, string[]> = {
  Anemo: ['https://img.game8.co/3290051/36b300a24dcc860f3c7ee93f26730b4c.png/show'],
  Geo: ['https://img.game8.co/3320681/38138954452bee60aa0badc68636b5aa.png/show'],
  Electro: ['https://img.game8.co/3546441/89177e80b9cb7226530780a64fb4addc.png/show'],
  Dendro: ['https://img.game8.co/3309495/df485bcda84175fa8796b827a8aa5e0d.png/show'],
  Hydro: ['https://img.game8.co/3546443/54e5e6b5aa1701af1d108f1a86ca23d3.png/show'],
  Pyro: ['https://img.game8.co/3290050/73211100242437cc2e00927d07e90e79.png/show'],
  Cryo: ['https://img.game8.co/3313079/45778fd49d63ed897695baa2688a6f8c.png/show'],
}

export const GenshinWeaponIconUrls: Record<GenshinWeaponType, string[]> = {
  Sword: [
    'https://img.game8.co/3289646/704a65e3db73086112f54efe514c1229.png/show',
    'https://static.wikia.nocookie.net/gensin-impact/images/8/81/Icon_Sword.png',
  ],
  Claymore: [
    'https://img.game8.co/3289647/1aa24e670c27a0ebcf90b0b68fbda5e2.png/show',
    'https://static.wikia.nocookie.net/gensin-impact/images/6/66/Icon_Claymore.png',
  ],
  Polearm: [
    'https://img.game8.co/3289649/208dfdf1f28215428b49d18a44792414.png/show',
    'https://static.wikia.nocookie.net/gensin-impact/images/6/6a/Icon_Polearm.png',
  ],
  Bow: [
    'https://img.game8.co/3289645/73e0915195a5ddbb21f7025dcace3fab.png/show',
    'https://static.wikia.nocookie.net/gensin-impact/images/8/81/Icon_Bow.png',
  ],
  Catalyst: [
    'https://img.game8.co/3289648/0ab63e2e83c30d6e6cbe323fdea891ec.png/show',
    'https://static.wikia.nocookie.net/gensin-impact/images/2/27/Icon_Catalyst.png',
  ],
}

export const GenshinNationIconUrls: Record<GenshinNation, string[]> = {
  Mondstadt: [
    'https://static.wikia.nocookie.net/gensin-impact/images/c/ce/Mondstadt_Emblem_Night.png',
    'https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20200319/2020031918573764353.png',
  ],
  Liyue: [
    'https://static.wikia.nocookie.net/gensin-impact/images/c/c3/Liyue_Emblem_Night.png',
    'https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20200319/2020031921033557909.png',
  ],
  Inazuma: [
    'https://static.wikia.nocookie.net/gensin-impact/images/a/a5/Inazuma_Emblem_Night.png',
    'https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20210716/2021071618595355993.png',
  ],
  Sumeru: [
    'https://static.wikia.nocookie.net/gensin-impact/images/e/ef/Sumeru_Emblem_Night.png',
    'https://act-webstatic.hoyoverse.com/upload/contentweb/2022/08/16/f77d0c308b54728b6a1f3bc525e42955_1063974383729558189.png',
  ],
  Fontaine: [
    'https://static.wikia.nocookie.net/gensin-impact/images/0/06/Fontaine_Emblem_Night.png',
    'https://webstatic.hoyoverse.com/upload/op-public/2023/08/10/4f32dd59ce1ed2f07d20f79fc64a358c_6481188169214364264.png',
  ],
  Natlan: [
    'https://static.wikia.nocookie.net/gensin-impact/images/3/34/Natlan_Emblem_Night.png',
    'https://fastcdn.hoyoverse.com/content-v2/hk4e/125279/d1b8a99bd52958f9550432504819db85_273180170429996290.png',
  ],
  'Nod-Krai': ['https://static.wikia.nocookie.net/gensin-impact/images/4/4e/Nod-Krai_Emblem_Night.png'],
  Snezhnaya: [
    'https://static.wikia.nocookie.net/gensin-impact/images/c/cd/Snezhnaya_Emblem_Night.png',
    'https://fastcdn.hoyoverse.com/content-v2/hk4e/159175/05b3bf1a72730e1204e347afcf74d5df_8625034156488398724.png',
  ],
  None: [],
}

export const GenshinElementColor: Record<GenshinElement, string> = {
  Anemo: '#5CC6B0',
  Geo: '#E8B53A',
  Electro: '#A98BD0',
  Dendro: '#9CC93F',
  Hydro: '#4A9BEA',
  Pyro: '#EB6B4A',
  Cryo: '#B5E3EE',
}
