import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormCheckbox, FormInput, Typography } from '@photo-fiesta/ui-lib'
import { z } from 'zod'

import s from './signUp.module.scss'

const emailSchema = z.string().email()

const signUpSchema = z
  .object({
    agreeWithTerms: z.boolean(),
    confirmPassword: z.string().min(5),
    email: emailSchema,
    password: z.string().min(5),
    username: z.string().min(5),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type FormValues = z.infer<typeof signUpSchema>

export const SignUp = ({}) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = () => {}

  return (
    <div className={s.form}>
      <form className={s.formBox} onSubmit={handleSubmit(onSubmit)}>
        <Typography as={'h1'} className={s.titleSignUp} variant={'h1'}>
          Sign Up
          <span>
            {/*<GoogleSvgrepoCom1 />*/}
            {/*<GithubSvgrepoCom31 />*/}
          </span>
        </Typography>
        <div className={s.input}>
          <FormInput
            control={control}
            label={'Username'}
            name={'username'}
            placeholder={'Epam11'}
            type={'username'}
          />
        </div>
        <div className={s.input}>
          <FormInput
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={'Epam@epam.com'}
            type={'email'}
          />
        </div>
        <div className={s.input}>
          <FormInput
            control={control}
            label={'Password'}
            name={'password'}
            placeholder={'jk34!@#GF'}
            type={'password'}
          />
        </div>
        <div className={s.input}>
          <FormInput
            control={control}
            label={'Password Confirmation'}
            name={'confirmPassword'}
            placeholder={'Confirm Password'}
            type={'password'}
          />
        </div>
        <div>
          <FormCheckbox control={control} name={'agreeWithTerms'} />
          <span>
            {' '}
            I agree to the <a href={'/terms'}>Terms of Service</a> and{' '}
            <a href={'/privacy'}>Privacy Policy</a>
          </span>
        </div>
        <div className={s.submitBtn}>
          <Button fullWidth type={'submit'}>
            Sign Up
          </Button>
        </div>
        <div className={s.haveAcc}>Do you have an account?</div>
        <div className={s.signIn}>
          <a>Sign In</a>
        </div>
      </form>
    </div>
  )
}
