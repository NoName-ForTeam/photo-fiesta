import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  useCreatePostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useUploadPostImageMutation,
} from '@/features'
import { createBadRequestSchema, handleErrorResponse, postDescriptionSchema } from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type FormValues = z.infer<typeof postDescriptionSchema>
const badRequestSchema = createBadRequestSchema(['description'])

type UsePostFormProps = {
  handleClose: () => void
  postId?: number | undefined
  // selectedImage?: null | string | string[]
  selectedImage?: null | string
  setIsEditing: (isEditing: boolean) => void // пропс для изменения состояния
}

export const usePostForm = ({
  handleClose,
  postId,
  selectedImage,
  setIsEditing,
}: UsePostFormProps) => {
  const [createPost] = useCreatePostMutation()
  const [uploadImage] = useUploadPostImageMutation()
  const [updateDescription] = useUpdatePostMutation()
  const { data: post } = useGetPostByIdQuery({ postId }, { skip: !postId })

  const [isOpenModal, setIsOpenModal] = useState<boolean>(true)

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

  /** Submit function for createPage description in post modal */
  const onSubmit = handleSubmit(async (data: FormValues) => {
    try {
      if (!selectedImage || (Array.isArray(selectedImage) && selectedImage.length === 0)) {
        toast.error('No image selected')

        return
      }
      const formData = new FormData()

      if (typeof selectedImage === 'string') {
        const blob = await (await fetch(selectedImage)).blob()

        formData.append('file', blob, 'image.jpg')
      }

      // Если selectedImage — это массив строк, загружаем все изображения
      if (Array.isArray(selectedImage)) {
        for (let i = 0; i < selectedImage.length; i++) {
          const image = selectedImage[i]
          const blob = await (await fetch(image)).blob()

          formData.append('file', blob, `image_${i}.jpg`)
        }
      }
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

  /** Submit function for edit description in post modal */
  const saveDescriptionChanges = handleSubmit(async (data: FormValues) => {
    if (postId) {
      try {
        await updateDescription({ description: data.description, postId })
        setIsEditing(false)
        handleClose()
      } catch (error) {
        handleErrorResponse<FormValues>({ badRequestSchema, error, setError })
      }
    }
  })

  return {
    charCount,
    control,
    errors,
    isOpenModal,
    onSubmit,
    saveDescriptionChanges,
    setCharCount,
  }
}
