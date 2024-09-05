import { useForm } from 'react-hook-form'

import { PASSWORD_REGEX } from '@/shared/config/regex-constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const CreateNewPasswordSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be no more than 20 characters')
      .regex(
        PASSWORD_REGEX,
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~}'
      ),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be no more than 20 characters')
      .regex(
        PASSWORD_REGEX,
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~}'
      ),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'The password must match the new password',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof CreateNewPasswordSchema>

export const useCreateNewPassword = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(CreateNewPasswordSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted:', data)
  }

  return { control, handleSubmit, onSubmit }
}
