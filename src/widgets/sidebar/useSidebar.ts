import { useState } from 'react'

import { useAuthMeQuery } from '@/features'
import { ROUTES } from '@/shared/config'
import { useLogout } from '@/shared/utils'
import { useRouter } from 'next/router'

export const useSidebar = () => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const logout = useLogout()
  const { data: userData } = useAuthMeQuery()

  const confirmLogout = () => {
    logout()
    setIsModalOpen(false)
  }

  /**
   * Determines if the given path is the active route.
   *
   * @param {string} path - The path to check against the current route.
   * @returns {string} The CSS class name for the active state if the path matches the current route, otherwise an empty string.
   *
   * @description
   * This function checks if the given path is currently active.
   * It handles both static routes and dynamic routes with [userId].
   * For routes with [userId], it replaces the placeholder with the actual user ID if available.
   */
  const isActive = (path: string) => {
    if (path.includes('[userId]') && userData?.userId) {
      return router.asPath === path.replace('[userId]', userData.userId.toString()) ? 'active' : ''
    }

    return router.pathname === path ? 'active' : ''
  }

  /**
   * Generates the profile link for the current user
   * @returns {string} The profile link, or the default profile route if user data is not available
   */
  const getProfileLink = () =>
    userData?.userId ? `${ROUTES.PROFILE}/${userData.userId.toString()}` : ROUTES.PROFILE

  return {
    confirmLogout,
    getProfileLink,
    isActive,
    isModalOpen,
    setIsModalOpen,
    userData,
  }
}
