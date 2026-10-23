import { useCallback, useEffect, useRef, useState } from 'react'
import { type ImageSlideshowHandle, type ImageSlideshowProps } from './_types'

type Slot = 0 | 1
type SlotIndexes = [number, number]

interface SlideshowState {
  indexes: SlotIndexes
  activeSlot: Slot
}

const FADE_END_BUFFER = 100
const getOtherSlot = (slot: Slot): Slot => (slot === 0 ? 1 : 0)
const getRandomIndex = (length: number) => Math.floor(Math.random() * length)
const getDifferentIndex = (current: number, length: number) => {
  if (length < 2) return current
  const next = getRandomIndex(length - 1)
  return next >= current ? next + 1 : next
}

export const useSlideshow = (props: ImageSlideshowProps): SlideshowState & ImageSlideshowHandle => {
  const { srcs, interval, duration } = props
  const [state, setState] = useState<SlideshowState>(() => {
    const first = getRandomIndex(srcs.length)
    return { indexes: [first, getDifferentIndex(first, srcs.length)], activeSlot: 0 }
  })
  const swapTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const isSwapping = useRef(false)
  const swapInterval = Math.max(interval, duration * 2)

  // Step 1: fade to the other layer
  // Step 2: once the fade is over, preload a new image into the now-hidden layer
  const next = useCallback(() => {
    if (srcs.length < 2 || isSwapping.current) return

    isSwapping.current = true
    setState((state) => ({ ...state, activeSlot: getOtherSlot(state.activeSlot) }))

    clearTimeout(swapTimeout.current)
    swapTimeout.current = setTimeout(() => {
      setState((state) => {
        const hiddenSlot = getOtherSlot(state.activeSlot)
        const visibleIndex = state.indexes[state.activeSlot]
        const indexes: SlotIndexes = [...state.indexes]
        indexes[hiddenSlot] = getDifferentIndex(visibleIndex, srcs.length)
        return { ...state, indexes }
      })
      isSwapping.current = false
    }, duration + FADE_END_BUFFER)
  }, [srcs.length, duration])

  useEffect(() => {
    if (srcs.length < 2) return

    // Restart the interval whenever the active layer changes so manual swaps reset the timer
    const intervalId = setInterval(next, swapInterval)
    return () => clearInterval(intervalId)
  }, [srcs.length, swapInterval, next, state.activeSlot])

  useEffect(() => () => clearTimeout(swapTimeout.current), [])

  return { ...state, next }
}
