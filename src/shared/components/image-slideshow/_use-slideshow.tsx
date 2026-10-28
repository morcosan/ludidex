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
  const { srcs, interval, transition, onLoading } = props
  const [state, setState] = useState<SlideshowState>(() => {
    const first = getRandomIndex(srcs.length)
    return { indexes: [first, getDifferentIndex(first, srcs.length)], activeSlot: 0 }
  })
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(undefined)
  const isChanging = useRef(false)
  const intervalMs = Math.max(interval, transition * 2)

  const next = useCallback(() => {
    if (srcs.length < 2 || isChanging.current) return
    isChanging.current = true
    onLoading?.(true)

    // Step 1: fade to the other layer
    setState((state) => ({ ...state, activeSlot: getOtherSlot(state.activeSlot) }))

    // Step 2: once the fade is over, preload a new image into the now-hidden layer
    const loadNext = () => {
      setState((state) => {
        const hiddenSlot = getOtherSlot(state.activeSlot)
        const visibleIndex = state.indexes[state.activeSlot]
        const indexes: SlotIndexes = [...state.indexes]
        indexes[hiddenSlot] = getDifferentIndex(visibleIndex, srcs.length)
        return { ...state, indexes }
      })
      isChanging.current = false
      onLoading?.(false)
    }
    clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(loadNext, transition + FADE_END_BUFFER)
  }, [srcs.length, transition, onLoading])

  useEffect(() => {
    if (srcs.length < 2) return
    // Reset the auto swap timer whenever the active layer changes, so manual swaps restart the countdown
    const timeoutId = setTimeout(next, intervalMs)
    return () => clearTimeout(timeoutId)
  }, [srcs.length, intervalMs, next, state.activeSlot])

  useEffect(() => () => clearTimeout(timeoutId.current), [])

  return { ...state, next }
}
