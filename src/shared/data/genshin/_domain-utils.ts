import { type GenshinDamageType, type GenshinNation, type GenshinResistanceType } from './_core'

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
  resTypes: GenshinResistanceType[]
}

const toWeekday = (monThu: string, tueFri: string, wedSat: string): WeekdayName => {
  return { 1: monThu, 2: tueFri, 3: wedSat, 4: monThu, 5: tueFri, 6: wedSat, 7: wedSat }
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
  toWeekday,
  type DomainType,
  type GenshinDomain,
  type GenshinDomainTrial,
}
