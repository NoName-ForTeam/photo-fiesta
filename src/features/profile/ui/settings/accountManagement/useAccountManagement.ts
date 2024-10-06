import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useGetCurrentPaymentQuery, usePostSubscriptionMutation } from '@/features/profile/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL_VERCEL || ''

type AccountType = 'business' | 'personal'
type ModalType = 'Error' | 'Success' | null

/** Array of available account types */
const accountTypes = [
  { title: 'Personal', value: 'personal' },
  { title: 'Business', value: 'business' },
] as const

/** Array of available subscription costs */
const subscriptionCosts = [
  { amount: 10, title: '$10 per 1 Day', value: 'DAY' },
  { amount: 50, title: '$50 per 7 Day', value: 'WEEKLY' },
  { amount: 100, title: '$100 per month', value: 'MONTHLY' },
] as const

const formSchema = z.object({
  amount: z.number(),
  autoRenewal: z.boolean(),
  baseUrl: z.string(),
  paymentType: z.enum(['STRIPE', 'PAYPAL']),
  typeSubscription: z.enum(['MONTHLY', 'DAY', 'WEEKLY']),
})

type FormData = z.infer<typeof formSchema>

/**
 * Custom hook for managing account and subscription logic
 */
export const useAccountManagement = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [accountType, setAccountType] = useState<AccountType>('personal')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<ModalType>(null)
  const [showLoading, setShowLoading] = useState(false)

  const [postSubscription, { isLoading }] = usePostSubscriptionMutation()

  // Effect for managing loading state - delay for 5s after loading for show loading component
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false)
      }, 5000)

      return () => clearTimeout(timer)
    } else {
      setShowLoading(true)
    }
  }, [isLoading])

  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      amount: 10,
      autoRenewal: false,
      baseUrl: BASE_URL,
      paymentType: 'STRIPE',
      typeSubscription: 'DAY',
    },
    resolver: zodResolver(formSchema),
  })

  const { data: currentPaymentData, refetch: refetchCurrentPayment } = useGetCurrentPaymentQuery()

  const currentPayment = currentPaymentData?.data[0]
  const isSubscriptionActive =
    !!currentPayment && new Date(currentPayment.endDateOfSubscription) > new Date()

  // Effect for refetching current payment when account type changes to business
  useEffect(() => {
    if (accountType === 'business') {
      refetchCurrentPayment()
    }
  }, [accountType, refetchCurrentPayment])

  /**
   * Handles change in account type
   * @param {AccountType} value - The new account type
   */
  const handleAccountTypeChange = (value: AccountType) => {
    setAccountType(value)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) {
      return
    }
    setIsSubmitting(true)
    try {
      const response = await postSubscription(data).unwrap()

      router.push(response.url)
    } catch (error) {
      setModalTitle('Error')
      setIsModalOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Handles confirmation in the modal
   */
  const handleConfirmation = () => {
    setModalTitle(null)
    setIsModalOpen(false)
  }

  /**
   * Handles change in subscription type
   * @param {string} value - The new subscription type
   */
  const handleSubscriptionChange = (value: string) => {
    const subscription = subscriptionCosts.find(cost => cost.value === value)

    if (subscription) {
      setValue('typeSubscription', subscription.value)
      setValue('amount', subscription.amount)
    }
  }

  /**
   * Handles payment submission
   * @param {FormData['paymentType']} paymentType - The payment type
   */
  const handlePaymentSubmit = (paymentType: FormData['paymentType']) => {
    setValue('paymentType', paymentType)
    handleSubmit(onSubmit)()
  }

  const handleSuccessfulPayment = useCallback(() => {
    setModalTitle('Success')
    setIsModalOpen(true)
  }, [])

  // Effect for handling successful payment redirect
  useEffect(() => {
    const { success } = router.query

    if (success === 'true') {
      handleSuccessfulPayment()
      router.replace(router.pathname, undefined, { shallow: true })
    }
  }, [router, handleSuccessfulPayment])

  return {
    accountType,
    accountTypes,
    control,
    currentPayment,
    handleAccountTypeChange,
    handleConfirmation,
    handleModalClose,
    handlePaymentSubmit,
    handleSubmit,
    handleSubscriptionChange,
    isLoading,
    isModalOpen,
    isSubmitting,
    isSubscriptionActive,
    modalTitle,
    onSubmit,
    showLoading,
    subscriptionCosts,
  }
}
