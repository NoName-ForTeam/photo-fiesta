import { Button, Card, FormInput, Typography } from '@photo-fiesta/ui-lib'

import styles from './createNewPassword.module.scss'

import { useCreateNewPassword } from './useCreateNewPassword'

/**
 * CreateNewPassword Component
 *
 * This component renders a form that allows the user to create a new password by providing
 * a new password and its confirmation. It is used in the password recovery process.
 *
 * @component
 * @example
 * const App = () => (
 *   <div>
 *     <CreateNewPassword />
 *   </div>
 * );
 */

export const CreateNewPassword = () => {
  const { control, errors, handleSubmit } = useCreateNewPassword()
  const classNames = {
    card: styles.card,
    description: styles.description,
    fieldContainer: styles.container,
    submitBtn: styles.btn,
    title: styles.title,
  } as const

  return (
    <Card className={classNames.card}>
      <Typography className={classNames.title} variant={'h1'}>
        Create New Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className={classNames.fieldContainer}>
          <FormInput
            control={control}
            label={'New password'}
            name={'newPassword'}
            variant={'password'}
          />
          <FormInput
            control={control}
            errorMessage={errors.newPassword?.message}
            label={'Password confirmation'}
            name={'confirmPassword'}
            variant={'password'}
          />
        </div>
        <Typography as={'p'} className={classNames.description} variant={'text14'}>
          Your password must be between 6 and 20 characters
        </Typography>
        <Button className={classNames.submitBtn} fullWidth>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
