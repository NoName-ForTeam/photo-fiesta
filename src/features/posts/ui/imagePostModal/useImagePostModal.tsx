import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useCreatePostMutation, useUploadPostImageMutation } from '@/features'
import { createBadRequestSchema, handleErrorResponse } from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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

type UseImagePostModalProps = {
  handleClose: () => void
  selectedImage?: null | string
}
export const useImagePostModal = ({ handleClose, selectedImage }: UseImagePostModalProps) => {
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation()
  const [uploadImage, { isLoading: isUploading }] = useUploadPostImageMutation()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true)
  const [postId, setPostId] = useState<number>()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(postDescriptionSchema),
  })

  const onSubmit = handleSubmit(async (data: FormValues) => {
    console.log('Submitting form with data:', data)
    console.log('Selected image:', selectedImage)
    try {
      if (!selectedImage) {
        console.error('No image selected')

        return
      }
      console.log('Form Data:', data)
      const formData = new FormData()

      const blob = await (await fetch(selectedImage)).blob()

      formData.append('file', blob, 'image.jpg')

      const imageUploadData = await uploadImage(formData).unwrap()

      // Создаем пост
      if (Array.isArray(imageUploadData)) {
        await createPost({
          childrenMetadata: imageUploadData.map((img: { uploadId: string }) => ({
            uploadId: img.uploadId,
          })),
          description: data.description,
        })
      } else {
        // Обработка случая, когда imageUploadData не является массивом
        await createPost({
          childrenMetadata: [{ uploadId: imageUploadData.images[0]?.uploadId }],
          description: data.description,
        })
      }
      if (postId) {
        setPostId(postId)
      }
      handleClose()
      setIsOpenModal(false)
    } catch (error) {
      console.error('Error during post creation', error)
      handleErrorResponse<FormValues>({ badRequestSchema, error, setError })
    }
    console.log(data.description)
    console.log(selectedImage)
  })

  return {
    control,
    errors,
    isCreatingPost,
    isOpenModal,
    isUploading,
    onSubmit,
    postId,
    setIsOpenModal,
  }
}
