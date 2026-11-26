import { type GenshinNation } from './_core'

type DomainType = 'trounce' | 'blessing' | 'forgery' | 'mastery' | 'onetime'
const DOMAIN_TYPES: DomainType[] = ['trounce', 'blessing', 'forgery', 'mastery', 'onetime']

type GenshinDomain = {
  id: string
  name: string
  nation: GenshinNation
  type: DomainType
  trials: GenshinDomainTrial[]
}
type GenshinDomainTrial = {
  id: string
  name: string | WeekdayName
}
type WeekdayName = { 1: string; 2: string; 3: string; 4: string; 5: string; 6: string; 7: string }
type GenshinDomainConfig = {
  id: string
  name: string
  nation: GenshinNation
  type: DomainType
  trials: GenshinDomainTrialConfig[]
}
type GenshinDomainTrialConfig =
  | {
      levels: number
      name: string | WeekdayName
    }
  | {
      key: string
      name: string
    }

const toWeekday = (monThu: string, tueFri: string, wedSat: string): WeekdayName => {
  return { 1: monThu, 2: tueFri, 3: wedSat, 4: monThu, 5: tueFri, 6: wedSat, 7: wedSat }
}

const computeTrials = (domain: GenshinDomainConfig): GenshinDomainTrial[] => {
  const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const
  const TRIAL_ID = '{domainId}_{trialKey}'
  const toRoman = (level: number): string => ROMAN_NUMERALS[level - 1] ?? String(level)
  const toTrialId = (key: string) => TRIAL_ID.replace('{domainId}', domain.id).replace('{trialKey}', key)

  return domain.trials.flatMap((trial): GenshinDomainTrial[] => {
    return 'key' in trial
      ? [{ id: toTrialId(trial.key), name: trial.name }]
      : Array.from({ length: trial.levels }, (_, index) => {
          const level = index + 1
          const numeral = toRoman(level)
          const name =
            typeof trial.name === 'string'
              ? `${trial.name} ${numeral}`
              : {
                  1: `${trial.name[1]} ${numeral}`,
                  2: `${trial.name[2]} ${numeral}`,
                  3: `${trial.name[3]} ${numeral}`,
                  4: `${trial.name[4]} ${numeral}`,
                  5: `${trial.name[5]} ${numeral}`,
                  6: `${trial.name[6]} ${numeral}`,
                  7: `${trial.name[7]} ${numeral}`,
                }
          return { id: toTrialId(String(level)), name }
        })
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
  computeTrials,
  DOMAIN_TYPES,
  getTrialName,
  getTrialNames,
  toWeekday,
  type DomainType,
  type GenshinDomain,
  type GenshinDomainConfig,
  type GenshinDomainTrial,
  type GenshinDomainTrialConfig,
}
