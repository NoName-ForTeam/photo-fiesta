import { useForm } from 'react-hook-form'

import { useLazyAuthMeQuery, useSignInMutation } from '@/features'
import {
  commonEmailSchema,
  commonPasswordSchema,
  createBadRequestSchema,
  handleErrorResponse,
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
