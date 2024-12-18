import { Controller } from 'react-hook-form'

import { usePostForm } from '@/features'
import { Button, FormTextArea, Typography } from '@photo-fiesta/ui-lib'

import styles from './postForm.module.scss'

type PostFormProps = {
  handleClose: () => void
  isEditing?: boolean
  photos?: string[]
  postId?: number
  setIsEditing: (isEditing: boolean) => void
}
/**
 * The PostForm component handles creating and editing posts description with controlled textarea and zod-validation.
 */
export const PostForm = ({
  handleClose,
  isEditing,
  photos,
  postId,
  setIsEditing,
}: PostFormProps) => {
  const { control, errors, onSubmit, saveDescriptionChanges } = usePostForm({
    handleClose,
    photos,
    postId,
    setIsEditing,
  })

  return (
    <div className={styles.formContainer}>
      <form id={'postDescription'} onSubmit={isEditing ? saveDescriptionChanges : onSubmit}>
        <Controller
          control={control}
          name={'description'}
          render={({ field }) => (
            <>
              <FormTextArea
                {...field}
                control={control}
                error={errors.description?.message}
                label={'Add publication description'}
                onChangeValue={value => field.onChange(value)}
                placeholder={isEditing ? 'Edit description' : 'Text-area'}
              />
              <Typography className={styles.char} variant={'textSmall'}>
                {field.value.length || 0}/500
              </Typography>
            </>
          )}
        />
        {isEditing && (
          <Button type={'submit'} variant={'primary'}>
            Save Changes
          </Button>
        )}
      </form>
    </div>
  )
}
