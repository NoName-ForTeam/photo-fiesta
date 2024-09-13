import { useState } from 'react'
import { toast } from 'react-toastify'

import { ErrorResponse, SentEmail, useResendLinkMutation } from '@/features'
import { rafiki } from '@/shared/assets'
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
  const [isOpen, setIsOpen] = useState(false)
  const [resendLink, { error, isLoading }] = useResendLinkMutation()
  const serverError = (error as ErrorResponse)?.data?.messages?.[0]?.message

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
      if (serverError) {
        toast.error(serverError)
      } else {
        console.error('Unhandled error:', e)
        toast.error('Some error')
      }
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
          Email verification link expired
        </Typography>
        <Typography variant={'text16'}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>
      </div>
      <Button className={classNames.btn} onClick={onResendLink}>
        Resend verification link
      </Button>
      <Image alt={'expired'} className={classNames.img} src={rafiki} />
      <SentEmail closeModal={onCloseModalHandler} email={email} open={isOpen} />
    </Card>
  )
}
