import {
  GENSHIN_ELEMENTS,
  GENSHIN_NATIONS,
  GENSHIN_WEAPONS,
  type GenshinElement,
  type GenshinNation,
  type GenshinWeaponType,
} from '@app-shared/data/genshin/core'
import { useSearchParams } from 'react-router'

export interface CharacterFilters {
  elements: GenshinElement[]
  weapons: GenshinWeaponType[]
  nations: GenshinNation[]
}

export const ELEMENTS_URL_KEY = 'elements'
export const WEAPONS_URL_KEY = 'weapons'
export const NATIONS_URL_KEY = 'nations'

const parseValues = <T extends string>(value: string | null, allValues: readonly T[]): T[] => {
  const allowed = allValues as readonly string[]
  const values = (value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
  return [...new Set(values)].filter((item): item is T => allowed.includes(item))
}

const parseCharacterFilters = (params: URLSearchParams): CharacterFilters => ({
  elements: parseValues(params.get(ELEMENTS_URL_KEY), GENSHIN_ELEMENTS),
  weapons: parseValues(params.get(WEAPONS_URL_KEY), GENSHIN_WEAPONS),
  nations: parseValues(params.get(NATIONS_URL_KEY), GENSHIN_NATIONS),
})

const setValues = (params: URLSearchParams, key: string, values: readonly string[]): void => {
  if (!values.length) {
    params.delete(key)
    return
  }
  params.set(key, values.join(','))
}

const setCharacterFilterParams = (params: URLSearchParams, filters: CharacterFilters): void => {
  setValues(params, ELEMENTS_URL_KEY, filters.elements)
  setValues(params, WEAPONS_URL_KEY, filters.weapons)
  setValues(params, NATIONS_URL_KEY, filters.nations)
}

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = parseCharacterFilters(searchParams)

  const handleFiltersChange = (newFilters: CharacterFilters) => {
    setSearchParams((params) => {
      setCharacterFilterParams(params, newFilters)
      return params
    })
  }

  return { filters, handleFiltersChange }
}
