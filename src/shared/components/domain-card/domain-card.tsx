import { Image } from '@design-system'
import { GlobeIcon, SwordsIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getTrialName, getTrialNames } from '../../data'
import { useUserAssetsStore } from '../../state/use-user-assets'
import { useUserDataStore } from '../../state/use-user-data'
import { CardActions } from '../_shared/card-actions'
import { CardSection } from '../_shared/card-section'
import { CardTemplate } from '../_shared/card-template'
import { CharacterTrait } from '../_shared/character-trait'
import { NotesSection } from '../_shared/notes-section'
import { useDraft } from './_partials/use-draft'
import { type DomainCardProps } from './_types'

export { type DomainCardProps } from './_types'

export const DomainCard = (props: DomainCardProps) => {
  const { domain, opened = true, className, onClose } = props
  const { t } = useTranslation()
  const { getDomainImages, getNationIcons } = useUserAssetsStore()
  const userData = useUserDataStore((state) => state.userData?.genshin?.domains?.[domain.id])
  const nationIcons = getNationIcons()
  const { control, hasChanges, isEditing, handleClickDiscard, handleClickEdit, handleClickSave } = useDraft(props)

  const handleClickClose = () => {
    if (isEditing) handleClickDiscard()
    onClose?.()
  }

  useEffect(() => {
    if (!opened && isEditing) handleClickDiscard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, isEditing])

  return (
    <CardTemplate
      editing={isEditing}
      banner={
        <div className="bg-color-bg-skeleton relative flex aspect-2/1 overflow-hidden rounded-md">
          <Image
            srcs={getDomainImages(domain.id)}
            className="duration-sm relative size-full object-cover transition-transform ease-in hover:scale-110"
          />
        </div>
      }
      title={<h3>{domain.name}</h3>}
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
      classNames={{ content: 'min-h-[1200px]' }}
    >
      {/* TRAITS */}
      <CharacterTrait
        label={t(`game.nations.${domain.nation}`)}
        iconSrcs={nationIcons[domain.nation]}
        icon={
          domain.nation === 'other' ? (
            <GlobeIcon aria-hidden className="h-xs-7 w-xs-7 text-color-text-subtle" />
          ) : undefined
        }
        classNames={{ icon: 'brightness-40', label: 'text-color-text-subtle' }}
      />

      {/* THOUGHTS */}
      <NotesSection editing={isEditing} control={control} notes={userData?.notes} />

      {/* TRIALS */}
      <CardSection
        title={t('game.label.trials')}
        items={domain.trials.map((trial) => {
          const currentName = getTrialName(trial)
          const otherNames = [...new Set(getTrialNames(trial))].filter((name) => name !== currentName)
          return {
            key: trial.id,
            label: (
              <span className="gap-xs-2 flex leading-1">
                <SwordsIcon aria-hidden className="size-xs-7 text-color-text-subtle" />
                <span className="gap-xs-1 flex flex-col pt-px">
                  {otherNames.length > 0 ? (
                    <span className="gap-xs-2 flex flex-col">
                      <span>{currentName}</span>
                      {otherNames.map((name) => (
                        <span key={name} className="text-color-text-subtle text-size-xs">
                          {name}
                        </span>
                      ))}
                    </span>
                  ) : (
                    currentName
                  )}
                </span>
              </span>
            ),
            value: '',
          }
        })}
        className="mt-xs-5"
      />
    </CardTemplate>
  )
}
