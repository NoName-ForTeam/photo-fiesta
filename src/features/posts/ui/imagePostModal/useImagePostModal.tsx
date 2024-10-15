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
  const [createPost] = useCreatePostMutation()
  const [uploadImage] = useUploadPostImageMutation()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(true)
  const [postId, setPostId] = useState<number>()
  const [showConfirmModal, setShowConfirmModal] = useState(false)

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
    try {
      if (!selectedImage) {
        throw new Error('No image selected')
      }
      const formData = new FormData()

      const blob = await (await fetch(selectedImage)).blob()

      formData.append('file', blob, 'image.jpg')

      const imageUploadData = await uploadImage(formData).unwrap()

      // Создаем пост
      await createPost({
        childrenMetadata: Array.isArray(imageUploadData)
          ? imageUploadData.map(img => ({ uploadId: img.uploadId }))
          : [{ uploadId: imageUploadData.images[0]?.uploadId }],
        description: data.description,
      })

      if (postId) {
        setPostId(postId)
      }
      handleClose()
      setIsOpenModal(false)
    } catch (error) {
      console.error('Error during post creation', error)
      handleErrorResponse<FormValues>({ badRequestSchema, error, setError })
    }
  })

  return {
    control,
    errors,
    isOpenModal,
    onSubmit,
    postId,
    setIsOpenModal,
    setPostId,
    setShowConfirmModal,
    showConfirmModal,
  }
}
