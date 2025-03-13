import { useEffect } from 'react'

import { useLazyAuthMeQuery } from '@/features'
import { ROUTES } from '@/shared/config'
import { Loader } from '@/shared/ui'
import { checkErrorMessages, Storage } from '@/shared/utils'
import { useRouter } from 'next/router'
import { ErrorResponse } from '@/shared/api'
import { toast } from 'react-toastify'

/**
 * GithubCallback Component
 * handles the OAuth authentication callback from GitHub,
 * retrieves `accessToken` from the URL query parameters, stores it,
 * fetches user data, and redirects to user profile page
 */

const GithubCallback = () => {
  const router = useRouter()
  const { accessToken } = router.query
  const [getMe] = useLazyAuthMeQuery()

  useEffect(() => {
    const handleLoginByGithub = async (token: string) => {
      try {
        // save accessToken in local storage
        Storage.setToken(token)

        // fetch user info
        const meResponse = await getMe()
        const userId = meResponse?.data?.userId

        if (!userId) {
          console.error('User ID not found')

          return
        }

        // redirect to user profile
        router.replace(`${ROUTES.PROFILE}/${userId}`)
      } catch (error) {
        if (
          typeof error === 'object' &&
          error !== null &&
          'data' in error &&
          typeof error.data === 'object' &&
          error.data !== null &&
          'error' in error.data &&
          'messages' in error.data &&
          'statusCode' in error.data
        ) {
          checkErrorMessages(error as ErrorResponse, () => {})
        } else {
          toast.error('An unexpected error occurred')
        }
      }
    }

    if (router.isReady && typeof accessToken === 'string') {
      handleLoginByGithub(accessToken)
    }
  }, [accessToken, router.isReady])

  return <Loader />
}

export default GithubCallback
