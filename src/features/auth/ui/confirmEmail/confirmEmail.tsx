import { bro } from '@/assets'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import Image from 'next/image'

import styles from './confirmEmail.module.scss'

/**
 * `ConfirmEmail` is a React component that displays a confirmation message after a user has verified their email.
 * It includes a heading, a short message, and a button to navigate to the sign-in page.
 * Additionally, an image is displayed alongside the button.
 *
 * @component
 * @example
 * // Usage example:
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
  const classNames = {
    button: styles.btn,
    description: styles.description,
    img: styles.img,
    main: styles.main,
    root: styles.root,
    title: styles.title,
  } as const

  const onClickHandler = () => {}

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
        <Button className={classNames.button} onClick={onClickHandler}>
          Sign In
        </Button>
        <Image alt={'confirm'} className={classNames.img} src={bro} />
      </div>
    </div>
  )
}
