import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useSignUpMutation } from '@/features/auth'
import { PASSWORD_REGEX, USERNAME_REGEX } from '@/shared/config/regex-constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const emailSchema = z.string().email('The email must match the format example@example.com')

const signUpSchema = z
  .object({
    agreeWithTerms: z.boolean(),
    baseUrl: z.string().url('http://localhost:3000'),
    confirmPassword: z.string(),
    email: emailSchema,
    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        PASSWORD_REGEX,
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~}'
      ),
    userName: z
      .string()
      .min(6, 'Username must be at least 6 characters long')
      .max(30, 'Username must not exceed 30 characters')
      .regex(USERNAME_REGEX),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })
  .refine(data => data.agreeWithTerms, {
    message: 'You must agree to the terms and conditions',
    path: ['agreeWithTerms'],
  })

const badRequestSchema = z.object({
  messages: z.array(
    z.object({ field: z.enum(['email', 'password', 'userName']), message: z.string() })
  ),
})

export type FormValues = z.infer<typeof signUpSchema>

export const useSignUpForm = () => {
  const [signUp] = useSignUpMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = handleSubmit(data => {
    signUp(data)
      .unwrap()
      .catch(e => {
        const parsed = badRequestSchema.safeParse(e.data)

        if (parsed.success) {
          parsed.data.messages.forEach(m => setError(m.field, { message: m.message }))
        } else if ('error' in e) {
          toast.error(e.error)
        } else if ('message' in e) {
          toast.error(e.message)
        } else {
          const message = JSON.stringify(e) ?? 'Some error'

          toast.error(message)
        }
      })
    reset()
  })

  return { control, errors, handleSubmit, onSubmit }
}

// {
//     if (error.status === 409) {
//         // If email is already registered
//         if (error.data.message.includes('email')) {
//             setError('email', {
//                 message: 'User with this email is already registered.',
//                 type: 'manual',
//             })
//         }
//         // If username is already registered
//         else if (error.data.message.includes('username')) {
//             setError('userName', {
//                 message: 'User with this username is already registered.',
//                 type: 'manual',
//             })
//         }
//         // If user exists but email not confirmed
//         else if (error.data.message.includes('email not confirmed')) {
//             alert('A new confirmation link has been sent to your email.')
//         }
//     }
//     // If the confirmation link has expired
//     else if (error.status === 400 && error.data.message.includes('link expired')) {
//         router.push('/resend-confirmation')
//     } else {
//         console.error('Sign up failed:', error)
//     }
// }
