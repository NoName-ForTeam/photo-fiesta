import { Controller } from 'react-hook-form'

import { usePostForm } from '@/features'
import { Button, FormTextArea, Typography } from '@photo-fiesta/ui-lib'

import styles from './postForm.module.scss'

type PostFormProps = {
  handleClose: () => void
  isEditing: boolean
  postId: number
  selectedImage?: null | string
}
/**
 * The PostForm component handles creating and editing posts description with controlled textarea and zod-validation.
 */
export const PostForm = ({ handleClose, isEditing, postId, selectedImage }: PostFormProps) => {
  const { charCount, control, errors, onSubmit, saveDescriptionChanges, setCharCount } =
    usePostForm({ handleClose, postId, selectedImage })

  /**
   * This constant is used to render the `FormTextArea` component with the appropriate label and placeholder
   * based on whether the post is being created or edited.
   */
  const formContent = (
    <>
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
              onChangeValue={value => {
                field.onChange(value)
                setCharCount(value.length)
              }}
              placeholder={isEditing ? 'Edit description' : 'Text-area'}
            />
            {/*TODO: fix charCount in FormTextArea*/}
            <Typography className={styles.char} variant={'textSmall'}>
              {charCount}/500
            </Typography>
          </>
        )}
      />
    </>
  )

  return (
    <div>
      <div>
        <form id={'postDescription'} onSubmit={isEditing ? saveDescriptionChanges : onSubmit}>
          {formContent}
          {isEditing && (
            <Button type={'submit'} variant={'primary'}>
              Save Changes
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}
