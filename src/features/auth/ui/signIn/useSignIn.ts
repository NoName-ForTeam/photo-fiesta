import { useForm } from 'react-hook-form'

import { useSignInMutation } from '@/features'
import { ROUTES } from '@/shared/config'
import {
  Storage,
  commonEmailSchema,
  commonPasswordSchema,
  createBadRequestSchema,
  handleErrorResponse,
} from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export type FormInputs = z.infer<typeof signInSchema>
const signInSchema = z.object({
  email: commonEmailSchema,
  password: commonPasswordSchema,
})

const badRequestSchema = createBadRequestSchema(['email', 'password'])

export const useSignIn = () => {
  const router = useRouter()
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
  })
  const [signIn] = useSignInMutation()
  //const [getMe] = useLazyAuthMeQuery()
  /**
   * This function is used to submit login credentials, store the received access token,
   * extract the `userId` from the token, and redirect the user to their profile page.
   *
   * - If the token contains a valid `userId`, the user is redirected to `/profile/{userId}`.
   * - If the token doesn't contain a `userId`, an additional API call to `getMe` is made to retrieve the user's data.
   * - In case of errors during the login process, appropriate form errors are displayed using `handleErrorResponse`.
   */
  const onSubmit = handleSubmit(data => {
    signIn(data)
      .unwrap()
      .then(async res => {
        // Save the access token in local storage
        Storage.setToken(res.accessToken)
        // Decode the token payload to get the userId
        const tokenPayload = res.accessToken.split('.')?.[1]
        const decodedPayload = atob(tokenPayload)
        let parsed

        try {
          parsed = JSON.parse(decodedPayload)
        } catch {
          parsed = {}
        }

        let userId

        // Check if the token payload contains a userId
        if (parsed?.userId) {
          userId = parsed.userId
        } else {
          // If not, fetch the user data from the `auth/me` endpoint
          // const meRes = await getMe()
          // userId = meRes?.data?.userId
        }
        // If no userId is found, do nothing
        if (!userId) {
          return
        }

        void router.replace(`${ROUTES.PROFILE}/${userId}`)
      })
      .catch(error => {
        handleErrorResponse<FormInputs>({
          badRequestSchema,
          error,
          setError,
        })
      })
  })

  return {
    control,
    errors,
    onSubmit,
  }
}
