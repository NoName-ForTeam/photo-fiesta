import { useTranslation } from '@/shared/utils'
import { Button, Card, FormInput, Typography } from '@photo-fiesta/ui-lib'

import styles from './createNewPassword.module.scss'

import { useCreateNewPassword } from './useCreateNewPassword'

/**
 * CreateNewPassword Component
 * This component renders a form that allows the user to create a new password by providing
 * a new password and its confirmation. It is used in the password createNewPassword process.
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
  const { t } = useTranslation()
  const { control, errors, onSubmit } = useCreateNewPassword()
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
        {t.auth.createNewPassword}
      </Typography>
      <form onSubmit={onSubmit}>
        <div className={classNames.fieldContainer}>
          <FormInput
            control={control}
            label={t.auth.newPassword}
            name={'newPassword'}
            variant={'password'}
          />
          <FormInput
            control={control}
            errorMessage={errors.newPassword?.message}
            label={t.auth.confirmPassword}
            name={'confirmPassword'}
            variant={'password'}
          />
        </div>
        <Typography as={'p'} className={classNames.description} variant={'text14'}>
          {t.auth.passwordRequirements(6, 20)}
        </Typography>
        <Button className={classNames.submitBtn} fullWidth type={'submit'}>
          {t.auth.createNewPassword}
        </Button>
      </form>
    </Card>
  )
}
