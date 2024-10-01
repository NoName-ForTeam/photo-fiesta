import { SentEmail } from '@/features'
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/shared/assets'
import { ROUTES } from '@/shared/config'
import { Trans } from '@/shared/ui'
import { useTranslation } from '@/shared/utils'
import { Button, Card, FormCheckbox, FormInput, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './signUp.module.scss'

import { useSignUpForm } from './useSignUpForm'

export const SignUp = () => {
  const { t } = useTranslation()
  const { control, errors, isOpen, onCloseModalHandler, onSubmit, userEmail } = useSignUpForm()

  const classNames = {
    card: styles.card,
    checkbox: styles.checkbox,
    error: styles.error,
    haveAcc: styles.haveAcc,
    icon: styles.icon,
    iconsBox: styles.iconsBox,
    input: styles.input,
    signIn: styles.signIn,
    submitBtn: styles.submitBtn,
    titleSignUp: styles.titleSignUp,
  }

  return (
    <>
      <Card className={classNames.card}>
        <Typography className={classNames.titleSignUp} variant={'h1'}>
          {t.auth.signUp}
        </Typography>
        <span className={classNames.iconsBox}>
          <Button asChild type={'button'} variant={'icon-link'}>
            {/*TODO: check path for links*/}
            <Link href={'#'}>
              <GoogleSvgrepoCom1 className={classNames.icon} />
            </Link>
          </Button>
          <Button asChild type={'button'} variant={'icon-link'}>
            {/*TODO: check path for links*/}
            <Link href={'#'}>
              <GithubSvgrepoCom31 className={classNames.icon} />
            </Link>
          </Button>
        </span>
        <form onSubmit={onSubmit}>
          <div className={classNames.input}>
            <FormInput
              control={control}
              errorMessage={errors.userName?.message}
              label={t.auth.userName}
              name={'userName'}
              placeholder={'Epam11'}
              type={'username'}
            />
          </div>
          <div className={classNames.input}>
            <FormInput
              control={control}
              errorMessage={errors.email?.message}
              label={t.auth.email}
              name={'email'}
              placeholder={'Epam@epam.com'}
              type={'email'}
            />
          </div>
          <div className={classNames.input}>
            <FormInput
              control={control}
              errorMessage={errors.password?.message}
              label={t.auth.password}
              name={'password'}
              placeholder={'jk34!@#GF'}
              variant={'password'}
            />
          </div>
          <div className={classNames.input}>
            <FormInput
              control={control}
              errorMessage={errors.confirmPassword?.message}
              label={t.auth.confirmPassword}
              name={'confirmPassword'}
              placeholder={t.auth.confirm}
              variant={'password'}
            />
          </div>
          <div className={classNames.checkbox}>
            <FormCheckbox control={control} name={'agreeWithTerms'} />
            <Typography variant={'textSmall'}>
              <Trans
                tags={{
                  1: () => (
                    <Typography as={Link} href={ROUTES.TERMS_OF_SERVICE} variant={'link'}>
                      {t.auth.termsOfService}
                    </Typography>
                  ),
                  2: () => (
                    <Typography as={Link} href={ROUTES.PRIVACY_POLICY} variant={'link'}>
                      {t.auth.privacyPolicy}
                    </Typography>
                  ),
                }}
                text={t.auth.registrationAgree}
              />
            </Typography>
          </div>
          <div className={classNames.submitBtn}>
            <Button fullWidth type={'submit'}>
              {t.auth.signUp}
            </Button>
          </div>
        </form>
        <Typography className={classNames.haveAcc} variant={'text16'}>
          {t.auth.haveAccount}
        </Typography>
        <div className={classNames.signIn}>
          <Button asChild variant={'link'}>
            <Link href={ROUTES.SIGN_IN}>{t.auth.signIn}</Link>
          </Button>
        </div>
      </Card>
      {userEmail && <SentEmail closeModal={onCloseModalHandler} email={userEmail} open={isOpen} />}
    </>
  )
}
