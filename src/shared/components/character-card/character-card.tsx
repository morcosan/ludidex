import { Card, Tag, TagsField, TextField } from '@design-system'
import { GlobeIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TIER_LIST_LABELS } from '../../data'
import { useUserAssetsStore } from '../../state/use-user-assets'
import { useUserDataStore } from '../../state/use-user-data'
import { useStickyOnTop } from '../../utils/use-sticky-on-top'
import { parseInput, parseTag, useUserTags } from '../../utils/use-user-tags'
import { CardActions } from '../_shared/card-actions'
import { CardBanner } from '../_shared/card-banner'
import { CardSection, type SectionItem } from '../_shared/card-section'
import { CharacterTrait } from '../_shared/character-trait'
import { TierListField } from '../tier-list-field/tier-list-field'
import { BannerImage } from './_partials/banner-image'
import { CharacterName } from './_partials/character-name'
import { useData } from './_partials/use-data'
import { useDraft } from './_partials/use-draft'
import { type CharacterCardProps } from './_types'

export { type CharacterCardProps }

export const CharacterCard = (props: CharacterCardProps) => {
  const { character, opened = true, className, onClose } = props
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData?.genshin?.characters?.[character.id])
  const userPrefs = useUserDataStore((state) => state.userData?.preferences)
  const { getElementIcons, getWeaponIcons, getNationIcons } = useUserAssetsStore()
  const elementIcons = getElementIcons()
  const weaponIcons = getWeaponIcons()
  const nationIcons = getNationIcons()
  const tierListLabels = { ...TIER_LIST_LABELS, ...userPrefs?.tierListLabels }
  const { statSections, tierFields } = useData(props)
  const {
    draft,
    hasChanges,
    isEditing,
    getStatValue,
    handleRatingChange,
    handleStatusChange,
    handleTagsChange,
    handleTierListChange,
    handleStatChange,
    handleClickDiscard,
    handleClickEdit,
    handleClickSave,
  } = useDraft(props)
  const { getTagStyle, tagOptions } = useUserTags()
  const scrollRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const isNameSticky = useStickyOnTop({ scrollRef, stickyRef: nameRef })

  useEffect(() => {
    if (!opened && isEditing) handleClickDiscard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, isEditing])

  const handleClickClose = () => {
    if (isEditing) handleClickDiscard()
    onClose?.()
  }

  return (
    <Card className={cx('w-character-card', className)} classNames={{ surface: 'p-0!', content: 'flex flex-col' }}>
      <div ref={scrollRef} className="p-xs-0 pb-xs-2! flex h-full flex-col overflow-y-auto">
        {/* BANNER */}
        <CardBanner
          banner={<BannerImage character={character} editing={isEditing} />}
          editing={isEditing}
          ratingValue={draft.rating}
          statusValue={draft.status}
          onChangeRating={handleRatingChange}
          onChangeStatus={handleStatusChange}
        />

        {/* NAME */}
        <CharacterName ref={nameRef} character={character} sticky={isNameSticky} />

        {/* CONTENT */}
        <div className="px-xs-8 pb-xs-4 gap-y-sm-2 flex flex-col">
          {/* TRAITS */}
          <div className="gap-x-xs-5 gap-y-xs-2 flex flex-wrap items-center justify-between">
            <CharacterTrait
              label={t(`game.elements.${character.element}`)}
              iconSrcs={elementIcons[character.element]}
            />
            <CharacterTrait
              label={t(`game.weapons.${character.weapon}`)}
              iconSrcs={weaponIcons[character.weapon]}
              classNames={{ icon: 'brightness-90' }}
            />
            <CharacterTrait
              label={t(`game.nations.${character.nation}`)}
              iconSrcs={nationIcons[character.nation]}
              icon={
                character.nation === 'other' ? (
                  <GlobeIcon aria-hidden className="h-xs-7 w-xs-7 text-color-text-subtle" />
                ) : undefined
              }
              classNames={{ icon: 'brightness-40' }}
            />
          </div>

          {/* TAGS */}
          <CardSection title={t('game.label.tags')} classNames={{ body: 'min-h-field-h-sm' }}>
            {isEditing ? (
              <TagsField
                id="character-card-tags"
                size="sm"
                value={draft.tags}
                options={tagOptions}
                getTagStyle={getTagStyle}
                parseTag={parseTag}
                parseInput={parseInput}
                onChange={handleTagsChange}
              />
            ) : userData?.tags?.length ? (
              <div className="gap-xs-1 flex flex-wrap">
                {userData.tags.map((tag) => (
                  <Tag key={tag} value={tag} style={getTagStyle(tag)} />
                ))}
              </div>
            ) : (
              <span className="text-size-sm">--</span>
            )}
          </CardSection>

          {/* TIER LISTS */}
          <CardSection
            title={t('game.label.tierLists')}
            items={tierFields.map(({ field, label }): SectionItem => {
              return {
                label,
                value: (
                  <TierListField
                    value={draft.tierLists[field]}
                    labels={tierListLabels}
                    readonly={!isEditing}
                    iconPos="right"
                    className="w-md-6"
                    onChange={(value) => handleTierListChange(field, value)}
                  />
                ),
              }
            })}
          />

          {/* STATS */}
          {statSections.map(({ label: sectionLabel, rows, path, mono }) => (
            <CardSection
              key={sectionLabel}
              title={sectionLabel}
              items={rows.map(({ label, value, field, percent }): SectionItem => ({
                label,
                value:
                  isEditing && path && field ? (
                    <TextField
                      id={`character-card-${path}-${field}`}
                      size="xs"
                      value={getStatValue(path, field)}
                      suffix={percent && <span className="text-size-xs text-color-text-placeholder mr-xs-2">%</span>}
                      className="w-md-1 [&_input]:font-family-mono"
                      onChange={(value) => handleStatChange(path, field, value)}
                    />
                  ) : (
                    <span className="text-size-sm font-weight-md pr-xs-0">
                      <span className={cx(mono && value !== '--' && 'font-family-mono')}>{value}</span>
                      {percent && value !== '--' && <span className="ml-px">%</span>}
                    </span>
                  ),
              }))}
            />
          ))}
        </div>

        <CardActions
          editing={isEditing}
          hasChanges={hasChanges}
          onDiscard={handleClickDiscard}
          onClose={handleClickClose}
          onSave={handleClickSave}
          onEdit={handleClickEdit}
        />
      </div>
    </Card>
  )
}
