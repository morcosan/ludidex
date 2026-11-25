import type { GenshinDomain } from '../../data'
import type { GenshinDomainUserData } from '../../state/types'

export interface DomainCardProps extends ReactProps {
  domain: GenshinDomain
  opened?: boolean
  className?: string
  onSave?: (data: GenshinDomainUserData) => void
  onClose?: () => void
}
