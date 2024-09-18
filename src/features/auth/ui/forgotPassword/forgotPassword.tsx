import { SentEmail } from '@/features'
import { ROUTES } from '@/shared/config'
import { ReCaptcha } from '@/shared/ui'
import { useTranslation } from '@/shared/utils'
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
  const { t } = useTranslation()
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
    actionsContainer: styles.actionsContainer,
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
      {t.auth.sendLinkAgain}
    </Button>
  ) : (
    <Button fullWidth>{t.auth.sendLink}</Button>
  )

  return (
    <>
      <Card className={classNames.card}>
        <Typography className={classNames.title} variant={'h1'}>
          {t.auth.forgotPassword}
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
            {t.auth.enterEmailInstructions}
          </Typography>
          {isLinkSent && (
            <Typography className={classNames.afterInfo} variant={'text14'}>
              {t.auth.linkSentByEmail}
            </Typography>
          )}
          <div className={classNames.container}>
            <div className={classNames.actionsContainer}>
              {button}
              <Button asChild className={classNames.link} variant={'link'}>
                <Link href={ROUTES.SIGN_IN}>{t.auth.backToSignUp}</Link>
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
