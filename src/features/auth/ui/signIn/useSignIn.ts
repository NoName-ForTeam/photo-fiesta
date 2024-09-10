import { SubmitHandler, useForm } from 'react-hook-form'

import { PASSWORD_REGEX } from '@/shared/config/regex-constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export type FormInputs = z.infer<typeof signInSchema>
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 32 characters')
    .regex(PASSWORD_REGEX),
})

export const useSignIn = (onSubmit: (data: FormInputs) => void) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
  })

  const onSubmitForm: SubmitHandler<FormInputs> = data => {
    onSubmit(data)
  }

  return {
    control,
    errors,
    handleSubmit,
    onSubmitForm,
    register,
  }
}
