import { useState } from 'react'
import { useForm } from 'react-hook-form'

import process from 'process'

import { usePasswordRecoveryMutation } from '@/features'
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
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_API_KEY

  const [recoveryPassword] = usePasswordRecoveryMutation()
  const [recaptcha, setRecaptcha] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [isLinkSent, setLinkSent] = useState(false)

  const closeModal = () => setModalOpen(false)

  const reCaptchaHandler = (token: null | string) => {
    setRecaptcha(token!)
  }

  const onSubmit = handleSubmit(({ email }) => {
    if (!recaptcha) {
      return
    }
    //debugger
    recoveryPassword({ email, recaptcha })
      .unwrap()
      .then(() => {
        setModalOpen(true)
        setLinkSent(true)
      })
      .catch()
  })

  return {
    closeModal,
    control,
    errors,
    getValues,
    isLinkSent,
    isModalOpen,
    onSubmit,
    reCaptchaHandler,
    siteKey,
  }
}
