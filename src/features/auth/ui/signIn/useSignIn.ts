import { useForm } from 'react-hook-form'

import { PASSWORD_REGEX } from '@/shared/config'
import { zodResolver } from '@hookform/resolvers/zod'
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
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
  })

  const onSubmitForm = (data: FormInputs): void => {
    {
      /*TODO: remove console.log*/
    }
    //eslint-disable-next-line no-console
    console.log(data)
  }

  return {
    control,
    errors,
    handleSubmit: handleSubmit(onSubmitForm),
  }
}
