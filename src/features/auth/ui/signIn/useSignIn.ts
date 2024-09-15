import { useForm } from 'react-hook-form'

import { SuccessSignInResponse, useSignInMutation } from '@/features'
import { PASSWORD_REGEX } from '@/shared/config'
import { handleErrorResponse } from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export type FormInputs = z.infer<typeof signInSchema>
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .regex(PASSWORD_REGEX),
})

const badRequestSchema = z.object({
  messages: z.array(
    z.object({
      field: z.enum(['email', 'password']),
      message: z.string(),
    })
  ),
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

  const onSubmit = handleSubmit(async (data: FormInputs) => {
    clearErrors()
    try {
      const response = (await signIn(data).unwrap()) as unknown as SuccessSignInResponse

      //TODO: temporary solution to use local storage
      localStorage.setItem('signInToken', response.accessToken)
      // TODO: add redirect to home page and use routing constants
      router.push('/home')
    } catch (error: unknown) {
      handleErrorResponse<FormInputs>({
        badRequestSchema,
        error,
        setError,
      })
    }
  })

  return {
    control,
    errors,
    onSubmit,
  }
}
