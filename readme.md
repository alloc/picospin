# picospin

Bare minimum spinner for CLI apps.

```
pnpm add picospin
```

## API

### Spinner Control

#### `getSpinner()`

Returns the current spinner string with applied color.

```ts
import { getSpinner } from 'picospin'

console.log(getSpinner()) // Returns colored spinner character
```

#### `setSpinner(config: Partial<MistySpinner>)`

Customizes the spinner used for active tasks.

```ts
import { setSpinner } from 'picospin'

// Customize spinner with different frames and color
setSpinner({
  frames: ['◐', '◓', '◑', '◒'],
  interval: 100,
  color: input => `\x1b[35m${input}\x1b[0m`, // Purple color
})
```

#### `spin(enabled: boolean)`

Enables or disables the spin interval. When enabled, the spinner will animate by cycling through its frames.

```ts
import { spin } from 'picospin'

// Start spinning
spin(true)

// Later, stop spinning
spin(false)
```

#### `spinListeners`

A Set of functions that are called when the spinner updates. You can add your own listeners to react to spinner updates.

```ts
import { spinListeners } from 'picospin'

// Add a listener to react to spinner updates
spinListeners.add(() => {
  // Do something when spinner updates
  console.clear()
  console.log('Spinner updated!')
})
```

#### `MistySpinner` Interface

```ts
interface MistySpinner {
  interval: number // Time in ms between frame updates
  frames: string[] // Characters to cycle through
  color: (input: string) => string // Function to apply color
}
```

### Environment Detection

#### `isInteractive`

A boolean that is `true` when the process is running in an interactive terminal (TTY) and not in a CI environment.

```ts
import { isInteractive } from 'picospin'

if (isInteractive) {
  // Show fancy spinner
} else {
  // Use simpler output for non-interactive environments
}
```
