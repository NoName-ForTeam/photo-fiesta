import { SentEmail } from '@/features'
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/shared/assets'
import { ROUTES } from '@/shared/config'
import { Button, Card, FormCheckbox, FormInput, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './signUp.module.scss'

import { useSignUpForm } from './useSignUpForm'

export const SignUp = () => {
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
          Sign Up
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
              label={'Username'}
              name={'userName'}
              placeholder={'Epam11'}
              type={'username'}
            />
          </div>
          <div className={classNames.input}>
            <FormInput
              control={control}
              errorMessage={errors.email?.message}
              label={'Email'}
              name={'email'}
              placeholder={'Epam@epam.com'}
              type={'email'}
            />
          </div>
          <div className={classNames.input}>
            <FormInput
              control={control}
              errorMessage={errors.password?.message}
              label={'Password'}
              name={'password'}
              placeholder={'jk34!@#GF'}
              variant={'password'}
            />
          </div>
          <div className={classNames.input}>
            <FormInput
              control={control}
              errorMessage={errors.confirmPassword?.message}
              label={'Password confirmation'}
              name={'confirmPassword'}
              placeholder={'Confirm Password'}
              variant={'password'}
            />
          </div>
          <div className={classNames.checkbox}>
            <FormCheckbox control={control} name={'agreeWithTerms'} />
            <Typography variant={'textSmall'}>
              {' '}
              I agree to the <Link href={ROUTES.TERMS_OF_SERVICE}>Terms of Service</Link> and{' '}
              <Link href={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
            </Typography>
          </div>
          <div className={classNames.submitBtn}>
            <Button fullWidth type={'submit'}>
              Sign Up
            </Button>
          </div>
        </form>
        <Typography className={classNames.haveAcc} variant={'text16'}>
          Do you have an account?
        </Typography>
        <div className={classNames.signIn}>
          <Button asChild variant={'link'}>
            <Link href={ROUTES.SIGN_IN}>Sign In</Link>
          </Button>
        </div>
      </Card>
      {userEmail && <SentEmail closeModal={onCloseModalHandler} email={userEmail} open={isOpen} />}
    </>
  )
}
