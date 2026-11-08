import { type GenshinCharacter } from '../data/genshin'
import { RATING_LABELS, type RatingValue } from '../data/settings'
import { type CharacterLabel, type GenshinUserData, type UserPrefs } from '../state/types'
import { useTranslation } from 'react-i18next'
import { formatInteger, formatPercent } from './various'

interface CharacterLabelProps {
  userData?: GenshinUserData
  userPrefs?: UserPrefs
}

export const useCharacterLabel = (props: CharacterLabelProps) => {
  const { userData, userPrefs } = props
  const { t } = useTranslation()
  const ratingLabels = { ...RATING_LABELS, ...userPrefs?.ratingLabels }

  const getLabel = (character: GenshinCharacter, label: CharacterLabel | null): string | undefined => {
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

  return { getLabel }
}
