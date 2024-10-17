import { useEffect } from 'react'
import { Control } from 'react-hook-form'

import { ResponseCurrentPayment, usePostCancelAutoRenewalMutation } from '@/features'
import { FormCheckbox, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './currentSubscription.module.scss'

import { FormData } from '../useAccountManagement'

type CurrentSubscriptionProps = {
  checked: boolean
  control: Control<FormData>
  currentPaymentData: ResponseCurrentPayment | undefined
  endDateOfSubscription: null | string
  isSubscriptionActive: boolean
  nextPaymentDate: null | string
  setChecked: (value: boolean) => void
}

export const CurrentSubscription = ({
  checked,
  control,
  currentPaymentData,
  endDateOfSubscription,
  isSubscriptionActive,
  nextPaymentDate,
  setChecked,
}: CurrentSubscriptionProps) => {
  const [postCancelAutoRenewal] = usePostCancelAutoRenewalMutation()
  // const { data: currentPaymentData, refetch: refetchCurrentPayment } = useGetCurrentPaymentQuery()

  //const currentPayments = currentPaymentData?.data || []

  // const initialCheckedState = currentPaymentData?.hasAutoRenewal || false
  // const [checked, setChecked] = useState(initialCheckedState)

  // const {
  //   endDate: endDateOfSubscription,
  //   isSubscriptionActive,
  //   nextPaymentDate,
  // } = computeSubscriptionDates(currentPayments)

  useEffect(() => {
    setChecked(currentPaymentData?.hasAutoRenewal || false)
  }, [currentPaymentData?.hasAutoRenewal])

  // useEffect(() => {
  //   refetchCurrentPayment()
  // }, [refetchCurrentPayment])

  const handleAutoRenewalChange = (value: boolean) => {
    if (!value) {
      postCancelAutoRenewal()
    }
    setChecked(value)
  }

  const classNames = {
    container: styles.container,
    data: styles.data,
    renewal: styles.renewal,
    subscription: styles.subscription,
    title: styles.title,
  } as const

  if (!isSubscriptionActive) {
    return null
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
          {checked && <Typography variant={'textBold14'}> {nextPaymentDate}</Typography>}
        </div>
      </div>
      <label className={classNames.renewal}>
        <FormCheckbox
          checked={checked}
          control={control}
          name={'autoRenewal'}
          onCheckedChange={handleAutoRenewalChange}
        />
        <Typography variant={'text14'}>Auto-renewal</Typography>
      </label>
    </div>
  )
}
