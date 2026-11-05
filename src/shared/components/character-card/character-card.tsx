import { Card, Image, TextField } from '@design-system'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GENSHIN_ELEMENT_COLORS,
  GENSHIN_ELEMENT_ICONS,
  GENSHIN_NATION_ICONS,
  GENSHIN_WEAPON_ICONS,
} from '../../data/genshin/core'
import { TIER_LIST_LABELS } from '../../data/settings'
import { useStickyOnTop } from '../../utils/use-sticky-on-top'
import { CardActions } from '../_shared/card-actions'
import { CardBanner } from '../_shared/card-banner'
import { CardSection, type SectionItem } from '../_shared/card-section'
import { CharacterTrait } from '../_shared/character-trait'
import { CharacterAvatar } from '../character-avatar/character-avatar'
import { Tag } from '../tag/tag'
import { TierListField } from '../tier-list-field/tier-list-field'
import { useData } from './_partials/use-data'
import { useDraft } from './_partials/use-draft'
import { type CharacterCardProps } from './_types'

export { type CharacterCardProps }

export const CharacterCard = (props: CharacterCardProps) => {
  const { character, userData, userPrefs, opened = true, className, onClose } = props
  const { t } = useTranslation()
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

  const imageFilterClass = cx('pointer-events-none absolute inset-0 rounded-md brightness-20')

  return (
    <Card
      className={cx('w-xl-0', className)}
      classNames={{ surface: 'p-0!', content: 'flex flex-col' }}
      style={{ '--element-color': GENSHIN_ELEMENT_COLORS[character.element] }}
    >
      <div ref={scrollRef} className="p-xs-0 pb-xs-2! flex h-full flex-col overflow-y-auto">
        {/* BANNER */}
        <CardBanner
          banner={
            <>
              <div className={cx('bg-(--element-color)', imageFilterClass)} />
              <Image srcs={character.bannerUrls} className="pointer-events-none relative aspect-3/2 object-cover" />
              <div className={cx('shadow-[inset_0_0_1rem_var(--element-color)]', imageFilterClass)} />
            </>
          }
          editing={isEditing}
          userPrefs={userPrefs}
          ratingValue={draft.rating}
          statusValue={draft.status}
          onChangeRating={handleRatingChange}
          onChangeStatus={handleStatusChange}
        />

        {/* NAME */}
        <div
          ref={nameRef}
          className={cx(
            'my-xs-2 px-xs-8 py-xs-2 bg-color-bg-card -top-xs-0 sticky z-10 transition-[padding] ease-in-out',
            isNameSticky && 'border-color-border-subtle shadow-below-sm pl-sm-4!',
          )}
        >
          {isNameSticky && (
            <CharacterAvatar character={character} className="top-xs-4 left-xs-4 h-sm-0 w-sm-0 absolute!" />
          )}
          <h3 className="text-size-xl font-weight-lg h-field-h-md flex items-center">{character.name}</h3>
        </div>

        {/* CONTENT */}
        <div className="px-xs-8 pb-xs-4 gap-y-sm-2 flex flex-col">
          {/* TRAITS */}
          <div className="gap-x-xs-5 gap-y-xs-2 flex flex-wrap items-center justify-between">
            <CharacterTrait label={character.element} iconSrcs={GENSHIN_ELEMENT_ICONS[character.element]} />
            <CharacterTrait
              label={character.weapon}
              iconSrcs={GENSHIN_WEAPON_ICONS[character.weapon]}
              classNames={{ icon: 'brightness-90' }}
            />
            <CharacterTrait
              label={character.nation}
              iconSrcs={GENSHIN_NATION_ICONS[character.nation]}
              classNames={{ icon: 'brightness-40' }}
            />
          </div>

          {/* TAGS */}
          <CardSection title={t('game.label.tags')}>
            {isEditing ? (
              <TextField
                id="character-card-tags"
                size="xs"
                value={draft.tags}
                placeholder={t('game.placeholder.tags')}
                multiline
                onChange={handleTagsChange}
              />
            ) : userData?.tags?.length ? (
              <div className="gap-xs-1 min-h-field-h-xs flex flex-wrap">
                {userData.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            ) : (
              <span className="text-size-sm min-h-field-h-xs">--</span>
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
          {statSections.map(({ label: sectionLabel, path, rows }) => (
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
                      className="w-md-1"
                      onChange={(value) => handleStatChange(path, field, value)}
                    />
                  ) : (
                    <span className="text-size-sm font-weight-lg pr-xs-0">{value}</span>
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
