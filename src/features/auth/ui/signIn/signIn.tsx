import { Controller, FieldErrors } from 'react-hook-form'

import { Button, Input, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './signIn.module.scss'

import { AuthCard } from '../authCard'
import { FormInputs, useSignIn } from './useSignIn'

export const SignIn = () => {
  const { control, errors, handleSubmit } = useSignIn()
  const classNames = {
    container: styles.container,
    form: styles.form,
  } as const

  return (
    <AuthCard
      //TODO:use routing constants
      footerLinkHref={'/auth/signUpPage'}
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
        {/**TODO: add link to forgot password and use routing constants*/}
        <Link href={'/forgot-password'}>
          <Typography variant={'text14'}>Forgot Password</Typography>
        </Link>
      </Button>
      <Button variant={'primary'}>Sign in</Button>
    </div>
  )
}
