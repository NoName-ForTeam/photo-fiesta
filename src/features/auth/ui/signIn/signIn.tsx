import { Controller } from 'react-hook-form'

import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/assets'
import { Button, Card, Input, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Link from 'next/link'

import styles from './signIn.module.scss'

import { FormInputs, useSignIn } from './useSignIn'

type SignInProps = {
  onSubmit: (data: FormInputs) => void
}

export const SignIn = ({ onSubmit }: SignInProps) => {
  const { control, errors, handleSubmit, isDirty, isValid, onSubmitForm } = useSignIn(onSubmit)
  const classNames = {
    button: styles.button,
    card: clsx(styles.card),
    container: styles.container,
    errorMessage: styles.errorMessage,
    footer: styles.footer,
    form: styles.form,
    header: styles.header,
    icons: styles.icons,
    links: styles.links,
    password: styles.password,
    signIn: styles.signIn,
    signUp: styles.signUp,
  } as const
  const isButtonDisabled = !isValid || !isDirty

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
      <form className={classNames.form} onSubmit={handleSubmit(onSubmitForm)}>
        <div className={classNames.container}>
          <Controller
            control={control}
            name={'email'}
            render={({ field }) => (
              <Input label={'Email'} placeholder={'Enter your email'} {...field} />
            )}
          />
          <Controller
            control={control}
            name={'password'}
            render={({ field }) => (
              <Input
                label={'Password'}
                placeholder={'Enter your password'}
                variant={'password'}
                {...field}
              />
            )}
          />
          {(errors.email || errors.password) && (
            <Typography className={classNames.errorMessage} variant={'text14'}>
              The email or password are incorrect. Try again please
            </Typography>
          )}
        </div>
        <div className={classNames.button}>
          <Button asChild className={classNames.password} variant={'link'}>
            <Link href={'/forgot-password'}>
              <Typography variant={'text14'}>Forgot Password</Typography>
            </Link>
          </Button>
          <Button disabled={isButtonDisabled} variant={'primary'}>
            Sign in
          </Button>
        </div>
      </form>
      <div className={classNames.footer}>
        <Typography variant={'text16'}>Don’t have an account?</Typography>
        <Button asChild variant={'link'}>
          <Link href={'/sign-up'}>Sign Up</Link>
        </Button>
      </div>
    </Card>
  )
}
