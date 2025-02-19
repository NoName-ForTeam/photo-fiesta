import { useEffect } from 'react'

import { useLazyAuthMeQuery } from '@/features'
import { ROUTES } from '@/shared/config'
import { Loader } from '@/shared/ui'
import { Storage } from '@/shared/utils'
import { useRouter } from 'next/router'

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
        void router.replace(`${ROUTES.PROFILE}/${userId}`)
      } catch (error) {
        console.error('failed to fetch user data:', error)
      }
    }

    if (router.isReady && typeof accessToken === 'string') {
      void handleLoginByGithub(accessToken)
    }
  }, [accessToken, router.isReady])

  return <Loader />
}

export default GithubCallback
