import { useEffect, useEffectEvent } from 'react'

export interface ClickOutsideProps {
  enabled: boolean
  allowlist: string[]
  callback: () => void
}

export const useClickOutside = (props: ClickOutsideProps) => {
  const { enabled, allowlist, callback } = props
  const allowSelector = [
    ...allowlist,
    '[data-portal]', // All Mantine dropdowns
  ].join(',')

  const handleOutsideClick = useEffectEvent(callback)

  useEffect(() => {
    if (!enabled) return

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest(allowSelector)) return
      handleOutsideClick()
    }

    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [enabled, allowSelector])
}
