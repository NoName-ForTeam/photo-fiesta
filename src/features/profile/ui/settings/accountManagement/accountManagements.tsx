import { ComponentPropsWithoutRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/shared/assets'
import { ConfirmationModal } from '@/widgets'
import { Button, FormCheckbox, RadioGroup, RadioGroupItem, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './accountManagement.module.scss'

type AccountType = 'business' | 'personal'
type ModalType = 'Error' | 'Success' | null

/**
 * AccountManagements component for managing user account settings
 */

export const AccountManagements = () => {
  //TODO: add custom hook for logic
  const { control } = useForm()
  const [accountType, setAccountType] = useState<AccountType>('personal')
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [modalTitle, setModalTitle] = useState<ModalType>('Success')

  const classNames = {
    account: styles.account,
    buttons: styles.buttons,
    container: styles.container,
    costs: styles.costs,
    data: styles.data,
    form: styles.form,
    icon: styles.icon,
    remewal: styles.remewal,
    subscription: styles.subscription,
    title: styles.title,
  } as const
  const handleAccountTypeChange = (value: AccountType) => {
    setAccountType(value)
  }
  //TODO: use this handleModalOpen
  // const handleModalOpen = () => {
  //   setIsModalOpen(true)
  // }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const handleConfirmation = () => {
    setModalTitle('Success')
  }

  return (
    <form className={classNames.form}>
      {accountType === 'business' && modalTitle === 'Success' && (
        <div className={classNames.subscription}>
          <Typography className={classNames.title} variant={'h3'}>
            Current Subscription:
          </Typography>
          <div className={clsx(classNames.container, classNames.data)}>
            <div>
              <Typography variant={'text14'}>Expire at</Typography>
              {/*TODO: add data get request instead 12.12.2022*/}
              <Typography variant={'textBold14'}>12.12.2022</Typography>
            </div>
            <div>
              <Typography variant={'text14'}>Next payment</Typography>
              {/*TODO: add data get request instead 13.02.2023*/}
              <Typography variant={'textBold14'}>13.02.2023</Typography>
            </div>
          </div>
          <label className={classNames.remewal}>
            <FormCheckbox control={control} name={'auto'} />
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
          <RadioBlock title={'Personal'} value={'personal'} />
          <RadioBlock title={'Business'} value={'business'} />
        </RadioGroup>
      </div>
      {accountType == 'business' && (
        <>
          <div className={classNames.costs}>
            <Typography variant={'h3'}>Your subscription costs:</Typography>
            <RadioGroup className={classNames.container} defaultValue={'10'}>
              <RadioBlock title={'$10 per 1 Day'} value={'10'} />
              <RadioBlock title={'$50 per 7 Day'} value={'50'} />
              <RadioBlock title={'$100 per month'} value={'100'} />
            </RadioGroup>
          </div>
          <div className={classNames.buttons}>
            <Button variant={'icon-link'}>
              <PaypalSvgrepoCom4 className={classNames.icon} />
            </Button>
            <Typography variant={'text14'}>Or</Typography>
            <Button variant={'icon-link'}>
              <StripeSvgrepoCom4 className={classNames.icon} />
            </Button>
          </div>
        </>
      )}
      {/*TODO: add logic for modal window*/}
      {isModalOpen && (
        <ConfirmationModal
          closeModal={handleModalClose}
          confirmation={handleConfirmation}
          content={'Payment was successful'}
          isOpen={isModalOpen}
          isTwoButtons={false}
          title={modalTitle && modalTitle}
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
