import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { ALLOWED_FORMATS, MAX_FILE_SIZE } from '@/shared/config'

type UseModalAddPhoto = {
  handleCloseModal: () => void
  isOpen: boolean
  setImage: (image: null | string) => void
}

export const useModalAddPhoto = ({ handleCloseModal, isOpen, setImage }: UseModalAddPhoto) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<null | string>(null)
  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const [isSaved, setIsSaved] = useState(false)

  /**
   * Reset states when modal opens
   */
  useEffect(() => {
    if (isOpen) {
      setSelectedImage(null)
      setError(null)
      setIsSaved(false)
    }
  }, [isOpen])

  /**
   * Trigger click on file input when choose file for profile photo
   */
  const handleClick = () => {
    fileInputRef.current?.click()
  }

  /**
   * Handle file selection
   * @param {ChangeEvent<HTMLInputElement>} event - The file change event
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      if (!ALLOWED_FORMATS.includes(file.type)) {
        setError('The format of the uploaded photo must be PNG and JPEG')
        setSelectedImage(null)

        return
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('Photo size must be less than 10 MB!')
        setSelectedImage(null)

        return
      }

      const reader = new FileReader()

      reader.onload = e => {
        setSelectedImage(e.target?.result as string)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
    event.target.value = ''
  }

  const handleSave = () => {
    if (selectedImage) {
      setImage(selectedImage)
      setError(null)
      setIsSaved(true)
      handleCloseModal()
    }
  }

  return {
    error,
    fileInputRef,
    handleClick,
    handleFileChange,
    handleSave,
    isSaved,
    selectedImage,
  }
}
