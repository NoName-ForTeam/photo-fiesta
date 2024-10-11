import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { baseApi } from '@/app/api'
import { useAuthMeQuery, useImagePostModal, useLogoutMutation, useProfile } from '@/features'
import {
  BookmarkOutline,
  HomeOutline,
  MessageCircle,
  Person,
  PlusSquareOutline,
  Search,
  TrendingUp,
} from '@/shared/assets'
import { ROUTES } from '@/shared/config'
import { Storage, isValidErrorResponse, useTranslation } from '@/shared/utils'
import { useRouter } from 'next/router'

/** Type representing the icon components used in the sidebar */
export type Icon = typeof HomeOutline

type SidebarItem = {
  href: string
  icon: Icon
  /**
   * Optional override for the active state check.
   * Used when the active state logic differs from the standard path comparison.
   * For example, it's used for dynamic routes like user profiles.
   */
  isActiveOverride?: string
  onClick?: () => void
  text: string
}

type ModalState = {
  isCreateModalOpen: boolean
  isModalOpen: boolean
  openPostModal: boolean
}
export const useSidebar = () => {
  const dispatch = useDispatch()
  const [logoutMutation] = useLogoutMutation()
  const router = useRouter()

  const { t } = useTranslation()
  const { profileInfo } = useProfile()
  const { data: userData } = useAuthMeQuery()

  // State for modals
  const [modalState, setModalState] = useState<ModalState>({
    isCreateModalOpen: false,
    isModalOpen: false,
    openPostModal: false,
  })

  const [selectedImage, setSelectedImage] = useState<null | string>(null)

  /** Modal control functions */
  const openCreateModal = () => setModalState(prev => ({ ...prev, isCreateModalOpen: true }))

  const closeCreateModal = () => setModalState(prev => ({ ...prev, isCreateModalOpen: false }))

  const handleClosePostModal = () => {
    setModalState(prev => ({ ...prev, openPostModal: false, selectedImage: null }))
  }

  const handleOpenPostModal = () => setModalState(prev => ({ ...prev, openPostModal: true }))

  const { postId } = useImagePostModal({ handleClose: handleOpenPostModal })

  const handleCloseAddPhotoModal = () => {
    closeCreateModal()
    handleOpenPostModal()
  }

  /** Logout functions */
  const confirmLogout = async () => {
    try {
      await logoutMutation().unwrap()
      setModalState(prev => ({ ...prev, isModalOpen: false }))
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
  const handleLogoutClick = () => {
    setModalState(prev => ({ ...prev, isModalOpen: true }))
  }

  const handleCloseLogoutModal = () => {
    setModalState(prev => ({ ...prev, isModalOpen: false }))
  }

  /** Active route functions */
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

  /** Profile link function */
  /**
   * Generates the profile link for the current user
   * @returns {string} The profile link, or the default profile route if user data is not available
   */

  const getProfileLink = () =>
    userData?.userId ? `${ROUTES.PROFILE}/${userData.userId.toString()}` : ROUTES.PROFILE

  /** Array of sidebar items to be rendered */
  const sidebarItems: SidebarItem[] = [
    { href: ROUTES.HOME, icon: HomeOutline, text: t.sidebar.home },
    { href: '#', icon: PlusSquareOutline, onClick: openCreateModal, text: t.sidebar.create },
    {
      href: getProfileLink(),
      icon: Person,
      isActiveOverride: `${ROUTES.PROFILE}/[userId]`,
      text: t.sidebar.myProfile,
    },
    { href: ROUTES.MESSENGER, icon: MessageCircle, text: t.sidebar.messenger },
    { href: ROUTES.SEARCH, icon: Search, text: t.sidebar.search },
    { href: ROUTES.STATICS, icon: TrendingUp, text: t.sidebar.statics },
    { href: ROUTES.FAVORITES, icon: BookmarkOutline, text: t.sidebar.favorites },
  ]

  return {
    confirmLogout,
    handleCloseAddPhotoModal,
    handleCloseLogoutModal,
    handleClosePostModal,
    handleLogoutClick,
    handleOpenPostModal,
    isActive,
    modalState,
    postId,
    profileInfo,
    selectedImage,
    setSelectedImage,
    sidebarItems,
  }
}
