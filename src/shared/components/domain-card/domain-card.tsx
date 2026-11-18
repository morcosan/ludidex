import { Image } from '@design-system'
import { GlobeIcon, SwordsIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { type GenshinDomain } from '../../data'
import { useUserAssetsStore } from '../../state/use-user-assets'
import { CardSection } from '../_shared/card-section'
import { CardTemplate } from '../_shared/card-template'
import { CharacterTrait } from '../_shared/character-trait'

export interface DomainCardProps extends ReactProps {
  domain: GenshinDomain
  className?: string
}

export const DomainCard = (props: DomainCardProps) => {
  const { domain, className } = props
  const { t } = useTranslation()
  const { getDomainImages, getNationIcons } = useUserAssetsStore()
  const nationIcons = getNationIcons()
  return (
    <CardTemplate
      banner={
        <div className="bg-color-bg-skeleton relative flex aspect-2/1 overflow-hidden rounded-md">
          <Image
            srcs={getDomainImages(domain.id)}
            className="duration-sm relative size-full object-cover transition-transform ease-in hover:scale-110"
          />
        </div>
      }
      title={<h3>{domain.name}</h3>}
      className={className}
      classNames={{ content: 'min-h-[1200px]' }}
    >
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

      <CardSection
        title={t('game.label.trials')}
        items={domain.trials.map((trial) => ({
          key: trial.id,
          label: (
            <span className="gap-xs-2 flex items-center leading-1">
              <SwordsIcon aria-hidden className="size-xs-7 text-color-text-subtle" />
              {trial.name}
            </span>
          ),
          value: '',
        }))}
        className="mt-xs-5"
      />
    </CardTemplate>
  )
}
