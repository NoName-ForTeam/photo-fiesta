import { ExpiredEmail, useConfirmRegistrationQuery } from '@/features'
import { bro } from '@/shared/assets'
import { ROUTES } from '@/shared/config'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './confirmEmail.module.scss'
/**
 * `ConfirmEmail` is a React component that displays a confirmation message after a user has verified their email.
 * It includes a heading, a short message, and a button to navigate to the sign-in page.
 * Additionally, an image is displayed alongside the button.
 *
 * @component
 * @example
 * import { ConfirmEmail } from './ConfirmEmail'
 *
 * function App() {
 *   return (
 *     <div>
 *       <ConfirmEmail />
 *     </div>
 *   )
 * }
 */

export const ConfirmEmail = () => {
  const router = useRouter()
  const confirmationCode = router.query.code as string
  const email = router.query.email as string
  const { error, isLoading } = useConfirmRegistrationQuery({ confirmationCode }, { skip: !router })

  const classNames = {
    button: styles.btn,
    description: styles.description,
    img: styles.img,
    main: styles.main,
    root: styles.root,
    title: styles.title,
  } as const

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <ExpiredEmail email={email} />
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.description}>
        <Typography as={'h1'} className={classNames.title} variant={'h1'}>
          Congratulations!
        </Typography>
        <Typography as={'p'} variant={'text16'}>
          Your email has been confirmed
        </Typography>
      </div>
      <div className={classNames.main}>
        <Button asChild className={classNames.button}>
          <Link href={ROUTES.SIGN_IN}>Sign In</Link>
        </Button>
        <Image alt={'confirm'} className={classNames.img} src={bro} />
      </div>
    </div>
  )
}
