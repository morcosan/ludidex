import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CheckCheckIcon, Undo2Icon } from 'lucide-react'
import { useId } from 'react'
import { useI18nService } from '../../services/i18n-service'
import { useDataProps } from '../../utilities/react-utils'
import { ReactPortal } from '../_shared/react-portal'
import { Button } from '../button/button'
import { IconButton } from '../icon-button/icon-button'
import { type ModalProps } from './_types'
import { useEvents } from './_use-events'
import { useStyles } from './_use-styles'

export type { ModalProps, ModalWidth } from './_types'

/** Basic modal component */
export const Modal = (props: ModalProps) => {
  const {
    actions,
    children,
    editable,
    editing,
    extras,
    height = 'fit',
    noClose,
    noDismiss,
    onClose,
    title,
    width = 'md',
    classNames,
    onEdit,
    onSave,
    onDiscard,
  } = props
  const { translate } = useI18nService()
  const { focusTrap1Ref, focusTrap2Ref, isMounted, isVisible, modalRef, stackIndex } = useEvents({
    ...props,
    width,
    height,
  })
  const { modalCardCss, actionsCss, modalBodyCss, footerCss, headerCss, overlayCss, rootCss } = useStyles({
    ...props,
    height,
    isVisible,
    stackIndex,
    width,
  })
  const dataProps = useDataProps(props)
  const modalId = useId()

  return (
    <ReactPortal>
      <div css={rootCss} {...dataProps}>
        {/* OVERLAY */}
        <div css={overlayCss} onClick={() => !noDismiss && onClose?.()} />

        {/* FOCUS TRAP */}
        <div ref={focusTrap1Ref} tabIndex={0} aria-hidden="true" />

        {/* MODAL */}
        <section
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalId}
          tabIndex={-1}
          css={modalCardCss}
        >
          {isMounted && (
            <>
              {/* TITLE */}
              <h1 id={modalId} css={headerCss}>
                {title}
              </h1>

              {/* EDIT / SAVE BUTTON */}
              {editable && (
                <IconButton
                  tooltip={editing ? translate('ds.action.saveChanges') : translate('ds.action.edit')}
                  variant={editing ? 'primary' : 'default'}
                  size="lg"
                  floating
                  className="-top-xs-5 right-sm-4 absolute!"
                  onClick={editing ? onSave : onEdit}
                >
                  {editing ? (
                    <CheckCheckIcon aria-hidden className="size-sm-0 p-px" />
                  ) : (
                    <FontAwesomeIcon icon={faPenToSquare} aria-hidden className="text-size-md mb-px ml-px" />
                  )}
                </IconButton>
              )}

              {/* CLOSE / DISCARD BUTTON */}
              {!noClose && (
                <IconButton
                  tooltip={editing ? translate('ds.action.discardChanges') : translate('ds.action.close')}
                  size="lg"
                  floating
                  className="-top-xs-5 -right-xs-5 absolute!"
                  onClick={editing ? onDiscard : onClose}
                >
                  {editing ? (
                    <Undo2Icon aria-hidden className="h-xs-9 w-xs-9" />
                  ) : (
                    <FontAwesomeIcon icon={faXmark} aria-hidden className="text-size-md" />
                  )}
                </IconButton>
              )}

              {/* BODY */}
              <div css={modalBodyCss} className={classNames?.body}>
                {children}
              </div>

              {/* FOOTER */}
              <div css={footerCss}>
                {extras}

                <div css={actionsCss}>
                  {!noClose && (
                    <Button variant="optional" size="md" onClick={onClose}>
                      {translate('ds.action.close')}
                    </Button>
                  )}
                  {actions}
                </div>
              </div>
            </>
          )}
        </section>

        {/* FOCUS TRAP */}
        <div ref={focusTrap2Ref} tabIndex={0} aria-hidden="true" />
      </div>
    </ReactPortal>
  )
}
