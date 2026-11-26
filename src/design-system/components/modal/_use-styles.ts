import { type CSSObject } from '@emotion/react'
import { useThemeService } from '../../services/theme-service'
import { CSS__FIXED_OVERLAY } from '../../utilities/css-utils'
import { ANIM_TIME, type ModalProps } from './_types'

interface Props extends ModalProps {
  isVisible: boolean
  stackIndex: number
}

export const useStyles = (props: Props) => {
  const { height, isVisible, noDismiss, noFooter, stackIndex, width } = props
  const { tokens } = useThemeService()

  const cssVars = {
    modalOverlayBgColor: noDismiss ? tokens.color['modal-overlay-strong'] : tokens.color['modal-overlay-subtle'],
    modalOverlayBlur: noDismiss ? `blur(${tokens.blur['default']})` : `blur(${tokens.blur['subtle']})`,
    modalMargin: tokens.spacing['xs-9'],
    modalCardPL: tokens.spacing['xs-9'],
    modalCardPR: tokens.spacing['xs-7'],
    modalCardPY: tokens.spacing['xs-5'],
    modalCardGapY: tokens.spacing['xs-5'],
    modalZIndex: `calc(${tokens.zIndex['modal']} + ${stackIndex})`,
    modalWidth: (() => {
      if (width === 'xs') return tokens.spacing['modal-xs']
      if (width === 'sm') return tokens.spacing['modal-sm']
      if (width === 'md') return tokens.spacing['modal-md']
      if (width === 'lg') return tokens.spacing['modal-lg']
      if (width === 'xl') return tokens.spacing['modal-xl']
      if (width === 'xxl') return tokens.spacing['modal-xxl']
      if (width === 'full') return '100%'
      return ''
    })(),
    modalHeight: (() => {
      if (height === 'fit') return 'fit-content'
      if (height === 'full') return '100%'
      return ''
    })(),
  }

  const modalCardCss: CSSObject = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: cssVars.modalCardGapY,
    minHeight: 0,
    width: '100%',
    maxWidth: cssVars.modalWidth,
    height: cssVars.modalHeight,
    maxHeight: '100%',
    margin: `0 auto`,
    padding: cssVars.modalCardPY,
    paddingLeft: cssVars.modalCardPL,
    paddingRight: cssVars.modalCardPR,
    border: `1px solid ${tokens.color['border-shadow']}`,
    borderRadius: tokens.radius['lg'],
    backgroundColor: tokens.color['bg-sheet'],
    boxShadow: tokens.shadow['md'],
    color: tokens.color['text-default'],
    transform: isVisible ? 'translateY(0)' : `translateY(calc(-2 * ${cssVars.modalMargin}))`,
    opacity: isVisible ? 1 : 0,
    transition: isVisible
      ? `transform ${ANIM_TIME.SHOW}ms ease-out, opacity ${ANIM_TIME.SHOW}ms ease-out`
      : `transform ${ANIM_TIME.HIDE}ms ease-in, opacity ${ANIM_TIME.HIDE}ms ease-in`,
  }
  const headerCss: CSSObject = {
    display: 'flex',
    alignItems: 'center',
    minHeight: tokens.spacing['field-h-md'],
    marginRight: tokens.spacing['field-h-md'],
    fontSize: tokens.fontSize['lg'],
    fontWeight: tokens.fontWeight['lg'],
    lineHeight: 1,
  }
  const modalBodyCss: CSSObject = {
    flex: '1 1 0%',
    minHeight: 0,
    marginLeft: `calc(-1 * ${cssVars.modalCardPL})`,
    marginRight: `calc(-1 * ${cssVars.modalCardPR})`,
    padding: `${tokens.spacing['a11y-padding']} 0`,
    paddingLeft: cssVars.modalCardPL,
    paddingRight: `calc(${cssVars.modalCardPR} - ${tokens.spacing['scrollbar-w']})`,
    overflowY: 'scroll',
  }
  const footerCss: CSSObject = {
    display: noFooter ? 'none' : 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  }
  const actionsCss: CSSObject = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing['xs-9'],
    marginLeft: 'auto',
  }
  const rootCss: CSSObject = {
    ...CSS__FIXED_OVERLAY,
    visibility: isVisible ? 'visible' : 'hidden',
    padding: cssVars.modalMargin,
    zIndex: cssVars.modalZIndex,
    transition: isVisible ? 'none' : `visibility ${ANIM_TIME.HIDE}ms`,
  }
  const overlayCss: CSSObject = {
    ...CSS__FIXED_OVERLAY,
    zIndex: -1,
    backgroundColor: cssVars.modalOverlayBgColor,
    backdropFilter: cssVars.modalOverlayBlur,
    opacity: isVisible ? 1 : 0,
    transition: isVisible ? `opacity ${ANIM_TIME.SHOW}ms ease-out` : `opacity ${ANIM_TIME.HIDE}ms ease-in`,
  }

  return {
    actionsCss,
    cssVars,
    footerCss,
    headerCss,
    modalBodyCss,
    modalCardCss,
    overlayCss,
    rootCss,
  }
}
