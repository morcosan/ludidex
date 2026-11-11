import { type Filters } from '@app-shared/components'
import { useSearchParams } from 'react-router'

type FilterKey = keyof Omit<Filters, 'search'>

export type FilterConfig = {
  [K in FilterKey]?: readonly NonNullable<Filters[K]>[number][]
}

export type FilterParams = Filters & { search: string }

export const useFilterParams = (config: FilterConfig) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = _utils.parseFilters(searchParams, config)

  const handleFiltersChange = (newFilters: Filters) => {
    setSearchParams((params) => {
      _utils.setFilterParams(params, config, newFilters)
      return params
    })
  }

  return { filters, handleFiltersChange }
}

const _utils = {
  parseValues: <T extends string>(value: string | null, allValues: readonly T[]): T[] => {
    const allowed = allValues as readonly string[]
    const values = (value ?? '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    return [...new Set(values)].filter((item): item is T => allowed.includes(item))
  },

  parseFilters: (params: URLSearchParams, config: FilterConfig): FilterParams => {
    const filters = Object.fromEntries(
      Object.entries(config).map(([key, allValues]) => [
        key,
        _utils.parseValues(params.get(key), allValues ?? []),
      ]),
    ) as unknown as FilterParams

    filters.search = params.get('search') ?? ''
    return filters
  },

  setValue: (params: URLSearchParams, key: string, value: string) => {
    if (!value) {
      params.delete(key)
      return
    }
    params.set(key, value)
  },

  setValues: (params: URLSearchParams, key: string, values: readonly string[]) => {
    _utils.setValue(params, key, values.join(','))
  },

  setFilterParams: (params: URLSearchParams, config: FilterConfig, filters: Filters) => {
    Object.keys(config).forEach((key) => {
      const values = filters[key as FilterKey]
      if (values === undefined) return
      _utils.setValues(params, key, values)
    })

    if (filters.search !== undefined) {
      _utils.setValue(params, 'search', filters.search)
    }
  },
}
