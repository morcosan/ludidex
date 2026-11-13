import { useTranslation } from 'react-i18next'
import { RATING_LABELS, type GenshinCharacter, type RatingValue } from '../data'
import { type CharacterLabel } from '../state/types'
import { useUserDataStore } from '../state/use-user-data'
import { formatInteger, formatPercent } from './various'

export const useCharacterLabel = () => {
  const userData = useUserDataStore((state) => state.userData?.genshin)
  const userPrefs = useUserDataStore((state) => state.userData?.preferences)
  const { t } = useTranslation()
  const ratingLabels = { ...RATING_LABELS, ...userPrefs?.ratingLabels }

  const getCharLabel = (character: GenshinCharacter, label: CharacterLabel | null): string | undefined => {
    if (!label) return undefined

    const data = userData?.characters?.[character.id]

    if (label === 'status') return data?.status ? t(`game.label.${data.status}`) : undefined
    if (label === 'rating')
      return data?.rating
        ? t('game.format.rating', {
            value: data.rating,
            label: ratingLabels[data.rating as RatingValue],
          })
        : undefined

    const value = data?.stats?.[label]
    if (value === undefined) return undefined

    const isPercent = label === 'er' || label === 'critRate' || label === 'critDmg'
    const formatted = isPercent ? formatPercent(value, true) : formatInteger(value, true)
    return t(`game.format.${label}`, { value: formatted })
  }

  return { getCharLabel }
}
