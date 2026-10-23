import { Card, IconButton, Image, TextField } from '@design-system'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CheckCheckIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GenshinElementColor,
  GenshinElementIconUrls,
  GenshinNationIconUrls,
  GenshinWeaponIconUrls,
} from '../../data/genshin/core'
import { LikeScore } from '../like-score/like-score'
import { Tag } from '../tag/tag'
import { TierScore } from '../tier-score/tier-score'
import { CharacterTrait } from './_partials/character-trait'
import { StatsSection, type SectionItem } from './_partials/stats-section'
import { useData } from './_partials/use-data'
import { toNumber, useDraft } from './_partials/use-draft'
import { type CharacterCardProps } from './_types'

export { type CharacterCardProps }

export const CharacterCard = (props: CharacterCardProps) => {
  const { character, userData, isOpen = true, className, onClose } = props
  const { t } = useTranslation()
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
      surfaceClassName="p-0!"
      contentClassName="flex flex-col"
      style={{ '--element-color': GenshinElementColor[character.element] }}
    >
      <div className="p-xs-0 pb-xs-2! flex h-full flex-col overflow-y-auto">
        {/* BANNER */}
        <div className="relative">
          <div className={cx('bg-(--element-color)', imageFilterClass)} />
          <Image srcs={character.bannerUrls} alt="" className="pointer-events-none relative aspect-3/2 object-cover" />
          <div className={cx('shadow-[inset_0_0_1rem_var(--element-color)]', imageFilterClass)} />

          {/* LIKE SCORE */}
          <div className="top-xs-0 left-xs-0 bg-color-white px-xs-2 py-xs-0 absolute z-10 flex rounded-md">
            <LikeScore
              value={toNumber(draft.likeScore as string) || 0}
              editable={isEditing}
              className={cx(isEditing && 'my-xs-1')}
              onChange={(value) => handleDraftChange('likeScore')(String(value))}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-xs-8 py-xs-4 gap-y-sm-2 flex flex-col">
          {/* HEADER */}
          <div className="gap-y-xs-5 flex flex-col">
            {/* NAME */}
            <span className="text-size-xl font-weight-lg">{character.name}</span>
            {/* TRAITS */}
            <div className="gap-x-xs-5 gap-y-xs-2 flex flex-wrap items-center justify-between">
              <CharacterTrait label={character.element} icon={GenshinElementIconUrls[character.element][0]} />
              <CharacterTrait
                label={character.weapon}
                icon={GenshinWeaponIconUrls[character.weapon][0]}
                iconClass="brightness-90"
              />
              <CharacterTrait
                label={character.nation}
                icon={GenshinNationIconUrls[character.nation][0]}
                iconClass="brightness-40"
              />
            </div>
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
                onChange={handleDraftChange('tags')}
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
                  <TierScore
                    value={toNumber(getDraftValue('tierScores', field)) || 0}
                    editable={isEditing}
                    onChange={(value) => handleDraftChange('tierScores', field)(String(value))}
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

        {/* CLOSE / DISCARD BUTTON */}
        {isEditing && hasChanges ? (
          <IconButton
            size="md"
            variant="caution"
            tooltip={t('general.action.discardChanges')}
            className="-top-xs-5 -right-xs-6 absolute! z-10"
            floating
            onClick={handleClickDiscard}
          >
            <FontAwesomeIcon icon={faTrashCan} aria-hidden className="text-size-md text-color-button-caution-text" />
          </IconButton>
        ) : (
          <IconButton
            size="md"
            variant="default"
            tooltip={t('ds.action.close')}
            className="-top-xs-5 -right-xs-6 absolute! z-10"
            floating
            onClick={handleClickClose}
          >
            <FontAwesomeIcon icon={faXmark} aria-hidden className="text-size-md mt-xs-0" />
          </IconButton>
        )}

        {/* EDIT / SAVE BUTTON */}
        {isEditing ? (
          <IconButton
            size="md"
            variant="primary"
            tooltip={t('general.action.saveChanges')}
            className="top-sm-5 -right-xs-6 absolute! z-10"
            floating
            onClick={handleClickSave}
          >
            <CheckCheckIcon aria-hidden className="h-sm-0 w-sm-0" />
          </IconButton>
        ) : (
          <IconButton
            size="md"
            variant="default"
            tooltip={t('general.action.edit')}
            className="top-sm-5 -right-xs-6 absolute! z-10"
            floating
            onClick={handleClickEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} aria-hidden className="text-size-md" />
          </IconButton>
        )}
      </div>
    </Card>
  )
}
