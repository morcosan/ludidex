import { type GenshinNation } from './_core'

export interface GenshinDomain {
  id: string
  name: string
  trials: GenshinDomainTrial[]
  nation: GenshinNation
}
export interface GenshinDomainTrial {
  id: string
  name: string
}

export const GENSHIN_DOMAINS: GenshinDomain[] = [
  {
    id: 'midsummer',
    name: 'Midsummer Courtyard',
    trials: [
      { id: 'purification1', name: 'Fires of Purification I' },
      { id: 'purification2', name: 'Fires of Purification II' },
      { id: 'purification3', name: 'Fires of Purification III' },
      { id: 'purification4', name: 'Fires of Purification IV' },
      { id: 'purification5', name: 'Fires of Purification V' },
      { id: 'purification6', name: 'Fires of Purification VI' },
    ],
    nation: 'mondstadt',
  },
  {
    id: 'remembrance',
    name: 'Valley of Remembrance',
    trials: [
      { id: 'danceofsteel1', name: 'Dance of Steel I' },
      { id: 'danceofsteel2', name: 'Dance of Steel II' },
      { id: 'danceofsteel3', name: 'Dance of Steel III' },
      { id: 'danceofsteel4', name: 'Dance of Steel IV' },
      { id: 'danceofsteel5', name: 'Dance of Steel V' },
    ],
    nation: 'mondstadt',
  },
  {
    id: 'vindagnyr',
    name: 'Peak of Vindagnyr',
    trials: [
      { id: 'elegiacrime1', name: 'Elegiac Rime I' },
      { id: 'elegiacrime2', name: 'Elegiac Rime II' },
      { id: 'elegiacrime3', name: 'Elegiac Rime III' },
      { id: 'elegiacrime4', name: 'Elegiac Rime IV' },
    ],
    nation: 'mondstadt',
  },
  {
    id: 'guyun',
    name: 'Domain of Guyun',
    trials: [
      { id: 'spring1', name: 'Spring I' },
      { id: 'spring2', name: 'Spring II' },
      { id: 'spring3', name: 'Spring III' },
      { id: 'spring4', name: 'Spring IV' },
      { id: 'spring5', name: 'Spring V' },
      { id: 'spring6', name: 'Spring VI' },
    ],
    nation: 'liyue',
  },
  {
    id: 'clearpool',
    name: 'Clear Pool and Mountain Cavern',
    trials: [
      { id: 'stonechamber1', name: 'Stone Chamber I' },
      { id: 'stonechamber2', name: 'Stone Chamber II' },
      { id: 'stonechamber3', name: 'Stone Chamber III' },
    ],
    nation: 'liyue',
  },
  {
    id: 'zhouformula',
    name: 'Hidden Palace of Zhou Formula',
    trials: [
      { id: 'roaringfire1', name: 'Roaring Fire I' },
      { id: 'roaringfire2', name: 'Roaring Fire II' },
      { id: 'roaringfire3', name: 'Roaring Fire III' },
      { id: 'roaringfire4', name: 'Roaring Fire IV' },
    ],
    nation: 'liyue',
  },
  {
    id: 'ridgewatch',
    name: 'Ridge Watch',
    trials: [
      { id: 'unyielding1', name: 'Unyielding I' },
      { id: 'unyielding2', name: 'Unyielding II' },
      { id: 'unyielding3', name: 'Unyielding III' },
      { id: 'unyielding4', name: 'Unyielding IV' },
    ],
    nation: 'liyue',
  },
  {
    id: 'lostvalley',
    name: 'The Lost Valley',
    trials: [
      { id: 'machinenest1', name: 'Machine Nest I' },
      { id: 'machinenest2', name: 'Machine Nest II' },
      { id: 'machinenest3', name: 'Machine Nest III' },
      { id: 'machinenest4', name: 'Machine Nest IV' },
    ],
    nation: 'liyue',
  },
  {
    id: 'momiji',
    name: 'Momiji-Dyed Court',
    trials: [
      { id: 'autumnhunt1', name: 'Autumn Hunt I' },
      { id: 'autumnhunt2', name: 'Autumn Hunt II' },
      { id: 'autumnhunt3', name: 'Autumn Hunt III' },
      { id: 'autumnhunt4', name: 'Autumn Hunt IV' },
    ],
    nation: 'inazuma',
  },
  {
    id: 'slumbering',
    name: 'Slumbering Court',
    trials: [
      { id: 'necropolis1', name: 'Necropolis I' },
      { id: 'necropolis2', name: 'Necropolis II' },
      { id: 'necropolis3', name: 'Necropolis III' },
      { id: 'necropolis4', name: 'Necropolis IV' },
    ],
    nation: 'inazuma',
  },
  {
    id: 'enlightenment',
    name: 'Spire of Solitary Enlightenment',
    trials: [
      { id: 'sevensenses1', name: 'Seven Senses I' },
      { id: 'sevensenses2', name: 'Seven Senses II' },
      { id: 'sevensenses3', name: 'Seven Senses III' },
      { id: 'sevensenses4', name: 'Seven Senses IV' },
    ],
    nation: 'sumeru',
  },
  {
    id: 'cityofgold',
    name: 'City of Gold',
    trials: [
      { id: 'desertcitadel1', name: 'Desert Citadel I' },
      { id: 'desertcitadel2', name: 'Desert Citadel II' },
      { id: 'desertcitadel3', name: 'Desert Citadel III' },
      { id: 'desertcitadel4', name: 'Desert Citadel IV' },
    ],
    nation: 'sumeru',
  },
  {
    id: 'molteniron',
    name: 'Molten Iron Fortress',
    trials: [
      { id: 'forsakenrampart1', name: 'Forsaken Rampart I' },
      { id: 'forsakenrampart2', name: 'Forsaken Rampart II' },
      { id: 'forsakenrampart3', name: 'Forsaken Rampart III' },
      { id: 'forsakenrampart4', name: 'Forsaken Rampart IV' },
    ],
    nation: 'sumeru',
  },
  {
    id: 'denouement',
    name: 'Denouement of Sin',
    trials: [
      { id: 'harmony1', name: 'Harmony I' },
      { id: 'harmony2', name: 'Harmony II' },
      { id: 'harmony3', name: 'Harmony III' },
      { id: 'harmony4', name: 'Harmony IV' },
    ],
    nation: 'fontaine',
  },
  {
    id: 'waterfallwen',
    name: 'Waterfall Wen',
    trials: [
      { id: 'assembly1', name: 'Crumbling Assembly I' },
      { id: 'assembly2', name: 'Crumbling Assembly II' },
      { id: 'assembly3', name: 'Crumbling Assembly III' },
      { id: 'assembly4', name: 'Crumbling Assembly IV' },
    ],
    nation: 'fontaine',
  },
  {
    id: 'theater',
    name: 'Faded Theater',
    trials: [
      { id: 'variation1', name: 'Variation I' },
      { id: 'variation2', name: 'Variation II' },
      { id: 'variation3', name: 'Variation III' },
      { id: 'variation4', name: 'Variation IV' },
    ],
    nation: 'fontaine',
  },
  {
    id: 'rainbow',
    name: 'Sanctum of Rainbow Spirits',
    trials: [
      { id: 'gauntlet1', name: 'The Burning Gauntlet I' },
      { id: 'gauntlet2', name: 'The Burning Gauntlet II' },
      { id: 'gauntlet3', name: 'The Burning Gauntlet III' },
      { id: 'gauntlet4', name: 'The Burning Gauntlet IV' },
    ],
    nation: 'natlan',
  },
  {
    id: 'derelict',
    name: 'Derelict Masonry Dock',
    trials: [
      { id: 'deepfire1', name: 'Deepfire Construct I' },
      { id: 'deepfire2', name: 'Deepfire Construct II' },
      { id: 'deepfire3', name: 'Deepfire Construct III' },
      { id: 'deepfire4', name: 'Deepfire Construct IV' },
    ],
    nation: 'natlan',
  },
  {
    id: 'frostladen',
    name: 'Frostladen Machinery',
    trials: [
      { id: 'derivations1', name: 'Derivations from the Deep I' },
      { id: 'derivations2', name: 'Derivations from the Deep II' },
      { id: 'derivations3', name: 'Derivations from the Deep III' },
      { id: 'derivations4', name: 'Derivations from the Deep IV' },
    ],
    nation: 'nodkrai',
  },
  {
    id: 'moonchild',
    name: "Moonchild's Treasures",
    trials: [
      { id: 'moonchild1', name: 'Sacred Vault I' },
      { id: 'moonchild2', name: 'Sacred Vault II' },
      { id: 'moonchild3', name: 'Sacred Vault III' },
      { id: 'moonchild4', name: 'Sacred Vault IV' },
    ],
    nation: 'nodkrai',
  },
  {
    id: 'cecilia',
    name: 'Cecilia Garden',
    trials: [
      { id: 'cecilia1', name: 'Cecilia Garden I' },
      { id: 'cecilia2', name: 'Cecilia Garden II' },
      { id: 'cecilia3', name: 'Cecilia Garden III' },
      { id: 'cecilia4', name: 'Cecilia Garden IV' },
    ],
    nation: 'mondstadt',
  },
  {
    id: 'lianshan',
    name: 'Hidden Palace of Lianshan Formula',
    trials: [
      { id: 'lianshan1', name: 'Hidden Palace of Lianshan Formula I' },
      { id: 'lianshan2', name: 'Hidden Palace of Lianshan Formula II' },
      { id: 'lianshan3', name: 'Hidden Palace of Lianshan Formula III' },
      { id: 'lianshan4', name: 'Hidden Palace of Lianshan Formula IV' },
    ],
    nation: 'liyue',
  },
  {
    id: 'flowingsand',
    name: 'Court of Flowing Sand',
    trials: [
      { id: 'flowingsand1', name: 'Court of Flowing Sand I' },
      { id: 'flowingsand2', name: 'Court of Flowing Sand II' },
      { id: 'flowingsand3', name: 'Court of Flowing Sand III' },
      { id: 'flowingsand4', name: 'Court of Flowing Sand IV' },
    ],
    nation: 'inazuma',
  },
  {
    id: 'abjectpride',
    name: 'Tower of Abject Pride',
    trials: [
      { id: 'abjectpride1', name: 'Tower of Abject Pride I' },
      { id: 'abjectpride2', name: 'Tower of Abject Pride II' },
      { id: 'abjectpride3', name: 'Tower of Abject Pride III' },
      { id: 'abjectpride4', name: 'Tower of Abject Pride IV' },
    ],
    nation: 'sumeru',
  },
  {
    id: 'deeptides',
    name: 'Echoes of the Deep Tides',
    trials: [
      { id: 'deeptides1', name: 'Echoes of the Deep Tides I' },
      { id: 'deeptides2', name: 'Echoes of the Deep Tides II' },
      { id: 'deeptides3', name: 'Echoes of the Deep Tides III' },
      { id: 'deeptides4', name: 'Echoes of the Deep Tides IV' },
    ],
    nation: 'fontaine',
  },
  {
    id: 'watchtower',
    name: 'Ancient Watchtower',
    trials: [
      { id: 'atchtower1', name: 'Ancient Watchtower I' },
      { id: 'atchtower2', name: 'Ancient Watchtower II' },
      { id: 'atchtower3', name: 'Ancient Watchtower III' },
      { id: 'atchtower4', name: 'Ancient Watchtower IV' },
    ],
    nation: 'natlan',
  },
  {
    id: 'mooncourt',
    name: 'Lost Mooncourt',
    trials: [
      { id: 'mooncourt1', name: 'Lost Mooncourt I' },
      { id: 'mooncourt2', name: 'Lost Mooncourt II' },
      { id: 'mooncourt3', name: 'Lost Mooncourt III' },
      { id: 'mooncourt4', name: 'Lost Mooncourt IV' },
    ],
    nation: 'nodkrai',
  },
  {
    id: 'forsakenrift',
    name: 'Forsaken Rift',
    trials: [
      { id: 'forsakenrift1', name: 'Forsaken Rift I' },
      { id: 'forsakenrift2', name: 'Forsaken Rift II' },
      { id: 'forsakenrift3', name: 'Forsaken Rift III' },
      { id: 'forsakenrift4', name: 'Forsaken Rift IV' },
    ],
    nation: 'mondstadt',
  },
  {
    id: 'taishan',
    name: 'Taishan Mansion',
    trials: [
      { id: 'taishan1', name: 'Taishan Mansion I' },
      { id: 'taishan2', name: 'Taishan Mansion II' },
      { id: 'taishan3', name: 'Taishan Mansion III' },
      { id: 'taishan4', name: 'Taishan Mansion IV' },
    ],
    nation: 'liyue',
  },
  {
    id: 'violetcourt',
    name: 'Violet Court',
    trials: [
      { id: 'violetcourt1', name: 'Violet Court I' },
      { id: 'violetcourt2', name: 'Violet Court II' },
      { id: 'violetcourt3', name: 'Violet Court III' },
      { id: 'violetcourt4', name: 'Violet Court IV' },
    ],
    nation: 'inazuma',
  },
  {
    id: 'ignorance',
    name: 'Steeple of Ignorance',
    trials: [
      { id: 'ignorance1', name: 'Steeple of Ignorance I' },
      { id: 'ignorance2', name: 'Steeple of Ignorance II' },
      { id: 'ignorance3', name: 'Steeple of Ignorance III' },
      { id: 'ignorance4', name: 'Steeple of Ignorance IV' },
    ],
    nation: 'sumeru',
  },
  {
    id: 'paleglory',
    name: 'Pale Forgotten Glory',
    trials: [
      { id: 'paleglory1', name: 'Pale Forgotten Glory I' },
      { id: 'paleglory2', name: 'Pale Forgotten Glory II' },
      { id: 'paleglory3', name: 'Pale Forgotten Glory III' },
      { id: 'paleglory4', name: 'Pale Forgotten Glory IV' },
    ],
    nation: 'fontaine',
  },
  {
    id: 'blazingruins',
    name: 'Blazing Ruins',
    trials: [
      { id: 'blazingruins1', name: 'Blazing Ruins I' },
      { id: 'blazingruins2', name: 'Blazing Ruins II' },
      { id: 'blazingruins3', name: 'Blazing Ruins III' },
      { id: 'blazingruins4', name: 'Blazing Ruins IV' },
    ],
    nation: 'natlan',
  },
  {
    id: 'lightless',
    name: 'Lightless Capital',
    trials: [
      { id: 'lightless1', name: 'Lightless Capital I' },
      { id: 'lightless2', name: 'Lightless Capital II' },
      { id: 'lightless3', name: 'Lightless Capital III' },
      { id: 'lightless4', name: 'Lightless Capital IV' },
    ],
    nation: 'nodkrai',
  },
  {
    id: 'thornycrown',
    name: 'Thorny Crown of the Mountain Wind',
    trials: [
      { id: 'thornyrown1', name: 'Thorny Crown of the Mountain Wind I' },
      { id: 'thornyrown2', name: 'Thorny Crown of the Mountain Wind II' },
      { id: 'thornyrown3', name: 'Thorny Crown of the Mountain Wind III' },
      { id: 'thornyrown4', name: 'Thorny Crown of the Mountain Wind IV' },
    ],
    nation: 'mondstadt',
  },
  {
    id: 'glacier',
    name: 'Inverted Glacier',
    trials: [
      { id: 'sacredvault1', name: 'Sacred Vault I' },
      { id: 'sacredvault2', name: 'Sacred Vault II' },
      { id: 'sacredvault3', name: 'Sacred Vault III' },
      { id: 'sacredvault4', name: 'Sacred Vault IV' },
    ],
    nation: 'snezhnaya',
  },
  {
    id: 'obsession',
    name: 'Scars of Cursed Obsession',
    trials: [
      { id: 'obsession1', name: 'Scars of Cursed Obsession I' },
      { id: 'obsession2', name: 'Scars of Cursed Obsession II' },
      { id: 'obsession3', name: 'Scars of Cursed Obsession III' },
      { id: 'obsession4', name: 'Scars of Cursed Obsession IV' },
    ],
    nation: 'snezhnaya',
  },
  {
    id: 'fallengrace',
    name: 'Relics of the Fallen Grace',
    trials: [
      { id: 'fallengrace1', name: 'Relics of the Fallen Grace I' },
      { id: 'fallengrace2', name: 'Relics of the Fallen Grace II' },
      { id: 'fallengrace3', name: 'Relics of the Fallen Grace III' },
      { id: 'fallengrace4', name: 'Relics of the Fallen Grace IV' },
    ],
    nation: 'snezhnaya',
  },
]

export const GENSHIN_DOMAIN_IDS = [...new Set(GENSHIN_DOMAINS.map(({ id }) => id))] as const
