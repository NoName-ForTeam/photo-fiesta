/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Control } from 'react-hook-form'

import { ResponseCurrentPayment, usePostCancelAutoRenewalMutation } from '@/features'
import { Loader } from '@/shared/ui'
import { computeSubscriptionDates } from '@/shared/utils'
import { FormCheckbox, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './currentSubscription.module.scss'

import { AccountType, FormData } from '../accountManagements'

type CurrentSubscriptionProps = {
  accountType: AccountType
  autoRenewalEnabled: boolean
  control: Control<FormData>
  currentPaymentData: ResponseCurrentPayment | undefined
  setAutoRenewalEnabled: (value: boolean) => void
}

export const CurrentSubscription = ({
  accountType,
  autoRenewalEnabled,
  control,
  currentPaymentData,
  setAutoRenewalEnabled,
}: CurrentSubscriptionProps) => {
  const [postCancelAutoRenewal, { isLoading }] = usePostCancelAutoRenewalMutation()

  const currentPayments = currentPaymentData?.data || []

  const {
    endDate: endDateOfSubscription,
    isSubscriptionActive,
    nextPaymentDate,
  } = computeSubscriptionDates(currentPayments)

  useEffect(() => {
    setAutoRenewalEnabled(currentPaymentData?.hasAutoRenewal || false)
  }, [currentPaymentData?.hasAutoRenewal])

  const handleAutoRenewalChange = async (value: boolean) => {
    if (!value) {
      await postCancelAutoRenewal()
    }

    setAutoRenewalEnabled(value)
  }

  const classNames = {
    container: styles.container,
    data: styles.data,
    renewal: styles.renewal,
    subscription: styles.subscription,
    title: styles.title,
  } as const

  if (!isSubscriptionActive || accountType !== 'business') {
    return null
  }
  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={classNames.subscription}>
      <Typography className={classNames.title} variant={'h3'}>
        Current Subscription:
      </Typography>
      <div className={clsx(classNames.container, classNames.data)}>
        <div>
          <Typography variant={'text14'}>Expire at</Typography>
          <Typography variant={'textBold14'}> {endDateOfSubscription}</Typography>
        </div>
        <div>
          <Typography variant={'text14'}>Next payment</Typography>
          {autoRenewalEnabled && <Typography variant={'textBold14'}> {nextPaymentDate}</Typography>}
        </div>
      </div>
      <label className={classNames.renewal}>
        <FormCheckbox
          checked={autoRenewalEnabled}
          control={control}
          name={'autoRenewal'}
          onCheckedChange={handleAutoRenewalChange}
        />
        <Typography variant={'text14'}>Auto-renewal</Typography>
      </label>
    </div>
  )
}
