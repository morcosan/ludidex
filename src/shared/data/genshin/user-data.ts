export interface GenshinCharacterUserData {
  likeScore?: number
  tierScores?: {
    mainDps?: number
    subDps?: number
    support?: number
    exploration?: number
    outfit?: number
    personality?: number
  }
  stats?: {
    level?: number
    hp?: number
    atk?: number
    def?: number
    critDmg?: number
    critRate?: number
    elemDmg?: number
    em?: number
    er?: number
  }
  talents?: {
    conLv?: number
    attackLv?: number
    skillLv?: number
    burstLv?: number
  }
  tags?: string[]
}
