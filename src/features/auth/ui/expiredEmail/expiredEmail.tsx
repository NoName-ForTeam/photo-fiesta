import { rafiki } from '@/shared/assets'
import { Button, Card, Typography } from '@photo-fiesta/ui-lib'
import Image from 'next/image'
import Link from 'next/link'

import styles from './expiredEmail.module.scss'

export const ExpiredEmail = () => {
  const classNames = {
    btn: styles.btn,
    card: styles.card,
    content: styles.content,
    img: styles.img,
  } as const

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
      <Button asChild className={classNames.btn}>
        {/*TODO: check path for links*/}
        <Link href={'#'}>Resend verification link</Link>
      </Button>
      <Image alt={'expired'} className={classNames.img} src={rafiki} />
    </Card>
  )
}
