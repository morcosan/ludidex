import { Card, Image, Tag, TextField } from '@design-system'
import { GlobeIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { GENSHIN_ELEMENT_COLORS, TIER_LIST_LABELS } from '../../data'
import { useUserAssetsStore } from '../../state/use-user-assets'
import { useUserDataStore } from '../../state/use-user-data'
import { useStickyOnTop } from '../../utils/use-sticky-on-top'
import { CardActions } from '../_shared/card-actions'
import { CardBanner } from '../_shared/card-banner'
import { CardSection, type SectionItem } from '../_shared/card-section'
import { CharacterTrait } from '../_shared/character-trait'
import { CharacterAvatar } from '../character-avatar/character-avatar'
import { TierListField } from '../tier-list-field/tier-list-field'
import { useData } from './_partials/use-data'
import { useDraft } from './_partials/use-draft'
import { type CharacterCardProps } from './_types'

export { type CharacterCardProps }

export const CharacterCard = (props: CharacterCardProps) => {
  const { character, opened = true, className, onClose } = props
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData?.genshin?.characters?.[character.id])
  const userPrefs = useUserDataStore((state) => state.userData?.preferences)
  const { getElementIcons, getWeaponIcons, getNationIcons, getCharacterBanners } = useUserAssetsStore()
  const elementIcons = getElementIcons()
  const weaponIcons = getWeaponIcons()
  const nationIcons = getNationIcons()
  const bannerSrcs = getCharacterBanners(character.id)
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

  const imageFilterClass = cx('pointer-events-none absolute inset-0 brightness-20')

  return (
    <Card
      className={cx('w-character-card', className)}
      classNames={{ surface: 'p-0!', content: 'flex flex-col' }}
      style={{ '--element-color': GENSHIN_ELEMENT_COLORS[character.element] }}
    >
      <div ref={scrollRef} className="p-xs-0 pb-xs-2! flex h-full flex-col overflow-y-auto">
        {/* BANNER */}
        <CardBanner
          banner={
            <div className="relative flex aspect-4/3 overflow-hidden rounded-md">
              <div className={cx('bg-(--element-color)', imageFilterClass)} />
              <Image
                srcs={bannerSrcs}
                className={cx(
                  'relative size-full object-cover',
                  !isEditing && 'duration-sm transition-transform ease-in hover:scale-125',
                )}
              />
              <div className={cx('shadow-[inset_0_0_1rem_var(--element-color)]', imageFilterClass)} />
            </div>
          }
          editing={isEditing}
          ratingValue={draft.rating}
          statusValue={draft.status}
          onChangeRating={handleRatingChange}
          onChangeStatus={handleStatusChange}
        />

        {/* NAME */}
        <div
          ref={nameRef}
          className={cx(
            'my-xs-2 -top-xs-0 px-xs-8 py-xs-2 sticky z-10',
            'bg-color-bg-card rounded-t-md transition-[padding] ease-in-out',
            isNameSticky && 'border-color-border-subtle shadow-below-sm pl-sm-4!',
          )}
        >
          {isNameSticky && (
            <CharacterAvatar character={character} className="top-xs-5 left-xs-4 h-sm-0 w-sm-0 absolute!" />
          )}
          <h3 className="text-size-xl font-weight-lg h-field-h-md flex items-center">{character.name}</h3>
          {!isNameSticky && (
            <div className="text-size-xs text-color-text-subtle pb-xs-4 px-px leading-1">{character.fullName}</div>
          )}
        </div>

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
                  <Tag key={tag} value={tag} />
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
