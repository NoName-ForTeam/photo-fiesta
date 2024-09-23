import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import process from 'process'

import { usePasswordRecoveryMutation } from '@/features'
import { ErrorResponse } from '@/shared/api'
import { checkErrorMessages, commonEmailSchema } from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: commonEmailSchema,
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
    // TODO: maybe change logic with show error by toast
    if (!recaptcha) {
      toast.error('Please complete the reCAPTCHA verification.')

      return
    }
    try {
      await recoveryPassword({ email, recaptcha }).unwrap()
      setIsModalOpen(true)
      setIsLinkSent(true)
    } catch (err) {
      const error = err as ErrorResponse

      checkErrorMessages(error, setError)
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
