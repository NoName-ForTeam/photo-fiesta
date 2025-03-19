import { toast } from 'react-toastify'

import { useLazyAuthMeQuery, useLoginByGoogleMutation } from '@/features'
import { ErrorResponse } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { Storage, checkErrorMessages } from '@/shared/utils'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

export function useGoogleAuth() {
  const router = useRouter()
  const [getMe] = useLazyAuthMeQuery()
  const [loginByGoogle] = useLoginByGoogleMutation()

  return useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async googleResponse => {
      const { code } = googleResponse

      try {
        const { accessToken: token } = await loginByGoogle({ code }).unwrap()

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
    },
  })
}
