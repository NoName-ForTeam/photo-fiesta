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
import { useRouter } from 'next/router'
import { z } from 'zod'

type FormValues = z.infer<typeof postDescriptionSchema>
const badRequestSchema = createBadRequestSchema(['description'])

type UsePostFormProps = {
  handleClose: () => void
  photos?: (File | string)[]
  postId?: number | undefined
  setIsEditing: (isEditing: boolean) => void
}

export const usePostForm = ({ handleClose, photos, postId, setIsEditing }: UsePostFormProps) => {
  const router = useRouter()
  const [createPost] = useCreatePostMutation()
  const [uploadImage] = useUploadPostImageMutation()
  const [updateDescription] = useUpdatePostMutation()
  const { data: post } = useGetPostByIdQuery({ postId }, { skip: !postId })

  const [isOpenModal, setIsOpenModal] = useState<boolean>(true)

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
      if (!photos || photos.length === 0) {
        toast.error('No image selected')

        return
      }
      const formData = new FormData()

      await Promise.all(
        photos.map(async (photo, i) => {
          if (typeof photo === 'string') {
            const blob = await (await fetch(photo)).blob()

            formData.append('file', blob, `image_${i}.jpg`)
          } else if (photo instanceof File) {
            formData.append('file', photo)
          }
        })
      )

      const imageUploadData = await uploadImage(formData).unwrap()

      await createPost({
        childrenMetadata: imageUploadData.images.map(img => ({ uploadId: img.uploadId })),
        description: data.description,
      })

      handleClose()
      await router.replace(router.asPath)
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
    control,
    errors,
    isOpenModal,
    onSubmit,
    saveDescriptionChanges,
  }
}
