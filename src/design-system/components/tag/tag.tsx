import { type CSSObject } from '@emotion/react'
import { XIcon } from 'lucide-react'
import { type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemeService } from '../../services/theme-service'

export type TagSize = 'xs' | 'sm' | 'md'

export interface TagProps extends ReactProps {
  value: string
  size?: TagSize
  removable?: boolean
  className?: string
  style?: CSSProperties
  onRemove?: () => void
}

export const Tag = (props: TagProps) => {
  const { value, size = 'sm', removable, className, style, onRemove } = props
  const { t } = useTranslation()
  const { tokens } = useThemeService()

  const height = (() => {
    if (size === 'xs') return tokens.spacing['tag-h-xs']
    if (size === 'sm') return tokens.spacing['tag-h-sm']
    if (size === 'md') return tokens.spacing['tag-h-md']
    return ''
  })()
  const padding = (() => {
    if (size === 'xs') return tokens.spacing['xs-2']
    if (size === 'sm') return tokens.spacing['xs-3']
    if (size === 'md') return tokens.spacing['xs-4']
    return ''
  })()
  const rootCss: CSSObject = {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    height,
    backgroundColor: tokens.color['grey-3'],
    border: `1px solid ${tokens.color['grey-6']}`,
    borderRadius: tokens.radius.max,
    color: tokens.color['text-default'],
  }
  const valueCss: CSSObject = {
    padding: `0 ${padding}`,
    maxWidth: tokens.spacing['lg-5'],
    overflow: 'hidden',
    fontSize: tokens.fontSize.xs,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
  const removeCss: CSSObject = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: tokens.spacing['xs-8'],
    height: tokens.spacing['xs-8'],
    marginLeft: `calc(${tokens.spacing['xs-1']} * -1)`,
    borderRadius: tokens.radius.full,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tokens.color['hover-text-default'],
    },
  }
  const iconCss: CSSObject = {
    width: tokens.spacing['xs-6'],
    height: tokens.spacing['xs-6'],
  }

  return (
    <span className={className} style={style} css={rootCss}>
      <span css={valueCss}>{value}</span>

      {removable && (
        <button
          type="button"
          title={t('general.action.remove')}
          css={removeCss}
          onMouseDown={(event) => event.preventDefault()}
          onClick={onRemove}
        >
          <XIcon aria-hidden css={iconCss} />
        </button>
      )}
    </span>
  )
}
