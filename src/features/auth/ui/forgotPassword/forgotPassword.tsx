import { SentEmail } from '@/features'
import { ROUTES } from '@/shared/config'
import { ReCaptcha } from '@/shared/ui/reCaptcha/reCaptcha'
import { Button, Card, FormInput, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './forgotPassword.module.scss'

import { useForgotPassword } from './useForgotPassword'

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
  const {
    RECAPTCHA_KEY,
    closeModal,
    control,
    errors,
    getValues,
    isLinkSent,
    isModalOpen,
    onSubmit,
    reCaptchaHandler,
    setIsLinkSent,
  } = useForgotPassword()
  const classNames = {
    actionsContainter: styles.actionsContainter,
    afterInfo: styles.afterInfo,
    card: styles.card,
    container: styles.container,
    description: styles.description,
    field: styles.field,
    form: styles.form,
    link: styles.link,
    recaptcha: styles.recaptcha,
    title: styles.title,
  } as const

  const button = isLinkSent ? (
    <Button fullWidth onClick={() => setIsLinkSent(false)}>
      Send Link Again
    </Button>
  ) : (
    <Button fullWidth>Send Link</Button>
  )

  return (
    <>
      <Card className={classNames.card}>
        <Typography className={classNames.title} variant={'h1'}>
          Forgot Password
        </Typography>
        <form className={classNames.form} onSubmit={onSubmit}>
          <FormInput
            className={classNames.field}
            control={control}
            errorMessage={errors.email?.message}
            label={'Email'}
            name={'email'}
            placeholder={'Epam@epam.com'}
          />
          <Typography className={classNames.description} variant={'text14'}>
            Enter your email address and we will send you further instructions
          </Typography>
          {isLinkSent && (
            <Typography className={classNames.afterInfo} variant={'text14'}>
              The link has been sent by email. If you don’t receive an email send link again
            </Typography>
          )}
          <div className={classNames.container}>
            <div className={classNames.actionsContainter}>
              {button}
              <Button asChild className={classNames.link} variant={'link'}>
                <Link href={ROUTES.SIGN_IN}>Back to Sign In</Link>
              </Button>
            </div>

            {!isLinkSent && (
              <ReCaptcha
                className={classNames.recaptcha}
                onVerify={reCaptchaHandler}
                siteKey={RECAPTCHA_KEY!}
              />
            )}
          </div>
        </form>
      </Card>

      <SentEmail closeModal={closeModal} email={getValues('email')} open={isModalOpen} />
    </>
  )
}
