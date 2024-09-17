import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useLazyAuthMeQuery, useSignInMutation } from '@/features'
import {
  commonEmailSchema,
  commonPasswordSchema,
  // createBadRequestSchema,
  // handleErrorResponse,
} from '@/shared/utils'
import { Storage } from '@/shared/utils/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export type FormInputs = z.infer<typeof signInSchema>
const signInSchema = z.object({
  email: commonEmailSchema,
  password: commonPasswordSchema,
})

// const badRequestSchema = createBadRequestSchema(['email', 'password'])

export const useSignIn = () => {
  const router = useRouter()
  const {
    // clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    // setError,
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
  })
  const [signIn] = useSignInMutation()
  const [getMe] = useLazyAuthMeQuery()
  const onSubmit = handleSubmit(data => {
    signIn(data)
      .unwrap()
      .then(async res => {
        Storage.setToken(res.accessToken)
        const tokenPayload = res.accessToken.split('.')?.[1]
        const decodedPayload = atob(tokenPayload)
        let parsed

        try {
          parsed = JSON.parse(decodedPayload)
        } catch {
          parsed = {}
        }

        let userId

        if (parsed?.userId) {
          userId = parsed.userId
        } else {
          const meRes = await getMe()

          userId = meRes?.data?.userId
        }

        if (!userId) {
          return
        }

        void router.replace(`/profile/${userId}`)
      })
      .catch(e => {
        const message = e?.data?.messages ?? 'Something went wrong'

        toast.error(message)
      })
    //   .catch (error: unknown)
    // {
    //     handleErrorResponse<FormInputs>({
    //         badRequestSchema,
    //         error,
    //         setError,
    //     })
    // }
    // catch (err) {
    //   if (isFetchBaseQueryError(err)) {
    //     const error = err as FetchBaseQueryError
    //
    //     if (error.status === 400) {
    //       {
    //         /**TODO: check response data and add error message*/
    //       }
    //       setError('email', {
    //         //TODO:temporary solution to add error message
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         //@ts-expect-error
    //         message: error.data.messages ?? 'Incorrect input data',
    //         type: 'manual',
    //       })
    //     } else if (error.status === 401) {
    //       setError('email', { message: 'Unauthorized', type: 'manual' })
    //     } else if (error.status === 429) {
    //       setError('email', {
    //         message: 'More than 5 attempts from one IP-address during 10 seconds',
    //         type: 'manual',
    //       })
    //     } else {
    //       setError('email', { message: 'An error occurred. Please try again.', type: 'manual' })
    //     }
    //   } else {
    //     setError('email', { message: 'An unexpected error occurred.', type: 'manual' })
    //   }
    //   console.error('Login failed', err)
    // }
  })

  // if (isAuthMe) {
  //   void router.replace(`/profile/${isAuthMe.userId}`)
  // }

  return {
    control,
    errors,
    onSubmit,
  }
}

// function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
//   return typeof error === 'object' && error != null && 'status' in error
// }
