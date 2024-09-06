import { useForgotPassword } from '@/features/auth/ui/forgotPassword/useForgotPassword'
import { Button, Card, FormInput, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './forgotPassword.module.scss'

/**
 * ForgotPassword component renders a form for users to reset their password.
 *
 * Example:
 * function App() {
 *   return (
 *     <div>
 *       <ForgotPassword />
 *     </div>
 *   );
 * }
 */

export const ForgotPassword = () => {
  const { control, errors, handleSubmit, onSubmit } = useForgotPassword()
  const classNames = {
    card: styles.card,
    description: styles.description,
    form: styles.form,
    link: styles.link,
    title: styles.title,
  } as const

  return (
    <Card className={classNames.card}>
      <Typography className={classNames.title} variant={'h1'}>
        Forgot Password
      </Typography>
      <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
          placeholder={'Epam@epam.com'}
        />
        <Typography className={classNames.description} variant={'text14'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button fullWidth>Send Link</Button>
      </form>
      <Button asChild className={classNames.link} variant={'link'}>
        <Link href={'/signIn'}>Back to Sign In</Link>
        {/*todo: check path for links*/}
      </Button>

      {/*TODO: add recaptcha and modal*/}
    </Card>
  )
}
