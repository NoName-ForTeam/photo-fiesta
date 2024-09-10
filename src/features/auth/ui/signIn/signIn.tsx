import { Controller, FieldErrors } from 'react-hook-form'

import { ROUTES } from '@/shared/config/routes'
import { Button, Input, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './signIn.module.scss'

import { AuthCard } from '../authCard'
import { FormInputs, useSignIn } from './useSignIn'

/**
 * SignIn component for user authentication.
 * This component provides a form for users to sign in with their email and password.
 *@component
 * @example
 * import { SignIn } from './path/to/SignIn';
 * const SignUpPage = () => {
 * return <SignUp />
 * }
 */

export const SignIn = () => {
  const { control, errors, handleSubmit } = useSignIn()
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
      <form className={classNames.form} onSubmit={handleSubmit}>
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
          {(errors.email || errors.password) && <ErrorMessage errors={errors} />}
        </div>
        <FormButtons />
      </form>
    </AuthCard>
  )
}

type ErrorMessageProps = {
  errors: FieldErrors<FormInputs>
}

const ErrorMessage = ({ errors }: ErrorMessageProps) => {
  const classNames = {
    errorMessage: styles.errorMessage,
  } as const

  return (
    <Typography className={classNames.errorMessage} variant={'text14'}>
      {errors.email?.message ||
        errors.password?.message ||
        'The email or password are incorrect. Try again please'}
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
      <Button type={'submit'} variant={'primary'}>
        Sign in
      </Button>
    </div>
  )
}
