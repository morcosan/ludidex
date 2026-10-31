import { useStickyOnTop } from '@app-shared/utils/use-sticky-on-top'
import { Card, Image, TextField } from '@design-system'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GenshinElementColor,
  GenshinElementIconUrls,
  GenshinNationIconUrls,
  GenshinWeaponIconUrls,
} from '../../data/genshin/core'
import {
  RATING_LABELS,
  RATING_VALUES,
  TIER_LIST_LABELS,
  TIER_LIST_VALUES,
  type CharacterStatus,
} from '../../data/settings'
import { CharacterAvatar } from '../character-avatar/character-avatar'
import { RatingField } from '../rating-field/rating-field'
import { StatusField } from '../status-field/status-field'
import { Tag } from '../tag/tag'
import { TierListField } from '../tier-list-field/tier-list-field'
import { Actions } from './_partials/actions'
import { CharacterTrait } from './_partials/character-trait'
import { StatsSection, type SectionItem } from './_partials/stats-section'
import { useData } from './_partials/use-data'
import { toNumber, useDraft } from './_partials/use-draft'
import { type CharacterCardProps } from './_types'

export { type CharacterCardProps }

export const CharacterCard = (props: CharacterCardProps) => {
  const { character, userData, userPrefs, isOpen = true, className, onClose } = props
  const { t } = useTranslation()
  const ratingLabels = { ...RATING_LABELS, ...userPrefs?.ratingLabels }
  const tierListLabels = { ...TIER_LIST_LABELS, ...userPrefs?.tierListLabels }
  const { statSections, tierFields } = useData(props)
  const {
    draft,
    hasChanges,
    isEditing,
    getDraftValue,
    handleClickDiscard,
    handleDraftChange,
    handleClickEdit,
    handleClickSave,
  } = useDraft(props)
  const scrollRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const isNameSticky = useStickyOnTop({ scrollRef, stickyRef: nameRef })

  useEffect(() => {
    if (!isOpen && isEditing) handleClickDiscard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isEditing])

  const handleClickClose = () => {
    if (isEditing) handleClickDiscard()
    onClose?.()
  }

  const imageFilterClass = cx('pointer-events-none absolute inset-0 rounded-md brightness-20')

  return (
    <Card
      className={cx('w-xl-0', className)}
      classNames={{ surface: 'p-0!', content: 'flex flex-col' }}
      style={{ '--element-color': GenshinElementColor[character.element] }}
    >
      <div ref={scrollRef} className="p-xs-0 pb-xs-2! flex h-full flex-col overflow-y-auto">
        {/* BANNER */}
        <div className="relative">
          <div className={cx('bg-(--element-color)', imageFilterClass)} />
          <Image srcs={character.bannerUrls} alt="" className="pointer-events-none relative aspect-3/2 object-cover" />
          <div className={cx('shadow-[inset_0_0_1rem_var(--element-color)]', imageFilterClass)} />

          <div className="top-xs-0 left-xs-0 right-xs-0 gap-y-xs-0 absolute z-10 flex flex-col">
            {/* RATING */}
            <div className="px-xs-2 py-xs-0 bg-color-white max-w-fit rounded-md">
              <RatingField
                value={RATING_VALUES.find((rating) => rating === toNumber(draft.rating))}
                labels={ratingLabels}
                readonly={!isEditing}
                className={cx(isEditing ? 'w-md-6 my-xs-1' : 'mr-xs-0')}
                onChange={(value) => handleDraftChange('rating' satisfies keyof typeof draft)(String(value))}
              />
            </div>

            {/* STATUS */}
            <div className="px-xs-2 py-xs-0 bg-color-white max-w-fit rounded-md">
              <StatusField
                value={isEditing ? (draft.status as CharacterStatus | undefined) : userData?.status}
                readonly={!isEditing}
                className={cx(isEditing ? 'my-xs-1 w-md-6' : 'mr-xs-0')}
                onChange={(value) => handleDraftChange('status' satisfies keyof typeof draft)(value ?? '')}
              />
            </div>
          </div>
        </div>

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
          <span className="text-size-xl font-weight-lg">{character.name}</span>
        </div>

        {/* CONTENT */}
        <div className="px-xs-8 pb-xs-4 gap-y-sm-2 flex flex-col">
          {/* TRAITS */}
          <div className="gap-x-xs-5 gap-y-xs-2 flex flex-wrap items-center justify-between">
            <CharacterTrait label={character.element} icon={GenshinElementIconUrls[character.element][0]} />
            <CharacterTrait
              label={character.weapon}
              icon={GenshinWeaponIconUrls[character.weapon][0]}
              classNames={{ icon: 'brightness-90' }}
            />
            <CharacterTrait
              label={character.nation}
              icon={GenshinNationIconUrls[character.nation][0]}
              classNames={{ icon: 'brightness-40' }}
            />
          </div>

          {/* TAGS */}
          <StatsSection title={t('game.label.tags')}>
            {isEditing ? (
              <TextField
                id="character-card-tags"
                size="xs"
                value={draft.tags as string}
                placeholder={t('game.placeholder.tags')}
                multiline
                onChange={handleDraftChange('tags' satisfies keyof typeof draft)}
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
          </StatsSection>

          {/* TIER LISTS */}
          <StatsSection
            title={t('game.label.tierLists')}
            items={Object.entries(tierFields).map(([field, label]): SectionItem => {
              return {
                label,
                value: (
                  <TierListField
                    value={TIER_LIST_VALUES.find(
                      (tier) => tier === getDraftValue('tierLists' satisfies keyof typeof draft, field),
                    )}
                    labels={tierListLabels}
                    readonly={!isEditing}
                    iconPos="right"
                    className="w-md-5"
                    onChange={(value) =>
                      handleDraftChange('tierLists' satisfies keyof typeof draft, field)(value ?? '')
                    }
                  />
                ),
              }
            })}
          />

          {/* STATS */}
          {statSections.map(({ label: sectionLabel, path, rows }) => (
            <StatsSection
              key={sectionLabel}
              title={sectionLabel}
              items={rows.map(({ label, value, field, percent }): SectionItem => ({
                label,
                value:
                  isEditing && field ? (
                    <TextField
                      id={`character-card-${path}-${field}`}
                      size="xs"
                      value={getDraftValue(path, field)}
                      suffix={percent && <span className="text-size-xs text-color-text-placeholder mr-xs-2">%</span>}
                      className="w-md-1"
                      onChange={path ? handleDraftChange(path, field) : handleDraftChange(field)}
                    />
                  ) : (
                    <span className="text-size-sm font-weight-lg pr-xs-0">{value}</span>
                  ),
              }))}
            />
          ))}
        </div>

        <Actions
          isEditing={isEditing}
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
