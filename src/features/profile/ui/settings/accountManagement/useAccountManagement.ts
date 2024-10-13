/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  useGetCurrentPaymentQuery,
  useGetProfileQuery,
  usePostCancelAutoRenewalMutation,
  usePostSubscriptionMutation,
} from '@/features'
import { ErrorResponse } from '@/shared/api'
import { LOADING_DELAY } from '@/shared/config'
import {
  checkErrorMessages,
  computeSubscriptionDates,
  getBaseUrl,
  useDelayedLoading,
  useModal,
} from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

type AccountType = 'business' | 'personal'

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
 * This hook provides functionality for handling user account types,
 * subscription management, and payment processing. It also manages
 * modal states for success and error messages.
 */

export const useAccountManagement = () => {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { isModalOpen, modalTitle, setIsModalOpen, setModalTitle } = useModal()

  const { isLoading: isFetchingProfile } = useGetProfileQuery()
  const [postSubscription, { isLoading }] = usePostSubscriptionMutation()
  const [postCancelAutoRenewal] = usePostCancelAutoRenewalMutation()

  //when true we see loading component
  const showLoading = useDelayedLoading(isLoading, LOADING_DELAY)

  const { data: currentPaymentData, refetch: refetchCurrentPayment } = useGetCurrentPaymentQuery()

  const renewal = currentPaymentData?.hasAutoRenewal

  // {userId,subscriptionId,dateOfPayment,endDateOfSubscription,autoRenewal}
  // get current payments
  const currentPayments = currentPaymentData?.data || []

  const initialCheckedState = currentPaymentData?.hasAutoRenewal || false
  const [checked, setChecked] = useState(initialCheckedState)

  // logic for autoRenewal
  const handleAutoRenewalChange = (value: boolean) => {
    if (!value) {
      postCancelAutoRenewal()
    }
    setChecked(value)
  }

  const { control, handleSubmit, setError, setValue } = useForm<FormData>({
    defaultValues: {
      amount: 10,
      autoRenewal: false,
      baseUrl: getBaseUrl(),
      paymentType: 'STRIPE',
      typeSubscription: 'DAY',
    },
    resolver: zodResolver(formSchema),
  })

  //get end date of subscription and next payment date
  const {
    endDate: endDateOfSubscription,
    isSubscriptionActive,
    nextPaymentDate,
  } = computeSubscriptionDates(currentPayments)

  const [accountType, setAccountType] = useState<AccountType>(
    isSubscriptionActive ? 'business' : 'personal'
  )

  //check is subscription active and set account type
  useEffect(() => {
    setAccountType(isSubscriptionActive ? 'business' : 'personal')
  }, [isSubscriptionActive])

  //* Account type handling

  // Effect for refetching current payment when account type changes to business
  useEffect(() => {
    if (accountType === 'business') {
      refetchCurrentPayment()
    }
    setChecked(currentPaymentData?.hasAutoRenewal || false)
  }, [accountType, refetchCurrentPayment])

  /**
   * Handles change in account type
   * @param {AccountType} value - The new account type
   */
  const handleAccountTypeChange = (value: AccountType) => {
    setAccountType(value)
  }

  //* Payment handling
  const onSubmit = async (data: FormData) => {
    if (isSubmitting) {
      return
    }
    //put in autoRenewal actual state of checkbox
    const updatedData = {
      ...data,
      autoRenewal: checked, // use current state of checkbox
    }

    setIsSubmitting(true)
    try {
      const response = await postSubscription(updatedData).unwrap()

      router.push(response.url)
    } catch (error) {
      setModalTitle('Error')
      setIsModalOpen(true)
      checkErrorMessages(error as ErrorResponse, setError)
    } finally {
      setIsSubmitting(false)
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

  //* Modal handling

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleConfirmation = () => {
    setModalTitle(null)
    setIsModalOpen(false)
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
      //change current url removing query params success
      router.replace(router.pathname, undefined, { shallow: true })
    }
    if (success === 'false') {
      setModalTitle('Error')
      setIsModalOpen(true)
      router.replace(router.pathname, undefined, { shallow: true })
    }
  }, [router.query.success, handleSuccessfulPayment])

  //* Subscription handling
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

  return {
    accountType,
    accountTypes,
    checked,
    control,
    endDateOfSubscription,
    handleAccountTypeChange,
    handleAutoRenewalChange,
    handleConfirmation,
    handleModalClose,
    handlePaymentSubmit,
    handleSubmit,
    handleSubscriptionChange,
    isFetchingProfile,
    isLoading,
    isModalOpen,
    isSubmitting,
    isSubscriptionActive,
    modalTitle,
    nextPaymentDate,
    onSubmit,
    renewal,
    showLoading,
    subscriptionCosts,
  }
}
