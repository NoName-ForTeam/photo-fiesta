import { useEffect, useState } from 'react'

export function useDebounce(value: string, delay: number) {
  // value and delay in ms (1000ms = 1s)
  // debounced values
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const t = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // clean up the timeout after value changes
      return () => {
        clearTimeout(t)
      }
    },
    [value, delay] // re-run if value or delay changes
  )

  return debouncedValue
}
