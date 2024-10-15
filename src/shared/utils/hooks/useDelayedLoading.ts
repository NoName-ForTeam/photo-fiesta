import { useCallback, useEffect, useState } from 'react'

export const useDelayedLoading = (isLoading: boolean, delay: number) => {
  const [showLoading, setShowLoading] = useState(false)

  /**
   * A custom hook that manages a delayed loading state.
   * It shows the loading state immediately when loading starts,
   * and hides it after a specified delay when loading ends.
   *
   * @param {boolean} isLoading - The current loading state
   * @param {number} delay - The delay (in milliseconds) before hiding the loading state
   * @returns {boolean} The current state of showLoading
   */

  const setDelayedLoading = useCallback((isCurrentlyLoading: boolean, currentDelay: number) => {
    if (!isCurrentlyLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false)
      }, currentDelay)

      return () => clearTimeout(timer)
    } else {
      setShowLoading(true)
    }
  }, [])

  /**
   * Effect hook to manage the loading state.
   * It calls setDelayedLoading whenever isLoading or delay changes.
   */

  useEffect(() => {
    return setDelayedLoading(isLoading, delay)
  }, [isLoading, delay, setDelayedLoading])

  return showLoading
}
