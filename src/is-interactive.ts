declare const process: any

/**
 * Equals true when `process.stdout` is a TTY.
 */
export let isInteractive = false
try {
  isInteractive = Boolean(
    process.stdout.isTTY &&
      process.env.TERM !== 'dumb' &&
      !('CI' in process.env)
  )
} catch {}
