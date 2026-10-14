import { ClassValue } from 'clsx'

export {}
declare global {
  var cx: (...args: ClassValue[]) => string // Shortcut for `clsx` without import
  var log: (...args: unknown[]) => void // Shortcut for `console.log`
}
