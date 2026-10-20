import { Card, IconButton, Image, TextField } from '@design-system'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GenshinElementColor,
  GenshinElementIconUrls,
  GenshinNationIconUrls,
  GenshinWeaponIconUrls,
} from '../../data/genshin/core'
import { TIER_SCORES } from '../../data/settings'
import { LikeScore } from '../like-score/like-score'
import { Tag } from '../tag/tag'
import { TierScore } from '../tier-score/tier-score'
import { ActionBar } from './_partials/action-bar'
import { CharacterTrait } from './_partials/character-trait'
import { toNumber, useDataDraft } from './_partials/use-data-draft'
import {
  type CharacterPreviewProps,
  type GenshinStats,
  type GenshinTalents,
  type GenshinTierScores,
  type StatFieldConfig,
  type StatRow,
  type StatSection,
} from './_types'

export { type CharacterPreviewProps }

export const CharPreviewCard = (props: CharacterPreviewProps) => {
  const { character, userData, isOpen = true, className, onClose } = props
  const { t } = useTranslation()
  const { dataDraft, isEditing, handleCancel, handleDraftChange, handleEdit, handleSave } = useDataDraft(props)
  const scrollRef = useRef<HTMLDivElement>(null)

  const formatStat = (value?: number, suffix = '') => (value === undefined ? '--' : `${value}${suffix}`)

  const getDraftValue = (path: string | undefined, field: string) => {
    if (!path) return (dataDraft[field] as string | undefined) ?? ''
    const section = dataDraft[path]
    return typeof section === 'object' ? ((section[field] as string | undefined) ?? '') : ''
  }

  const talentFields: Record<keyof GenshinTalents, StatFieldConfig> = {
    conLv: { label: t('game.stats.constellation') },
    attackLv: { label: t('game.stats.normalAttack') },
    skillLv: { label: t('game.stats.elemSkill') },
    burstLv: { label: t('game.stats.elemBurst') },
  }

  const statFields: Record<keyof GenshinStats, StatFieldConfig> = {
    level: { label: t('game.label.level') },
    hp: { label: t('game.stats.hp') },
    atk: { label: t('game.stats.atk') },
    def: { label: t('game.stats.def') },
    em: { label: t('game.stats.em') },
    er: { label: t('game.stats.er'), percent: true },
    critRate: { label: t('game.stats.critRate'), percent: true },
    critDmg: { label: t('game.stats.critDmg'), percent: true },
    elemDmg: { label: t('game.stats.elemDmg', { element: character.element }), percent: true },
  }

  const tierFields: Record<keyof GenshinTierScores, string> = {
    mainDps: t('game.label.mainDps'),
    subDps: t('game.label.subDps'),
    support: t('game.label.support'),
    exploration: t('game.label.exploration'),
    outfit: t('game.label.outfitDesign'),
  }

  const buildStatRows = <T extends object>(data: T | undefined, fields: Record<keyof T, StatFieldConfig>): StatRow[] =>
    Object.entries(fields as Record<string, StatFieldConfig>).map(([field, { label, percent }]) => ({
      label,
      value: formatStat(data?.[field as keyof T] as number | undefined, percent ? '%' : ''),
      field,
      percent,
    }))

  const statSections: StatSection[] = [
    {
      label: t('game.label.talents'),
      path: 'talents',
      rows: buildStatRows(userData?.talents, talentFields),
    },
    {
      label: t('game.label.stats'),
      path: 'stats',
      rows: buildStatRows(userData?.stats, statFields),
    },
    {
      label: t('game.label.baseStats'),
      rows: [
        { label: t('game.stats.specialBonus'), value: character.bonusStat },
        {
          label: t('game.stats.normalAttackDmg'),
          value: character.na1HitDmg.map((value) => `${value}%`).join(' - '),
        },
      ],
    },
  ]

  useLayoutEffect(() => {
    if (!isEditing) return
    const element = scrollRef.current
    if (element) element.scrollTop = element.scrollHeight
  }, [isEditing])

  useEffect(() => {
    if (!isOpen && isEditing) handleCancel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isEditing])

  const handleClose = () => {
    if (isEditing) handleCancel()
    onClose?.()
  }

  const sectionClass = cx('text-size-xs pb-xs-2 text-color-text-placeholder tracking-wider uppercase')
  const gapYClass = cx('gap-y-sm-1')

  return (
    <Card
      className={cx('w-xl-0', className)}
      surfaceClassName="p-0!"
      contentClassName="flex flex-col"
      style={{ '--element-color': GenshinElementColor[character.element] }}
    >
      {/* CLOSE BUTTON */}
      {onClose && (
        <IconButton
          size="sm"
          variant="default"
          tooltip={t('ds.action.close')}
          className="bg-color-bg-card -top-xs-4 -right-xs-4 border-color-border-subtle absolute! z-10 border"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faXmark} aria-hidden className="text-size-md mt-xs-0" />
        </IconButton>
      )}

      <div ref={scrollRef} className="p-xs-0 flex h-full flex-col overflow-y-auto">
        {/* BANNER */}
        <div className="relative">
          <div className="absolute inset-0 rounded-md bg-(--element-color) brightness-20" />
          <Image src={character.bannerUrls} alt="" className="pointer-events-none relative aspect-3/2 object-cover" />
          <div
            className={cx(
              'pointer-events-none absolute rounded-md',
              'inset-0 shadow-[inset_0_0_1rem_var(--element-color)] brightness-20',
            )}
          />

          {/* LIKE SCORE */}
          <div
            className={cx(
              'top-xs-0 left-xs-0 bg-color-white absolute z-10 flex rounded-md',
              isEditing ? 'p-xs-2' : 'px-xs-2 py-xs-0',
            )}
          >
            {isEditing ? (
              <LikeScore
                value={toNumber(dataDraft.likeScore as string) || 0}
                editable
                onChange={(value) => handleDraftChange('likeScore')(String(value))}
              />
            ) : (
              <LikeScore value={userData?.likeScore || 0} />
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className={cx('px-xs-8 py-xs-4 flex flex-col', gapYClass)}>
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
          <div className="flex flex-col">
            <div className={sectionClass}>{t('game.label.tags')}</div>

            {isEditing ? (
              <TextField
                id="char-preview-card-tags"
                size="xs"
                value={dataDraft.tags as string}
                placeholder={t('game.placeholder.tags')}
                multiline
                onChange={handleDraftChange('tags')}
              />
            ) : userData?.tags?.length ? (
              <div className="gap-xs-1 flex flex-wrap">
                {userData.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            ) : (
              <span className="text-size-sm">--</span>
            )}
          </div>

          {/* TIER LISTS */}
          <div className="flex flex-col">
            <div className={sectionClass}>{t('game.label.tierLists')}</div>

            <div className="divide-color-border-subtle flex flex-col divide-y">
              {(Object.entries(tierFields) as [keyof GenshinTierScores, string][]).map(([field, label]) => {
                const index = isEditing ? toNumber(getDraftValue('tierScores', field)) : userData?.tierScores?.[field]
                const tier = index !== undefined ? TIER_SCORES[index] : undefined

                return (
                  <div key={field} className="gap-xs-2 py-xs-2 flex items-center justify-between">
                    <span className="text-size-sm">{label}</span>

                    {tier !== undefined || isEditing ? (
                      <TierScore
                        value={tier}
                        editable={isEditing}
                        onChange={(value) => handleDraftChange('tierScores', field)(String(TIER_SCORES.indexOf(value)))}
                      />
                    ) : (
                      <span className="text-size-sm font-weight-lg">--</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* STATS */}
          <div className={cx('flex flex-col', gapYClass)}>
            {statSections.map(({ label: sectionLabel, path, rows }) => (
              <div key={sectionLabel} className="divide-color-border-subtle flex flex-col divide-y">
                <div className={sectionClass}>{sectionLabel}</div>

                {rows.map(({ label, value, field, percent }) => (
                  <div key={label} className="gap-xs-2 py-xs-2 flex items-center justify-between">
                    <span className="text-size-sm">{label}</span>

                    {isEditing && field ? (
                      <TextField
                        id={`char-preview-card-${path ? `${path}-` : ''}${field}`}
                        size="xs"
                        value={getDraftValue(path, field)}
                        suffix={percent && <span className="text-size-xs text-color-text-placeholder mr-xs-2">%</span>}
                        className="w-md-1"
                        onChange={path ? handleDraftChange(path, field) : handleDraftChange(field)}
                      />
                    ) : (
                      <span className="text-size-sm font-weight-lg">{value}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <ActionBar editing={isEditing} onSave={handleSave} onCancel={handleCancel} onEdit={handleEdit} />
      </div>
    </Card>
  )
}
