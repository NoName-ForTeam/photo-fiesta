import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
  useCreatePostMutation,
  useGetPostByIdQuery,
  useImagePostModal,
  useUpdatePostMutation,
  useUploadPostImageMutation,
} from '@/features'
import { createBadRequestSchema, handleErrorResponse } from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormTextArea, Typography } from '@photo-fiesta/ui-lib'
import { z } from 'zod'

import styles from './postForm.module.scss'

const postDescriptionSchema = z.object({
  description: z
    .string()
    .min(1, 'Minimum number of characters 1')
    .max(500, 'Maximum number of characters 500'),
  // location: z.string(),
  //TODO: check type of this field(location)
})
const badRequestSchema = createBadRequestSchema(['description'])

export type FormValues = z.infer<typeof postDescriptionSchema>

type PostFormProps = {
  handleClose: () => void
  isEditing: boolean
  postId: number
  selectedImage?: null | string
}

export const PostForm = ({ handleClose, isEditing, postId, selectedImage }: PostFormProps) => {
  const [createPost] = useCreatePostMutation()
  const [uploadImage] = useUploadPostImageMutation()
  const [updateDescription] = useUpdatePostMutation()
  const { data: post } = useGetPostByIdQuery({ postId }, { skip: !postId })
  const { setIsEditing, setIsOpenModal } = useImagePostModal({ handleClose, postId })

  const [charCount, setCharCount] = useState(0)

  const {
    control,

    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>({
    defaultValues: { description: post?.description || '' },
    mode: 'onBlur',
    resolver: zodResolver(postDescriptionSchema),
  })

  const onSubmit = handleSubmit(async (data: FormValues) => {
    try {
      if (!selectedImage) {
        throw new Error('No image selected')
      }
      const formData = new FormData()

      const blob = await (await fetch(selectedImage)).blob()

      formData.append('file', blob, 'image.jpg')

      const imageUploadData = await uploadImage(formData).unwrap()

      await createPost({
        childrenMetadata: Array.isArray(imageUploadData)
          ? imageUploadData.map(img => ({ uploadId: img.uploadId }))
          : [{ uploadId: imageUploadData.images[0]?.uploadId }],
        description: data.description,
      })

      handleClose()
      setIsOpenModal(false)
    } catch (error) {
      console.error('Error during post creation', error)
      handleErrorResponse<FormValues>({ badRequestSchema, error, setError })
    }
  })
  const saveDescriptionChanges = handleSubmit(async (data: FormValues) => {
    try {
      await updateDescription({ description: data.description, postId })
      setIsEditing(false)
      handleClose()
    } catch (error) {
      handleErrorResponse<FormValues>({ badRequestSchema, error, setError })
    }
  })
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
              label={isEditing ? 'Edit post description' : 'Add publication description'}
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
