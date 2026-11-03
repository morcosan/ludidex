import { useSearchParams } from 'react-router'

export type FilterConfig = Record<string, readonly string[]>
export type FilterValues<T extends FilterConfig> = {
  [K in keyof T]: T[K][number][]
}

export const useFilterParams = <T extends FilterConfig>(config: T) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = _utils.parseFilters(searchParams, config)

  const handleFiltersChange = (newFilters: FilterValues<T>) => {
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

  parseFilters: <T extends FilterConfig>(params: URLSearchParams, config: T): FilterValues<T> => {
    return Object.fromEntries(
      Object.entries(config).map(([key, allValues]) => [key, _utils.parseValues(params.get(key), allValues)]),
    ) as unknown as FilterValues<T>
  },

  setValues: (params: URLSearchParams, key: string, values: readonly string[]) => {
    if (!values.length) {
      params.delete(key)
      return
    }
    params.set(key, values.join(','))
  },

  setFilterParams: <T extends FilterConfig>(params: URLSearchParams, config: T, filters: FilterValues<T>) => {
    Object.keys(config).forEach((key) => {
      _utils.setValues(params, key, filters[key as keyof T])
    })
  },
}
