import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  useGetCurrentPaymentQuery,
  useGetProfileQuery,
  usePostSubscriptionMutation,
} from '@/features'
import { ErrorResponse } from '@/shared/api'
import { LOADING_DELAY } from '@/shared/config'
import { Loader } from '@/shared/ui'
import {
  checkErrorMessages,
  computeSubscriptionDates,
  getBaseUrl,
  useDelayedLoading,
  useModal,
} from '@/shared/utils'
import { ConfirmationModal } from '@/widgets'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

import styles from './accountManagement.module.scss'

import { AccountTypes } from './accountTypes'
import { CurrentSubscription } from './currentSubscription'
import { PaymentMethodSelector } from './paymentMethodSelector'
import { SubscriptionCosts } from './subscriptionCosts'

export type AccountType = 'business' | 'personal'

const formSchema = z.object({
  amount: z.number(),
  autoRenewal: z.boolean(),
  baseUrl: z.string(),
  paymentType: z.enum(['STRIPE', 'PAYPAL']),
  typeSubscription: z.enum(['MONTHLY', 'DAY', 'WEEKLY']),
})

export type FormData = z.infer<typeof formSchema>

/**
 * AccountManagements component for managing user account settings
 */

export const AccountManagements = () => {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { isModalOpen, modalTitle, setIsModalOpen, setModalTitle } = useModal()

  const { isLoading: isFetchingProfile } = useGetProfileQuery()
  const [postSubscription, { isLoading }] = usePostSubscriptionMutation()

  //when true we see loading component and the delay avoids picture jerkiness
  const showLoading = useDelayedLoading(isLoading, LOADING_DELAY)

  const { data: currentPaymentData, refetch: refetchCurrentPayment } = useGetCurrentPaymentQuery()

  // {userId,subscriptionId,dateOfPayment,endDateOfSubscription,autoRenewal}
  // get current payments
  const currentPayments = currentPaymentData?.data || []
  const {
    endDate: endDateOfSubscription,
    isSubscriptionActive,
    nextPaymentDate,
  } = computeSubscriptionDates(currentPayments)

  const initialCheckedState = currentPaymentData?.hasAutoRenewal || false
  const [checked, setChecked] = useState(initialCheckedState)

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

  const classNames = {
    form: styles.form,
  } as const

  const buttonTitleModal = modalTitle === 'Success' ? 'Ok' : 'Back to payment'
  const contentModal =
    modalTitle === 'Success'
      ? 'Payment was successful'
      : 'Transaction failed.Please,write to support'

  if (showLoading || isFetchingProfile) {
    return <Loader />
  }

  return (
    <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
      {accountType === 'business' && isSubscriptionActive && (
        <CurrentSubscription
          checked={checked}
          control={control}
          currentPaymentData={currentPaymentData}
          endDateOfSubscription={endDateOfSubscription}
          isSubscriptionActive={isSubscriptionActive}
          nextPaymentDate={nextPaymentDate}
          setChecked={setChecked}
        />
      )}
      <AccountTypes accountType={accountType} setAccountType={setAccountType} />
      {accountType == 'business' && (
        <>
          <SubscriptionCosts control={control} setValue={setValue} />
          <PaymentMethodSelector
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            setValue={setValue}
          />
        </>
      )}
      {isModalOpen && (
        <ConfirmationModal
          buttonTitle={buttonTitleModal}
          closeModal={handleModalClose}
          confirmation={handleConfirmation}
          content={contentModal}
          isOpen={isModalOpen}
          isTwoButtons={false}
          title={modalTitle ?? ''}
        />
      )}
    </form>
  )
}
