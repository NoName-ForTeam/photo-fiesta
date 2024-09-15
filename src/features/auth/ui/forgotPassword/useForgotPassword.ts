import { useState } from 'react'
import { useForm } from 'react-hook-form'

import process from 'process'

import { ErrorResponse, usePasswordRecoveryMutation } from '@/features'
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
    getValues,
    handleSubmit,
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_API_KEY

  const [recoveryPassword] = usePasswordRecoveryMutation()
  const [recaptcha, setRecaptcha] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLinkSent, setIsLinkSent] = useState(false)

  const closeModal = () => setIsModalOpen(false)

  const reCaptchaHandler = (token: null | string) => {
    setRecaptcha(token!)
  }

  const onSubmit = handleSubmit(async ({ email }) => {
    // TODO: add logic with show error by toast
    if (!recaptcha) {
      return
    }
    try {
      await recoveryPassword({ email, recaptcha }).unwrap()
      setIsModalOpen(true)
      setIsLinkSent(true)
    } catch (err) {
      const error = err as ErrorResponse

      setError('email', { message: error.data.messages[0].message })
    }
  })

  return {
    RECAPTCHA_KEY,
    closeModal,
    control,
    errors,
    getValues,
    isLinkSent,
    isModalOpen,
    onSubmit,
    reCaptchaHandler,
    setIsLinkSent,
  }
}
