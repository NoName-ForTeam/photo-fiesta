import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useCreateNewPasswordMutation } from '@/features'
import { ROUTES } from '@/shared/config'
import { commonPasswordSchema, createBadRequestSchema, handleErrorResponse } from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

const CreateNewPasswordSchema = z
  .object({
    confirmPassword: commonPasswordSchema,
    newPassword: commonPasswordSchema,
    //TODO: maybe change condition for recovery code
    recoveryCode: z.string().min(1, 'Recovery code is required'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'The password must match the new password',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof CreateNewPasswordSchema>

/**
 * *the 'recoveryCode' field is replaced by the 'code' field in response from the backend */
const badRequestSchema = createBadRequestSchema(['confirmPassword', 'newPassword', 'code'])

export const useCreateNewPassword = () => {
  const [createNewPassword] = useCreateNewPasswordMutation()
  const router = useRouter()
  const code = router.query.code ?? 'test_code'

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
      recoveryCode: code as string,
    },
    mode: 'onBlur',
    resolver: zodResolver(CreateNewPasswordSchema),
  })

  const onSubmit = handleSubmit(async data => {
    try {
      await createNewPassword({
        newPassword: data.newPassword,
        recoveryCode: code as string,
      }).unwrap()

      toast.success('Password has been changed successfully')
      void router.push(ROUTES.SIGN_IN)
    } catch (error: unknown) {
      handleErrorResponse({
        badRequestSchema,
        error,
        isToast: true,
        setError,
      })
    }
  })

  return { control, errors, onSubmit }
}
