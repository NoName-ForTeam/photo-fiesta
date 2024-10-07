import { useEffect, useRef, useState } from 'react'
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
  viewMode?: boolean
}
export const useImagePostModal = ({
  handleClose,
  selectedImage,
  viewMode,
}: UseImagePostModalProps) => {
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation()
  const [uploadImage, { isLoading: isUploading }] = useUploadPostImageMutation()
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

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!viewMode && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowConfirmModal(true) // Открываем модалку подтверждения
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [viewMode])

  const onSubmit = handleSubmit(async (data: FormValues) => {
    try {
      if (!selectedImage) {
        console.error('No image selected')

        return
      }
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
  })

  return {
    control,
    errors,
    isCreatingPost,
    isOpenModal,
    isUploading,
    modalRef,
    onSubmit,
    postId,
    setIsOpenModal,
    setShowConfirmModal,
    showConfirmModal,
  }
}
