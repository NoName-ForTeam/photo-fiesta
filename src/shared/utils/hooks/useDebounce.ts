import { useEffect, useState } from 'react'

/**
 * Custom hook that returns a debounced value.
 * The value updates only after the specified delay, preventing frequent updates.
 */

export function useDebounce(value: string, delay: number) {
  // value and delay in ms (1000ms = 1s)
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    if (delay < 0) {
      console.warn('Delay should not be negative')

      return
    }
    // Update debounced value after delay
    const timeId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timeId)
    }
  }, [value, delay])

  return debouncedValue
}
