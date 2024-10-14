import { useState } from 'react'

import {
  useDeletePostMutation,
  useDeleteUploadImageMutation,
  useGetPostByIdQuery,
} from '@/features'

type UseImagePostModalProps = {
  handleClose: () => void
  postId: number
  selectedImage?: null | string
  viewMode?: boolean
}

export const useImagePostModal = ({
  handleClose,
  postId,
  selectedImage,
  viewMode,
}: UseImagePostModalProps) => {
  const { data: postById } = useGetPostByIdQuery({ postId }, { skip: !postId })
  const [deleteImage] = useDeleteUploadImageMutation()
  const [deletePost] = useDeletePostMutation()

  const [step, setStep] = useState<'cropping' | 'filters' | 'publication'>('cropping')
  const [isEditing, setIsEditing] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
  const [showConfirmCloseModal, setShowConfirmCloseModal] = useState(false)

  const confirmDelete = async () => {
    if (selectedImage) {
      await deleteImage({ uploadId: selectedImage })
    }
    await deletePost({ postId })
    handleClose()
  }

  const getStepTitle = () =>
    isEditing ? 'Edit Post' : step.charAt(0).toUpperCase() + step.slice(1)

  const changeStep = (direction: 'next' | 'prev') => {
    if (!viewMode) {
      if (direction === 'next') {
        setStep(prev => (prev === 'cropping' ? 'filters' : 'publication'))
      } else {
        setStep(prev => (prev === 'publication' ? 'filters' : 'cropping'))
      }
    }
  }

  const interruptionCreatePost = () => {
    setShowConfirmModal(false)
    handleClose()
  }

  return {
    changeStep,
    confirmDelete,
    getStepTitle,
    interruptionCreatePost,
    isEditing,
    isOpenModal,
    postById,
    setIsEditing,
    setIsOpenModal,
    setShowConfirmCloseModal,
    setShowConfirmDeleteModal,
    setShowConfirmModal,
    showConfirmCloseModal,
    showConfirmDeleteModal,
    showConfirmModal,
    step,
  }
}
