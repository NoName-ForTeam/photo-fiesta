import { ComponentPropsWithoutRef } from 'react'
import { Controller } from 'react-hook-form'

import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/shared/assets'
import { Loader } from '@/shared/ui'
import { ConfirmationModal } from '@/widgets'
import { Button, FormCheckbox, RadioGroup, RadioGroupItem, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './accountManagement.module.scss'

import { useAccountManagement } from './useAccountManagement'

/**
 * AccountManagements component for managing user account settings
 */

export const AccountManagements = () => {
  const {
    accountType,
    accountTypes,
    control,
    endDateOfSubscription,
    handleAccountTypeChange,
    handleConfirmation,
    handleModalClose,
    handlePaymentSubmit,
    handleSubmit,
    handleSubscriptionChange,
    isFetchingProfile,
    isModalOpen,
    isSubmitting,
    isSubscriptionActive,
    modalTitle,
    nextPaymentDate,
    onSubmit,
    showLoading,
    subscriptionCosts,
  } = useAccountManagement()

  const classNames = {
    account: styles.account,
    buttons: styles.buttons,
    container: styles.container,
    costs: styles.costs,
    data: styles.data,
    form: styles.form,
    icon: styles.icon,
    renewal: styles.renewal,
    subscription: styles.subscription,
    title: styles.title,
  } as const

  const AccountTypeBlocks = accountTypes.map(type => (
    <RadioBlock key={type.value} title={type.title} value={type.value} />
  ))

  const SubscriptionCostBlocks = subscriptionCosts.map(cost => (
    <RadioBlock key={cost.value} title={cost.title} value={cost.value} />
  ))

  if (showLoading || isFetchingProfile) {
    return <Loader />
  }
  const buttonTitleModal = modalTitle === 'Success' ? 'Ok' : 'Back to payment'
  const contentModal =
    modalTitle === 'Success'
      ? 'Payment was successful'
      : 'Transaction failed.Please,write to support'

  return (
    <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
      {accountType === 'business' && isSubscriptionActive && (
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
              <Typography variant={'textBold14'}> {nextPaymentDate}</Typography>
            </div>
          </div>
          <label className={classNames.renewal}>
            <FormCheckbox control={control} defaultChecked={false} name={'autoRenewal'} />
            <Typography variant={'text14'}>Auto-renewal</Typography>
          </label>
        </div>
      )}

      <div className={classNames.account}>
        <Typography className={classNames.title} variant={'h3'}>
          Account type:
        </Typography>
        <RadioGroup
          className={classNames.container}
          onValueChange={handleAccountTypeChange}
          value={accountType}
        >
          {AccountTypeBlocks}
        </RadioGroup>
      </div>
      {accountType == 'business' && (
        <>
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
          <div className={classNames.buttons}>
            <Button
              disabled={isSubmitting}
              onClick={() => handlePaymentSubmit('PAYPAL')}
              variant={'icon-link'}
            >
              <PaypalSvgrepoCom4 className={classNames.icon} />
            </Button>
            <Typography variant={'text14'}>Or</Typography>
            <Button
              disabled={isSubmitting}
              onClick={() => handlePaymentSubmit('STRIPE')}
              variant={'icon-link'}
            >
              <StripeSvgrepoCom4 className={classNames.icon} />
            </Button>
          </div>
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

//RadioBlock
type RadioBlockProps = {
  title: string
  value: string
} & ComponentPropsWithoutRef<'div'>

/**
 * RadioBlock component for rendering a radio button with a label
 */

const RadioBlock = ({ title, value }: RadioBlockProps) => {
  const classNames = {
    block: styles.block,
    radio: styles.radio,
  } as const

  return (
    <div className={classNames.block}>
      <RadioGroupItem className={classNames.radio} value={value} />
      <Typography variant={'text14'}>{title}</Typography>
    </div>
  )
}
