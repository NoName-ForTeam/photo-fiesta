import { useForm } from 'react-hook-form'

import { SuccessSignInResponse, useSignInMutation } from '@/features'
import { PASSWORD_REGEX } from '@/shared/config'
import { zodResolver } from '@hookform/resolvers/zod'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'
import { z } from 'zod'

export type FormInputs = z.infer<typeof signInSchema>
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 32 characters')
    .regex(PASSWORD_REGEX),
})

export const useSignIn = () => {
  const router = useRouter()
  const {
    clearErrors,
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

  const onSubmitForm = async (data: FormInputs) => {
    clearErrors()
    try {
      const response = (await signIn(data).unwrap()) as unknown as SuccessSignInResponse

      localStorage.setItem('signInToken', response.accessToken)
      // TODO: add redirect to home page and use routing constants
      router.push('/home')
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const error = err as FetchBaseQueryError

        if (error.status === 400) {
          {
            /**TODO: check response data and add error message*/
          }
          setError('email', {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            message: error.data.messages ?? 'Incorrect input data',
            type: 'manual',
          })
        } else if (error.status === 401) {
          setError('email', { message: 'Unauthorized', type: 'manual' })
        } else if (error.status === 429) {
          setError('email', {
            message: 'More than 5 attempts from one IP-address during 10 seconds',
            type: 'manual',
          })
        } else {
          setError('email', { message: 'An error occurred. Please try again.', type: 'manual' })
        }
      } else {
        setError('email', { message: 'An unexpected error occurred.', type: 'manual' })
      }
      console.error('Login failed', err)
    }
  }

  return {
    control,
    errors,
    handleSubmit: handleSubmit(onSubmitForm),
  }
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}
