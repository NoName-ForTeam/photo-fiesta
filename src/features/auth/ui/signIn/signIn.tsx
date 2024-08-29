import { ComponentPropsWithoutRef } from 'react'

import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/assets'
import { Button, Card, Input, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Link from 'next/link'

import styles from './signIn.module.scss'

export type SignInProps = ComponentPropsWithoutRef<'div'>
export const SignIn = ({}: SignInProps) => {
  const classNames = {
    button: styles.button,
    card: clsx(styles.card),
    container: styles.container,
    footer: styles.footer,
    form: styles.form,
    header: styles.header,
    icons: styles.icons,
    links: styles.links,
    password: styles.password,
    signIn: styles.signIn,
    signUp: styles.signUp,
  } as const

  return (
    <Card className={classNames.card}>
      <div className={classNames.header}>
        <Typography variant={'h1'}>Sign In</Typography>
        <div className={classNames.links}>
          <Button asChild variant={'link'}>
            <Link href={'#'} passHref>
              <GoogleSvgrepoCom1 className={classNames.icons} />
            </Link>
          </Button>
          <Button asChild variant={'link'}>
            <Link href={'#'} passHref>
              <GithubSvgrepoCom31 className={classNames.icons} />
            </Link>
          </Button>
        </div>
      </div>
      <form className={classNames.form}>
        <div className={classNames.container}>
          <Input label={'Email'} placeholder={'Enter your email'} />
          <Input label={'Password'} placeholder={'Enter your password'} variant={'password'} />
        </div>
        <div className={classNames.button}>
          <Typography className={classNames.password} variant={'text14'}>
            Forgot Password
          </Typography>
          <Button asChild variant={'primary'}>
            <Link className={classNames.signIn} href={'#'} passHref>
              Sign in
            </Link>
          </Button>
        </div>
      </form>
      <div className={classNames.footer}>
        <Typography variant={'text16'}>Don’t have an account?</Typography>
        <Button asChild variant={'link'}>
          <Link className={classNames.signUp} href={'#'} passHref>
            Sign Up
          </Link>
        </Button>
      </div>
    </Card>
  )
}
