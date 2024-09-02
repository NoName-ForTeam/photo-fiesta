import { useForm } from 'react-hook-form'

import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/assets'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormCheckbox, FormInput, Typography } from '@photo-fiesta/ui-lib'
import { z } from 'zod'

import s from './signUp.module.scss'

export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/
export const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/

const emailSchema = z.string().email('The email must match the format example@example.com')

const signUpSchema = z
  .object({
    agreeWithTerms: z.boolean(),
    confirmPassword: z.string(),
    email: emailSchema,
    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        PASSWORD_REGEX,
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~}'
      ),
    username: z
      .string()
      .min(6, 'Username must be at least 6 characters long')
      .max(30, 'Username must not exceed 30 characters')
      .regex(USERNAME_REGEX),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })
  .refine(data => data.agreeWithTerms, {
    message: 'You must agree to the terms and conditions',
    path: ['agreeWithTerms'],
  })

export type FormValues = z.infer<typeof signUpSchema>

export const SignUp = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted:', data)
    reset()
  }

  return (
    <div className={s.form}>
      <form className={s.formBox} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.titleSignUp} variant={'h1'}>
          Sign Up
          <span className={s.iconsBox}>
            <Button type={'button'} variant={'link'}>
              <GoogleSvgrepoCom1 className={s.icon} />
            </Button>
            <Button type={'button'} variant={'link'}>
              <GithubSvgrepoCom31 className={s.icon} />
            </Button>
          </span>
        </Typography>
        <div className={s.input}>
          <FormInput
            control={control}
            errorMessage={errors.username?.message}
            label={'Username'}
            name={'username'}
            placeholder={'Epam11'}
            type={'username'}
          />
        </div>
        <div className={s.input}>
          <FormInput
            control={control}
            errorMessage={errors.email?.message}
            label={'Email'}
            name={'email'}
            placeholder={'Epam@epam.com'}
            type={'email'}
          />
        </div>
        <div className={s.input}>
          <FormInput
            control={control}
            errorMessage={errors.password?.message}
            label={'Password'}
            name={'password'}
            placeholder={'jk34!@#GF'}
            variant={'password'}
          />
        </div>
        <div className={s.input}>
          <FormInput
            control={control}
            errorMessage={errors.confirmPassword?.message}
            label={'Password confirmation'}
            name={'confirmPassword'}
            placeholder={'Confirm Password'}
            variant={'password'}
          />
        </div>
        <div className={s.checkbox}>
          <FormCheckbox control={control} name={'agreeWithTerms'} />
          <Typography variant={'textSmall'}>
            {' '}
            I agree to the <a href={'/terms'}>Terms of Service</a> and{' '}
            <a href={'/privacy'}>Privacy Policy</a>
          </Typography>
        </div>
        <div className={s.submitBtn}>
          <Button fullWidth type={'submit'}>
            Sign Up
          </Button>
        </div>
        <Typography className={s.haveAcc} variant={'text16'}>
          Do you have an account?
        </Typography>
        <div className={s.signIn}>
          <Button asChild variant={'link'}>
            <a href={'/signIn'}>Sign In</a>
          </Button>
        </div>
      </form>
    </div>
  )
}
