import { Controller } from 'react-hook-form'

import { ROUTES } from '@/shared/config/routes'
import { Button, Input, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './signIn.module.scss'

import { AuthCard } from '../authCard'
import { FormInputs, useSignIn } from './useSignIn'

type SignInProps = {
  onSubmit: (data: FormInputs) => void
}

/**
 * SignIn component for user authentication
 *@component
 * @example
 *   type FormInputs =
 *  {
 *    email: string;
 *    password: string;
 *  }
 *
 * const handleSubmit = (data:FormInputs) => {
 *   console.log('Form submitted with:', data)
 * }
 *
 * function AuthPage() {
 *   return <SignIn onSubmit={handleSubmit} />
 * }
 */
export const SignIn = ({ onSubmit }: SignInProps) => {
  const { control, errors, handleSubmit, onSubmitForm } = useSignIn(onSubmit)
  const classNames = {
    container: styles.container,
    form: styles.form,
  } as const

  return (
    <AuthCard
      footerLinkHref={ROUTES.SIGN_UP}
      footerLinkText={'Sign Up'}
      footerText={"Don't have an account?"}
      title={'Sign In'}
    >
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
          {(errors.email || errors.password) && <ErrorMessage />}
        </div>
        <FormButtons />
      </form>
    </AuthCard>
  )
}

const ErrorMessage = () => {
  const classNames = {
    errorMessage: styles.errorMessage,
  } as const

  return (
    <Typography className={classNames.errorMessage} variant={'text14'}>
      The email or password are incorrect. Try again please
    </Typography>
  )
}

const FormButtons = () => {
  const classNames = {
    button: styles.button,
    password: styles.password,
  } as const

  return (
    <div className={classNames.button}>
      <Button asChild className={classNames.password} variant={'link'}>
        <Link href={ROUTES.FORGOT_PASSWORD}>
          <Typography variant={'text14'}>Forgot Password</Typography>
        </Link>
      </Button>
      <Button variant={'primary'}>Sign in</Button>
    </div>
  )
}
