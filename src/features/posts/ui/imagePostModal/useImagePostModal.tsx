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
  viewMode?: boolean // Whether the modal is in view mode or not
}

/**
 * A custom hook for managing the state and behavior of the ImagePostModal component.
 */

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

  /** Delete post function */
  const confirmDelete = async () => {
    if (selectedImage) {
      /**  Delete the image, and if the operation is successful, then delete all posts with the same description */
      await deleteImage({ uploadId: selectedImage })
    }
    await deletePost({ postId })
    handleClose()
  }

  /**
   * Changes the current step to the next or previous step based on the `direction` parameter.
   * If the modal is not in view mode, it updates the `step` state accordingly.
   */
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

  /**The function aborts the process of editing a post and does not save any changes */
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
