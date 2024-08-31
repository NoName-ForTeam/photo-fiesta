import { bro } from '@/assets'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import Image from 'next/image'

import styles from './confirmEmail.module.scss'

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
