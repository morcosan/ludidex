import { type GenshinDamageType, type GenshinNation } from './_core'

type DomainType = 'trounce' | 'blessing' | 'forgery' | 'mastery' | 'onetime'
const DOMAIN_TYPES: DomainType[] = ['trounce', 'blessing', 'forgery', 'mastery', 'onetime']

type WeekdayName = { 1: string; 2: string; 3: string; 4: string; 5: string; 6: string; 7: string }

interface GenshinDomain {
  id: string
  name: string
  nation: GenshinNation
  type: DomainType
  trials: GenshinDomainTrial[]
}
interface GenshinDomainTrial {
  id: string
  name: string | WeekdayName
  enemy: GenshinDomainTrialEnemy
}
interface GenshinDomainTrialEnemy {
  count: number
  dmgTypes: GenshinDamageType[]
  resTypes: GenshinDamageType[]
}

const toWeekday = (monThu: string, tueFri: string, wedSat: string): WeekdayName => {
  return { 1: monThu, 2: tueFri, 3: wedSat, 4: monThu, 5: tueFri, 6: wedSat, 7: wedSat }
}

const toTrials = (domainId: string, baseName: string | WeekdayName, enemies: GenshinDomainTrialEnemy[]) => {
  const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const
  const toRoman = (level: number): string => ROMAN_NUMERALS[level - 1] ?? String(level)
  const toId = (key: string) => '{id}_{key}'.replace('{id}', domainId).replace('{key}', key)
  const toName = (base: string, numeral: string) => `${base} ${numeral}`

  return enemies.map((enemy, index): GenshinDomainTrial => {
    const level = index + 1
    const numeral = toRoman(level)
    const name =
      typeof baseName === 'string'
        ? toName(baseName, numeral)
        : {
            1: toName(baseName[1], numeral),
            2: toName(baseName[2], numeral),
            3: toName(baseName[3], numeral),
            4: toName(baseName[4], numeral),
            5: toName(baseName[5], numeral),
            6: toName(baseName[6], numeral),
            7: toName(baseName[7], numeral),
          }
    return { id: toId(String(level)), name, enemy }
  })
}

const getTrialName = (trial: GenshinDomainTrial, date = new Date()): string => {
  if (typeof trial.name === 'string') return trial.name
  const weekday = ((((date.getDay() - 1) % 7) + 7) % 7) + 1
  return trial.name[weekday as keyof WeekdayName]
}

const getTrialNames = (trial: GenshinDomainTrial): string[] => {
  return typeof trial.name === 'string' ? [trial.name] : Object.values(trial.name)
}

export {
  DOMAIN_TYPES,
  getTrialName,
  getTrialNames,
  toTrials,
  toWeekday,
  type DomainType,
  type GenshinDomain,
  type GenshinDomainTrial,
}
