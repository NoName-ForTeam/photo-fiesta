import { useState } from 'react'
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
  const [isOpen, setIsOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [signUp] = useSignUpMutation()

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      agreeWithTerms: false,
      confirmPassword: '',
      email: '',
      password: '',
      userName: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log('Data to be sent:', data)
    signUp(data)
      .unwrap()
      .then(() => {
        console.log('then', data)
        toast.success('Sign-up successful!')
        setUserEmail(data.email)
        setIsOpen(true)
        reset()
        console.log('after reset', getValues())
      })
      .catch(e => {
        console.log('Server error:', e)
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
  })

  const onCloseModalHandler = () => {
    setIsOpen(false)
    reset({ agreeWithTerms: false, confirmPassword: '', email: '', password: '', userName: '' })
  }

  return {
    control,
    errors,
    isOpen,
    onCloseModalHandler,
    onSubmit,
    userEmail,
  }
}
