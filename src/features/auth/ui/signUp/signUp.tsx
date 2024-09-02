import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/assets'
import { useSignUpForm } from '@/features/auth/ui/signUp/useSignUpForm'
import { Button, FormCheckbox, FormInput, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './signUp.module.scss'

export const SignUp = () => {
  const { control, errors, handleSubmit, onSubmit } = useSignUpForm()

  const classNames = {
    checkbox: styles.checkbox,
    error: styles.error,
    form: styles.form,
    formBox: styles.formBox,
    haveAcc: styles.haveAcc,
    icon: styles.icon,
    iconsBox: styles.iconsBox,
    input: styles.input,
    signIn: styles.signIn,
    submitBtn: styles.submitBtn,
    titleSignUp: styles.titleSignUp,
  }

  return (
    <div className={classNames.form}>
      <form className={classNames.formBox} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={classNames.titleSignUp} variant={'h1'}>
          Sign Up
          <span className={classNames.iconsBox}>
            <Button asChild type={'button'} variant={'link'}>
              <Link href={'#'}>
                <GoogleSvgrepoCom1 className={classNames.icon} />
              </Link>
            </Button>
            <Button asChild type={'button'} variant={'link'}>
              <Link href={'#'}>
                <GithubSvgrepoCom31 className={classNames.icon} />
              </Link>
            </Button>
          </span>
        </Typography>
        <div className={classNames.input}>
          <FormInput
            control={control}
            errorMessage={errors.username?.message}
            label={'Username'}
            name={'username'}
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
            I agree to the <Link href={'/terms'}>Terms of Service</Link> and{' '}
            <Link href={'/privacy'}>Privacy Policy</Link>
          </Typography>
        </div>
        <div className={classNames.submitBtn}>
          <Button fullWidth type={'submit'}>
            Sign Up
          </Button>
        </div>
        <Typography className={classNames.haveAcc} variant={'text16'}>
          Do you have an account?
        </Typography>
        <div className={classNames.signIn}>
          <Button asChild variant={'link'}>
            <Link href={'/signIn'}>Sign In</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
