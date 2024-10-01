import { Controller, FieldErrors } from 'react-hook-form'

import { AuthCard } from '@/features'
import { FormInputs, useSignIn } from '@/features/auth/ui/signIn/useSignIn'
import { ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/utils'
import { Button, Input, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './signIn.module.scss'

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
  const { t } = useTranslation()
  const { control, errors, onSubmit } = useSignIn()
  const classNames = {
    container: styles.container,
    form: styles.form,
  } as const

  return (
    <AuthCard
      footerLinkHref={ROUTES.SIGN_UP}
      footerLinkText={t.auth.signUp}
      footerText={t.auth.haveAccount}
      title={t.auth.signIn}
    >
      <form className={classNames.form} onSubmit={onSubmit}>
        <div className={classNames.container}>
          <Controller
            control={control}
            name={'email'}
            render={({ field }) => (
              <Input label={t.auth.email} placeholder={t.input.email} {...field} />
            )}
          />
          <Controller
            control={control}
            name={'password'}
            render={({ field }) => (
              <Input
                label={t.auth.password}
                placeholder={t.input.password}
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
  const { t } = useTranslation()
  const classNames = {
    errorMessage: styles.errorMessage,
  } as const

  return (
    <Typography className={classNames.errorMessage} variant={'text14'}>
      {(errors.email?.message && t.auth.emailType) ||
        (errors.password?.message && t.auth.passwordMustContain) ||
        t.auth.incorrectFields}
    </Typography>
  )
}

const FormButtons = () => {
  const { t } = useTranslation()
  const classNames = {
    button: styles.button,
    password: styles.password,
  } as const

  return (
    <div className={classNames.button}>
      <Button asChild className={classNames.password} variant={'link'}>
        <Link href={ROUTES.FORGOT_PASSWORD}>
          <Typography variant={'text14'}>{t.auth.forgotPassword}</Typography>
        </Link>
      </Button>
      <Button type={'submit'} variant={'primary'}>
        {t.auth.signIn}
      </Button>
    </div>
  )
}
