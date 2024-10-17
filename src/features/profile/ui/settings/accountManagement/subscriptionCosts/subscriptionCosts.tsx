import { Control, Controller, UseFormSetValue } from 'react-hook-form'

import { RadioGroup, Typography } from '@photo-fiesta/ui-lib'

import styles from './subscriptionCosts.module.scss'

import { FormData } from '../accountManagements'
import { RadioBlock } from '../radioBlock'

const subscriptionCosts = [
  { amount: 10, title: '$10 per 1 Day', value: 'DAY' },
  { amount: 50, title: '$50 per 7 Day', value: 'WEEKLY' },
  { amount: 100, title: '$100 per month', value: 'MONTHLY' },
] as const

type SubscriptionCostsProps = {
  control: Control<FormData>
  setValue: UseFormSetValue<FormData>
}
export const SubscriptionCosts = ({ control, setValue }: SubscriptionCostsProps) => {
  const handleSubscriptionChange = (value: string) => {
    const subscription = subscriptionCosts.find(cost => cost.value === value)

    if (subscription) {
      setValue('typeSubscription', subscription.value)
      setValue('amount', subscription.amount)
    }
  }

  const SubscriptionCostBlocks = subscriptionCosts.map(cost => (
    <RadioBlock key={cost.value} title={cost.title} value={cost.value} />
  ))
  const classNames = {
    container: styles.container,
    costs: styles.costs,
  } as const

  return (
    <div className={classNames.costs}>
      <Typography variant={'h3'}>Your subscription costs:</Typography>
      <Controller
        control={control}
        name={'typeSubscription'}
        render={({ field }) => (
          <RadioGroup
            className={classNames.container}
            defaultValue={'MONTHLY'}
            onValueChange={value => {
              field.onChange(value)
              handleSubscriptionChange(value)
            }}
            value={field.value}
          >
            {SubscriptionCostBlocks}
          </RadioGroup>
        )}
      />
    </div>
  )
}
