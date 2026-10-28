import { useEffect, useState, type RefObject } from 'react'

export interface UseIsStuckProps<T extends HTMLElement = HTMLElement> {
  scrollRef: RefObject<HTMLElement | null>
  stickyRef: RefObject<T | null>
}

export const useStickyOnTop = <T extends HTMLElement = HTMLElement>(props: UseIsStuckProps<T>) => {
  const { scrollRef, stickyRef } = props
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const scrollElement = scrollRef.current
    const stickyElement = stickyRef.current
    if (!scrollElement || !stickyElement) return

    const scrollStyle = getComputedStyle(scrollElement)
    const paddingTop = parseFloat(scrollStyle.paddingTop) || 0
    const borderTop = parseFloat(scrollStyle.borderTopWidth) || 0
    const stickyTop = parseFloat(getComputedStyle(stickyElement).top) || 0

    const updateIsSticky = () => {
      const stickyLine = scrollElement.getBoundingClientRect().top + borderTop + paddingTop + stickyTop
      setIsSticky(stickyElement.getBoundingClientRect().top <= stickyLine + 1)
    }

    updateIsSticky()
    scrollElement.addEventListener('scroll', updateIsSticky, { passive: true })
    const resizeObserver = new ResizeObserver(updateIsSticky)
    resizeObserver.observe(scrollElement)
    resizeObserver.observe(stickyElement)

    return () => {
      scrollElement.removeEventListener('scroll', updateIsSticky)
      resizeObserver.disconnect()
    }
  }, [scrollRef, stickyRef])

  return isSticky
}
