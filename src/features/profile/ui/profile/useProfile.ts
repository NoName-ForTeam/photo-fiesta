import { useMemo } from 'react'

import { useAuthMeQuery, useGetProfileQuery } from '@/features'
import { ROUTES } from '@/shared/config'
import { useRouter } from 'next/router'

/**
 * Custom hook for managing profile-related logic and data.
 *
 * This hook encapsulates the logic for:
 * - Fetching the authenticated user's data
 * - Determining if the current profile is the user's own profile
 * - Handling navigation to profile settings
 * - Refetching profile data
 */
export const useProfile = () => {
  const { refetch: getProfile } = useGetProfileQuery()
  const router = useRouter()
  const { data: authData, isError } = useAuthMeQuery()

  /**
   * Determines if the current profile is the user's own profile.
   * This is memoized to prevent unnecessary recalculations.
   */
  const isOwnProfile = useMemo(
    () => String(authData?.userId) === router.query.userId,
    [authData?.userId, router.query.userId]
  )

  /**
   * Handles navigation to profile settings and refetches profile data.
   */
  const handleProfileSettings = () => {
    router.push(ROUTES.SETTINGS)
    getProfile()
  }

  return {
    authData,
    handleProfileSettings,
    isError,
    isOwnProfile,
  }
}
