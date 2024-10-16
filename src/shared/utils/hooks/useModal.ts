import { useState } from 'react'

type ModalType = 'Error' | 'Success' | null

/**
 * This hook provides functionality to control the visibility of a modal
 * and manage its title, as well as handle confirmation actions.
 */
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<ModalType>(null)

  return {
    isModalOpen,
    modalTitle,
    setIsModalOpen,
    setModalTitle,
  }
}
