import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { baseApi } from '@/app/api'
import { useAuthMeQuery, useLogoutMutation } from '@/features'
import { ROUTES } from '@/shared/config'
import { Storage, isValidErrorResponse } from '@/shared/utils'
import { useRouter } from 'next/router'

export const useSidebar = () => {
  const dispatch = useDispatch()
  const [logoutMutation] = useLogoutMutation()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: userData } = useAuthMeQuery()

  const confirmLogout = async () => {
    //TODO: extract logic to useLogout hook in utils
    try {
      await logoutMutation().unwrap()
      setIsModalOpen(false)
      dispatch(baseApi.util.invalidateTags(['Auth']))
      dispatch(baseApi.util.resetApiState())
      await router.push(ROUTES.SIGN_IN)
      Storage.deleteToken()
    } catch (error: unknown) {
      if (isValidErrorResponse(error)) {
        if (error.data.statusCode === 401) {
          toast.error('Session expired. Please login again.')
          Storage.deleteToken()
          dispatch(baseApi.util.invalidateTags(['Auth']))
          dispatch(baseApi.util.resetApiState())
          await router.push(ROUTES.SIGN_IN)
        } else {
          toast.error('Error while logging out')
        }
      }
    }
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
