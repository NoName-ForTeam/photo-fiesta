import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useCreateNewPasswordMutation } from '@/features/auth'
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
    //TODO: maybe change condition for recovery code
    recoveryCode: z.string().min(1, 'Recovery code is required'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'The password must match the new password',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof CreateNewPasswordSchema>

const badRequestSchema = z.object({
  messages: z.array(
    z.object({
      field: z.enum(['confirmPassword', 'newPassword', 'recoveryCode']),
      message: z.string(),
    })
  ),
})

export const useCreateNewPassword = () => {
  const [createNewPassword] = useCreateNewPasswordMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
      recoveryCode: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(CreateNewPasswordSchema),
  })
  const onSubmit = async (data: Omit<FormValues, 'confirmPassword'>) => {
    console.log('submit')

    try {
      const res = await createNewPassword(data).unwrap()

      if (res.status === 200) {
        toast.success('Password has been changed')
      }
    } catch (error) {
      const parsed = badRequestSchema.safeParse(error)

      console.log(parsed)
      if (parsed.success) {
        toast.error(parsed.data.messages[0].message)
      }
    }
  }

  return { control, errors, handleSubmit: handleSubmit(onSubmit) }
}
