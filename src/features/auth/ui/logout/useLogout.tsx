import { useDispatch } from 'react-redux'

import { baseApi } from '@/app/api'
import { ROUTES } from '@/shared/config'
import { Storage } from '@/shared/utils'
import { useRouter } from 'next/router'

/**
 * Custom React hook for handling user logout.
 *
 * This hook uses the Redux dispatch, Next.js router, and local storage to logout the user and redirect them to the sign-in page.
 * It also invalidates the 'Auth' tag in the RTK Query cache and resets the API state.
 */

export const useLogout = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  return () => {
    Storage.deleteToken()
    dispatch(baseApi.util.invalidateTags(['Auth']))
    dispatch(baseApi.util.resetApiState())
    router.push(ROUTES.SIGN_IN)
  }
}
