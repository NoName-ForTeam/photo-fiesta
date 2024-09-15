import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useSignUpMutation } from '@/features'
import {
  commonEmailSchema,
  commonPasswordSchema,
  commonUsernameSchema,
  createBadRequestSchema,
  handleErrorResponse,
} from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const signUpSchema = z
  .object({
    agreeWithTerms: z.boolean(),
    confirmPassword: z.string(),
    email: commonEmailSchema,
    password: commonPasswordSchema,
    userName: commonUsernameSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })
  .refine(data => data.agreeWithTerms, {
    message: 'You must agree to the terms and conditions',
    path: ['agreeWithTerms'],
  })

const badRequestSchema = createBadRequestSchema(['email', 'password', 'userName'])

export type FormValues = z.infer<typeof signUpSchema>

export const useSignUpForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [signUp] = useSignUpMutation()

  const {
    control,
    formState: { errors },
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

  const onSubmit = handleSubmit(async data => {
    try {
      await signUp({ email: data.email, password: data.password, userName: data.userName }).unwrap()
      toast.success('Sign-up successful!')
      setUserEmail(data.email)
      setIsOpen(true)
      reset()
    } catch (error) {
      handleErrorResponse<FormValues>({ badRequestSchema, error, setError })
    }
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
