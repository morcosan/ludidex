import { TextField } from '@design-system'
import { GlobeIcon } from 'lucide-react'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TIER_LIST_LABELS, type TierListValue } from '../../data'
import { useUserAssetsStore } from '../../state/use-user-assets'
import { useUserDataStore } from '../../state/use-user-data'
import { CardActions } from '../_shared/card-actions'
import { CardSection, type SectionItem } from '../_shared/card-section'
import { CardTemplate } from '../_shared/card-template'
import { CharacterTrait } from '../_shared/character-trait'
import { TagsSection } from '../_shared/tags-section'
import { CharacterAvatar } from '../character-avatar/character-avatar'
import { TierListField } from '../tier-list-field/tier-list-field'
import { BannerImage } from './_partials/banner-image'
import { useDataRows } from './_partials/use-data-rows'
import { useDraft } from './_partials/use-draft'
import { type CharacterDraft } from './_partials/use-draft-utils'
import { type CharacterCardProps, type DataFieldName } from './_types'

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
  const { dataSections, tierListRows } = useDataRows(props)
  const { control, hasChanges, isEditing, handleClickDiscard, handleClickEdit, handleClickSave } = useDraft(props)

  useEffect(() => {
    if (!opened && isEditing) handleClickDiscard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, isEditing])

  const handleClickClose = () => {
    if (isEditing) handleClickDiscard()
    onClose?.()
  }

  return (
    <CardTemplate
      editing={isEditing}
      control={control}
      fieldNames={['rating', 'status'] satisfies (keyof CharacterDraft)[]}
      banner={<BannerImage character={character} editing={isEditing} />}
      title={(sticky) => (
        <>
          {sticky && <CharacterAvatar character={character} className="top-xs-3 left-xs-2 size-sm-3 absolute! mt-px" />}
          <div className={cx('transition-[padding] ease-out', sticky && '-ml-xs-8 pl-sm-6')}>
            <h3>{character.name}</h3>
            <div className="text-size-xs text-color-text-subtle pb-xs-0 truncate px-px leading-1">
              {character.fullName}
            </div>
          </div>
        </>
      )}
      actions={
        <CardActions
          editing={isEditing}
          hasChanges={hasChanges}
          onDiscard={handleClickDiscard}
          onClose={handleClickClose}
          onSave={handleClickSave}
          onEdit={handleClickEdit}
        />
      }
      className={className}
    >
      {/* TRAITS */}
      <div className="gap-x-xs-5 gap-y-xs-2 mt-xs-3 flex flex-wrap items-center justify-between">
        <CharacterTrait label={t(`game.elements.${character.element}`)} iconSrcs={elementIcons[character.element]} />
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
      <TagsSection editing={isEditing} control={control} tags={userData?.tags} />

      {/* TIER LISTS */}
      <CardSection
        title={t('game.label.tierLists')}
        items={tierListRows.map(({ name, label }): SectionItem => {
          return {
            key: name,
            label,
            value: (
              <Controller
                control={control}
                name={`tierLists.${name}`}
                render={({ field: tierField }) => (
                  <TierListField
                    value={(tierField.value as TierListValue | null) ?? undefined}
                    labels={tierListLabels}
                    readonly={!isEditing}
                    iconPos="right"
                    className="w-md-6"
                    onChange={(value) => tierField.onChange(value ?? null)}
                  />
                )}
              />
            ),
          }
        })}
      />

      {/* STATS */}
      {dataSections.map(({ label: sectionLabel, rows, path, mono }) => (
        <CardSection
          key={sectionLabel}
          title={sectionLabel}
          items={rows.map(({ name, label, value, percent }): SectionItem => ({
            key: name ?? label,
            label,
            value:
              isEditing && path && name ? (
                <Controller
                  control={control}
                  name={`${path}.${name}` as DataFieldName}
                  render={({ field: statField }) => (
                    <TextField
                      id={`character-card-${path}-${name}`}
                      size="xs"
                      value={statField.value ?? undefined}
                      suffix={percent && <span className="text-size-xs text-color-text-placeholder mr-xs-2">%</span>}
                      className="w-md-1 [&_input]:font-family-mono"
                      onChange={statField.onChange}
                    />
                  )}
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
    </CardTemplate>
  )
}
