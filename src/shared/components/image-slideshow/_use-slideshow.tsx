import { useEffect, useState } from 'react'
import { type ImageSlideshowProps } from './_types'

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

export const useSlideshow = (props: ImageSlideshowProps): SlideshowState => {
  const { srcs, interval, duration } = props
  const [state, setState] = useState<SlideshowState>(() => {
    const first = getRandomIndex(srcs.length)
    return { indexes: [first, getDifferentIndex(first, srcs.length)], activeSlot: 0 }
  })
  const swapInterval = Math.max(interval, duration * 2)

  useEffect(() => {
    if (srcs.length < 2) return

    let reloadTimeout: ReturnType<typeof setTimeout> | undefined

    // Step 1: fade to the other layer
    const showNext = () => {
      setState((state) => ({ ...state, activeSlot: getOtherSlot(state.activeSlot) }))
      clearTimeout(reloadTimeout)
      reloadTimeout = setTimeout(loadNextIntoHiddenSlot, duration + FADE_END_BUFFER)
    }

    // Step 2: once the fade is over, preload a new image into the now-hidden layer
    const loadNextIntoHiddenSlot = () => {
      setState((state) => {
        const hiddenSlot = getOtherSlot(state.activeSlot)
        const visibleIndex = state.indexes[state.activeSlot]
        const indexes: SlotIndexes = [...state.indexes]
        indexes[hiddenSlot] = getDifferentIndex(visibleIndex, srcs.length)
        return { ...state, indexes }
      })
    }

    const interval = setInterval(showNext, swapInterval)

    return () => {
      clearInterval(interval)
      clearTimeout(reloadTimeout)
    }
  }, [srcs.length, duration, swapInterval])

  return state
}
