import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const emailSchema = z.string().email('The email must match the format example@example.com')

const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export type FormValues = z.infer<typeof forgotPasswordSchema>

export const useForgotPassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = () => {
    // TODO: add logic
  }

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
  }
}
