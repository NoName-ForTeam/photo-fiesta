import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/
export const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/

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
    username: z
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

export type FormValues = z.infer<typeof signUpSchema>

export const useSignUpForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted:', data)
    reset()
  }

  return { control, errors, handleSubmit, onSubmit }
}
