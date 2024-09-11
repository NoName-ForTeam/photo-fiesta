import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useCreateNewPasswordMutation } from '@/features/auth'
import { PASSWORD_REGEX } from '@/shared/config/regex-constants'
import { handleErrorResponse } from '@/shared/utils'
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
      /**
       * *the 'recoveryCode' field is replaced by the 'code' field in response from the backend */
      field: z.enum(['confirmPassword', 'newPassword', 'code']),
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
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
      //TODO:change default value
      recoveryCode: 'someCode',
    },
    mode: 'onBlur',
    resolver: zodResolver(CreateNewPasswordSchema),
  })

  const onSubmit = handleSubmit(async data => {
    try {
      await createNewPassword({
        newPassword: data.newPassword,
        recoveryCode: data.recoveryCode,
      }).unwrap()

      toast.success('Password has been changed successfully')
    } catch (error: unknown) {
      handleErrorResponse({
        badRequestSchema,
        error,
        setError,
      })
    }
  })

  return { control, errors, onSubmit }
}
