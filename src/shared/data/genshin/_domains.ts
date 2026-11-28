import {
  DOMAIN_TYPES,
  getTrialName,
  getTrialNames,
  toTrials,
  toWeekday,
  type DomainType,
  type GenshinDomain,
  type GenshinDomainTrial,
} from './_domain-utils'

const GENSHIN_DOMAINS: GenshinDomain[] = [
  // TROUNCE
  // -------------------------------------------------------------
  {
    id: 'stormterror',
    name: 'Confront Stormterror',
    nation: 'mondstadt',
    type: 'trounce',
    trials: toTrials('stormterror', 'Storming Terror', [
      { count: 1, dmgTypes: [], resTypes: [] },
      { count: 1, dmgTypes: [], resTypes: [] },
      { count: 1, dmgTypes: [], resTypes: [] },
      { count: 1, dmgTypes: [], resTypes: [] },
      { count: 1, dmgTypes: [], resTypes: [] },
      { count: 1, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'chessgame',
    name: 'Unresolved Chess Game',
    nation: 'mondstadt',
    type: 'trounce',
    trials: toTrials('chessgame', 'Wager With the Mages', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'goldenhouse',
    name: 'Enter the Golden House',
    nation: 'liyue',
    type: 'trounce',
    trials: toTrials('goldenhouse', 'The Golden Shadow', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'dragonqueller',
    name: 'Beneath the Dragon-Queller',
    nation: 'liyue',
    type: 'trounce',
    trials: toTrials('dragonqueller', 'Earthshaking Dragon', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'tenshukaku',
    name: 'Narukami Island: Tenshukaku',
    nation: 'inazuma',
    type: 'trounce',
    trials: toTrials('tenshukaku', 'Duel to the Fiery Death', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'euthymia',
    name: 'End of the Oneiric Euthymia',
    nation: 'inazuma',
    type: 'trounce',
    trials: toTrials('euthymia', 'Guardian of Eternity', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'joururi',
    name: 'Joururi Workshop',
    nation: 'sumeru',
    type: 'trounce',
    trials: toTrials('joururi', 'Lucent Altar of the Everlasting', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'beginnings',
    name: 'The Realm of Beginnings',
    nation: 'sumeru',
    type: 'trounce',
    trials: toTrials('beginnings', '"They" Too Were Once Flawless', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'nirvana',
    name: 'Binding Field of Universal Nirvana',
    nation: 'sumeru',
    type: 'trounce',
    trials: toTrials('nirvana', 'A Deluded Thought', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'anotherworld',
    name: 'Shadow of Another World',
    nation: 'fontaine',
    type: 'trounce',
    trials: toTrials('anotherworld', 'The Titan Amidst the Stars', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'scatteredruins',
    name: 'Scattered Ruins',
    nation: 'fontaine',
    type: 'trounce',
    trials: toTrials('scatteredruins', 'Parting of Light and Shadow', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'stonestele',
    name: 'Stone Stele Records',
    nation: 'natlan',
    type: 'trounce',
    trials: toTrials('stonestele', 'The Deep, Transient Void', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'falsemoon',
    name: 'False Moon Institute',
    nation: 'nodkrai',
    type: 'trounce',
    trials: toTrials('falsemoon', 'Twilight of the Heretic', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },

  // BLESSING
  // -------------------------------------------------------------
  {
    id: 'midsummer',
    name: 'Midsummer Courtyard',
    nation: 'mondstadt',
    type: 'blessing',
    trials: toTrials('midsummer', 'Fires of Purification', [
      { count: 26, dmgTypes: ['cryo', 'hydro', 'physical'], resTypes: ['cryo', 'hydro'] },
      { count: 12, dmgTypes: ['electro'], resTypes: ['electro'] },
      { count: 14, dmgTypes: ['cryo'], resTypes: ['cryo'] },
      { count: 15, dmgTypes: ['hydro'], resTypes: ['hydro'] },
      { count: 5, dmgTypes: ['cryo'], resTypes: ['cryo'] },
      { count: 7, dmgTypes: ['electro'], resTypes: ['electro'] },
    ]),
  },
  {
    id: 'remembrance',
    name: 'Valley of Remembrance',
    nation: 'mondstadt',
    type: 'blessing',
    trials: toTrials('remembrance', 'Dance of Steel', [
      { count: 23, dmgTypes: ['physical', 'cryo'], resTypes: [] },
      { count: 16, dmgTypes: ['physical', 'pyro', 'hydro'], resTypes: ['pyro'] },
      { count: 20, dmgTypes: ['physical', 'pyro', 'electro'], resTypes: ['pyro', 'electro'] },
      { count: 7, dmgTypes: ['physical', 'pyro', 'hydro', 'electro', 'cryo'], resTypes: ['pyro', 'electro'] },
      { count: 5, dmgTypes: ['pyro', 'electro', 'cryo'], resTypes: ['pyro', 'electro'] },
    ]),
  },
  {
    id: 'vindagnyr',
    name: 'Peak of Vindagnyr',
    nation: 'mondstadt',
    type: 'blessing',
    trials: toTrials('vindagnyr', 'Elegiac Rime', [
      { count: 15, dmgTypes: ['cryo'], resTypes: ['cryo'] },
      { count: 10, dmgTypes: ['cryo', 'physical'], resTypes: ['cryo'] },
      { count: 7, dmgTypes: ['cryo', 'physical'], resTypes: ['cryo'] },
      { count: 1, dmgTypes: ['cryo', 'physical'], resTypes: ['cryo'] },
    ]),
  },
  {
    id: 'thornycrown',
    name: 'Thorny Crown of the Mountain Wind',
    nation: 'mondstadt',
    type: 'blessing',
    trials: toTrials('thornycrown', 'Thorny Crown of the Mountain Wind', [
      { count: 3, dmgTypes: ['physical', 'pyro', 'hydro'], resTypes: ['hydro'] },
      { count: 1, dmgTypes: ['physical', 'geo'], resTypes: ['physical', 'geo'] },
      { count: 1, dmgTypes: ['physical', 'dynamic'], resTypes: ['physical', 'dynamic'] },
      { count: 2, dmgTypes: ['geo', 'dynamic'], resTypes: ['dynamic'] },
    ]),
  },
  {
    id: 'guyun',
    name: 'Domain of Guyun',
    nation: 'liyue',
    type: 'blessing',
    trials: toTrials('guyun', 'Spring', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'clearpool',
    name: 'Clear Pool and Mountain Cavern',
    nation: 'liyue',
    type: 'blessing',
    trials: toTrials('clearpool', 'Stone Chamber', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'zhouformula',
    name: 'Hidden Palace of Zhou Formula',
    nation: 'liyue',
    type: 'blessing',
    trials: toTrials('zhouformula', 'Roaring Fire', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'ridgewatch',
    name: 'Ridge Watch',
    nation: 'liyue',
    type: 'blessing',
    trials: toTrials('ridgewatch', 'Unyielding', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'lostvalley',
    name: 'The Lost Valley',
    nation: 'liyue',
    type: 'blessing',
    trials: toTrials('lostvalley', 'Machine Nest', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'momiji',
    name: 'Momiji-Dyed Court',
    nation: 'inazuma',
    type: 'blessing',
    trials: toTrials('momiji', 'Autumn Hunt', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'slumbering',
    name: 'Slumbering Court',
    nation: 'inazuma',
    type: 'blessing',
    trials: toTrials('slumbering', 'Necropolis', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'enlightenment',
    name: 'Spire of Solitary Enlightenment',
    nation: 'sumeru',
    type: 'blessing',
    trials: toTrials('enlightenment', 'Seven Senses', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'cityofgold',
    name: 'City of Gold',
    nation: 'sumeru',
    type: 'blessing',
    trials: toTrials('cityofgold', 'Desert Citadel', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'molteniron',
    name: 'Molten Iron Fortress',
    nation: 'sumeru',
    type: 'blessing',
    trials: toTrials('molteniron', 'Forsaken Rampart', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'denouement',
    name: 'Denouement of Sin',
    nation: 'fontaine',
    type: 'blessing',
    trials: toTrials('denouement', 'Harmony', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'waterfallwen',
    name: 'Waterfall Wen',
    nation: 'fontaine',
    type: 'blessing',
    trials: toTrials('waterfallwen', 'Crumbling Assembly', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'theater',
    name: 'Faded Theater',
    nation: 'fontaine',
    type: 'blessing',
    trials: toTrials('theater', 'Variation', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'rainbow',
    name: 'Sanctum of Rainbow Spirits',
    nation: 'natlan',
    type: 'blessing',
    trials: toTrials('rainbow', 'The Burning Gauntlet', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'derelict',
    name: 'Derelict Masonry Dock',
    nation: 'natlan',
    type: 'blessing',
    trials: toTrials('derelict', 'Deepfire Construct', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'frostladen',
    name: 'Frostladen Machinery',
    nation: 'nodkrai',
    type: 'blessing',
    trials: toTrials('frostladen', 'Derivations from the Deep', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'moonchild',
    name: "Moonchild's Treasures",
    nation: 'nodkrai',
    type: 'blessing',
    trials: toTrials('moonchild', 'Sacred Vault', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'glacier',
    name: 'Inverted Glacier',
    nation: 'snezhnaya',
    type: 'blessing',
    trials: toTrials('glacier', 'Sacred Vault', [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },

  // FORGERY
  // -------------------------------------------------------------
  {
    id: 'cecilia',
    name: 'Cecilia Garden',
    nation: 'mondstadt',
    type: 'forgery',
    trials: toTrials('cecilia', toWeekday('City of Reflections', 'Submerged Valley', 'Ruins of Thirsting Capital'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'lianshan',
    name: 'Hidden Palace of Lianshan Formula',
    nation: 'liyue',
    type: 'forgery',
    trials: toTrials('lianshan', toWeekday('Thundercloud', 'Thundering Ruins', 'Trial Grounds of Thunder'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'flowingsand',
    name: 'Court of Flowing Sand',
    nation: 'inazuma',
    type: 'forgery',
    trials: toTrials('flowingsand', toWeekday('Sunken Sands', 'Altar of Sands', 'Sand Burial'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'abjectpride',
    name: 'Tower of Abject Pride',
    nation: 'sumeru',
    type: 'forgery',
    trials: toTrials('abjectpride', toWeekday('Tainted Clouds', 'Obsession', 'Leading Karma'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'deeptides',
    name: 'Echoes of the Deep Tides',
    nation: 'fontaine',
    type: 'forgery',
    trials: toTrials('deeptides', toWeekday('Robotic Ruse', 'Artisanship', 'Curious Contraptions'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'watchtower',
    name: 'Ancient Watchtower',
    nation: 'natlan',
    type: 'forgery',
    trials: toTrials('watchtower', toWeekday('Scrying Shadows', 'Attentive Observation', 'Estimation'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'mooncourt',
    name: 'Lost Mooncourt',
    nation: 'nodkrai',
    type: 'forgery',
    trials: toTrials('mooncourt', toWeekday('Radiant Splendor', 'Prayers Sung', 'Lunar Oblation'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'obsession',
    name: 'Scars of Cursed Obsession',
    nation: 'snezhnaya',
    type: 'forgery',
    trials: toTrials('obsession', toWeekday('Cast Iron', 'Chain Track', 'Severed Steel'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },

  // MASTERY
  // -------------------------------------------------------------
  {
    id: 'forsakenrift',
    name: 'Forsaken Rift',
    nation: 'mondstadt',
    type: 'mastery',
    trials: toTrials('forsakenrift', toWeekday('Frosted Altar', 'Frozen Abyss', 'Realm of Slumber'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'taishan',
    name: 'Taishan Mansion',
    nation: 'liyue',
    type: 'mastery',
    trials: toTrials('taishan', toWeekday('Altar of Flames', 'Heart of the Flames', 'Circle of Embers'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'violetcourt',
    name: 'Violet Court',
    nation: 'inazuma',
    type: 'mastery',
    trials: toTrials('violetcourt', toWeekday('Reign of Violet', 'Thundering Valley', 'Vine-Infested Ruins'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'ignorance',
    name: 'Steeple of Ignorance',
    nation: 'sumeru',
    type: 'mastery',
    trials: toTrials('ignorance', toWeekday('Full Moon', 'Witticism', 'Basket of Discipline'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'paleglory',
    name: 'Pale Forgotten Glory',
    nation: 'fontaine',
    type: 'mastery',
    trials: toTrials('paleglory', toWeekday('Rhyming Rhythm', 'Admonishing Engraving', 'Chiming Recitation'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'blazingruins',
    name: 'Blazing Ruins',
    nation: 'natlan',
    type: 'mastery',
    trials: toTrials('blazingruins', toWeekday('Sublime Turning', 'Myriad Illusions', 'Return'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'lightless',
    name: 'Lightless Capital',
    nation: 'nodkrai',
    type: 'mastery',
    trials: toTrials('lightless', toWeekday('Fallen City', 'Shadowed Legacy', 'Overturned Roost'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },
  {
    id: 'fallengrace',
    name: 'Relics of the Fallen Grace',
    nation: 'snezhnaya',
    type: 'mastery',
    trials: toTrials('fallengrace', toWeekday('Contemplation', 'Hermitage', 'Shared Vision'), [
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
      { count: 0, dmgTypes: [], resTypes: [] },
    ]),
  },

  // ONETIME
  // -------------------------------------------------------------
  {
    id: 'templefalcon',
    name: 'Temple of the Falcon',
    nation: 'mondstadt',
    type: 'onetime',
    trials: [
      {
        id: 'templefalcon_windycliff',
        name: 'Windy Cliff',
        enemy: { count: 0, dmgTypes: [], resTypes: [] },
      },
    ],
  },
  {
    id: 'templewolf',
    name: 'Temple of the Wolf',
    nation: 'mondstadt',
    type: 'onetime',
    trials: [
      {
        id: 'templewolf_scorching',
        name: 'Scorching Fire and Raging Lightning',
        enemy: { count: 0, dmgTypes: [], resTypes: [] },
      },
    ],
  },
  {
    id: 'templelion',
    name: 'Temple of the Lion',
    nation: 'mondstadt',
    type: 'onetime',
    trials: [
      {
        id: 'templelion_hideout',
        name: 'Secret Hideout',
        enemy: { count: 0, dmgTypes: [], resTypes: [] },
      },
    ],
  },
  {
    id: 'eaglegate',
    name: "Eagle's Gate",
    nation: 'mondstadt',
    type: 'onetime',
    trials: [
      {
        id: 'eaglegate_fortress',
        name: 'Fallen Fortress',
        enemy: { count: 0, dmgTypes: [], resTypes: [] },
      },
    ],
  },
  {
    id: 'forsakenruins',
    name: 'Domain of Forsaken Ruins',
    nation: 'liyue',
    type: 'onetime',
    trials: [
      {
        id: 'forsakenruins_encounter',
        name: 'Lucky Encounter in the Clouds',
        enemy: { count: 0, dmgTypes: [], resTypes: [] },
      },
    ],
  },
  {
    id: 'waywardpath',
    name: 'Domain of the Wayward Path',
    nation: 'liyue',
    type: 'onetime',
    trials: [
      {
        id: 'waywardpath_blossoms',
        name: 'Tarry Among the Peach Blossoms',
        enemy: { count: 0, dmgTypes: [], resTypes: [] },
      },
    ],
  },
  {
    id: 'guizang',
    name: 'Hidden Palace of Guizang Formula',
    nation: 'liyue',
    type: 'onetime',
    trials: [
      {
        id: 'guizang_voyage',
        name: 'Voyage to the Sanguine Sky',
        enemy: { count: 0, dmgTypes: [], resTypes: [] },
      },
      {
        id: 'guizang_travels',
        name: 'Travels of the Moonlit Venturer',
        enemy: { count: 0, dmgTypes: [], resTypes: [] },
      },
    ],
  },

  // ------------
  {
    id: 'umbrellashade',
    name: "Under the Umbrella's Shade",
    nation: 'sumeru',
    type: 'onetime',
    trials: [
      {
        id: 'umbrellashade_fungus',
        name: 'The Universal Fungus',
        enemy: { count: 0, dmgTypes: [], resTypes: [] },
      },
    ],
  },
] as const

const GENSHIN_DOMAIN_IDS = [...new Set(GENSHIN_DOMAINS.map(({ id }) => id))] as const
const GENSHIN_DOMAIN_TRIALS = [...GENSHIN_DOMAINS.flatMap(({ trials }) => trials)] as const
const GENSHIN_DOMAIN_TRIAL_IDS = [...new Set(GENSHIN_DOMAIN_TRIALS.map(({ id }) => id))] as const
const GENSHIN_DOMAIN_BY_TRIAL = {
  ...Object.fromEntries(GENSHIN_DOMAINS.flatMap((domain) => domain.trials.map(({ id }) => [id, domain] as const))),
} as const

export {
  DOMAIN_TYPES,
  GENSHIN_DOMAIN_BY_TRIAL,
  GENSHIN_DOMAIN_IDS,
  GENSHIN_DOMAIN_TRIAL_IDS,
  GENSHIN_DOMAIN_TRIALS,
  GENSHIN_DOMAINS,
  getTrialName,
  getTrialNames,
  type DomainType,
  type GenshinDomain,
  type GenshinDomainTrial,
}
