import { useState } from 'react'

import {
  useDeletePostMutation,
  useDeleteUploadImageMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from '@/features'

type PostProps = {
  handleClose: () => void
  postId: number
  selectedImage?: null | string
}
export const usePost = ({ handleClose, postId, selectedImage }: PostProps) => {
  const { data: postById } = useGetPostByIdQuery({ postId })
  const [deleteImage] = useDeleteUploadImageMutation()
  const [deletePost] = useDeletePostMutation()
  const [updateDescription] = useUpdatePostMutation()
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(postById?.description || '')
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
  const [showConfirmCloseModal, setShowConfirmCloseModal] = useState(false)

  const isEditingOrDeleting = postId > -1
  // Логика удаления поста и картинки при подтверждении
  const confirmDelete = async () => {
    if (selectedImage && isEditingOrDeleting) {
      await deleteImage({ uploadId: selectedImage }) // Удаляем картинку
    }
    await deletePost({ postId }) // Удаляем пост
    handleClose() // Закрываем модалку
  }
  const saveDescriptionChanges = async () => {
    if (isEditingOrDeleting) {
      await updateDescription({ description, postId }) // Сохраняем новое описание
      setIsEditing(false) // Отключаем режим редактирования
    }
  }

  return {
    confirmDelete,
    description,
    isEditing,
    postById,
    saveDescriptionChanges,
    setDescription,
    setIsEditing,
    setShowConfirmCloseModal,
    setShowConfirmDeleteModal,
    showConfirmCloseModal,
    showConfirmDeleteModal,
  }
}
