import { useState } from 'react'
import { toast } from 'react-toastify'

import { SentEmail, useResendLinkMutation } from '@/features'
import { ErrorResponse } from '@/shared/api'
import { rafiki } from '@/shared/assets'
import { useTranslation } from '@/shared/utils'
import { Button, Card, Typography } from '@photo-fiesta/ui-lib'
import Image from 'next/image'

import styles from './expiredEmail.module.scss'

type Props = {
  email: string
}
/**
 * `ExpiredEmail` is a React functional component that displays a message when an email verification link
 * has expired. It provides a button to resend the verification link and shows a modal upon
 * successful resending. The component also handles errors and displays an error message if resending fails.
 *
 * @component
 * @example
 *
 * function App() {
 *   return (
 *     <div>
 *       <ExpiredEmail email="user@example.com" />
 *     </div>
 *   )
 * }
 */

export const ExpiredEmail = ({ email }: Props) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [resendLink, { error, isLoading }] = useResendLinkMutation()

  //TODO: temporary solution for error handling
  let serverError = 'An unknown error occurred'

  if (error && (error as ErrorResponse).data) {
    const errorData = (error as ErrorResponse).data

    if (errorData.messages) {
      if (typeof errorData.messages === 'string') {
        serverError = errorData.messages
      } else if (Array.isArray(errorData.messages) && errorData.messages.length > 0) {
        serverError = errorData.messages[0].message || serverError
      }
    } else if (errorData.error) {
      serverError = errorData.error
    }
  }

  const classNames = {
    btn: styles.btn,
    card: styles.card,
    content: styles.content,
    img: styles.img,
  } as const

  const onResendLink = async () => {
    try {
      await resendLink({ email }).unwrap()
      setIsOpen(true)
    } catch (e) {
      toast.error(serverError)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const onCloseModalHandler = () => {
    setIsOpen(false)
  }

  return (
    <Card className={classNames.card}>
      <div className={classNames.content}>
        <Typography as={'h1'} variant={'h1'}>
          {t.auth.emailExpired}
        </Typography>
        <Typography variant={'text16'}>{t.auth.linkExpiredDescription}</Typography>
      </div>
      <Button className={classNames.btn} onClick={onResendLink}>
        {t.auth.resendLink}
      </Button>
      <Image alt={'expired'} className={classNames.img} src={rafiki} />
      <SentEmail closeModal={onCloseModalHandler} email={email} open={isOpen} />
    </Card>
  )
}
