import { useState } from 'react'
import { toast } from 'react-toastify'

import { useDeleteAvatarMutation } from '@/features'

export const usePhotoPreview = (onDeletePhoto: () => void) => {
  const [isOpen, setIsOpen] = useState(false)
  const [deleteAvatar] = useDeleteAvatarMutation()

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  /**
   * Handles the confirmation of photo deletion.
   * Attempts to delete the avatar, updates state, and shows appropriate toast messages.
   */
  const handleConfirmation = async () => {
    try {
      await deleteAvatar().unwrap()
      setIsOpen(false)
      onDeletePhoto()
      toast.success('Photo deleted successfully')
    } catch (error: unknown) {
      toast.error('Failed to delete photo')
    }
  }

  return {
    handleCloseModal,
    handleConfirmation,
    handleOpenModal,
    isOpen,
  }
}
