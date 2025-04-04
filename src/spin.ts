import c from 'picocolors'
import { isInteractive } from './is-interactive'

let frame = isInteractive ? 0 : -1
let spinning: NodeJS.Timeout
let spinCount = 0

export interface Spinner {
  interval: number
  frames: string[]
  color: (input: string) => string
}

let spinner: Spinner = {
  interval: 80,
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  color: c.cyan,
}

/** Get the current spinner string */
export function getSpinner() {
  return spinner.color(frame < 0 ? '∞' : spinner.frames[frame])
}

/** Customize the spinner used for active tasks */
export function setSpinner(config: Partial<Spinner>) {
  Object.assign(spinner, config)
}

/** These functions are called when the spinner updates */
export const spinListeners = new Set<Function>()

/** Enable or disable the spin interval */
export function spin(enabled: boolean) {
  if (frame < 0) return
  if (enabled) {
    if (++spinCount > 1) return
    spinning = setInterval(() => {
      if (++frame == spinner.frames.length) frame = 0
      spinListeners.forEach(onSpin => onSpin())
    }, spinner.interval)
  } else if (spinCount > 0) {
    if (--spinCount > 0) return
    clearInterval(spinning)
  }
}
