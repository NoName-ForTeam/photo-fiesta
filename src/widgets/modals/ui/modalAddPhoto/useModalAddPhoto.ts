import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { ALLOWED_FORMATS, MAX_FILE_SIZE } from '@/shared/config'

type UseModalAddPhotoProps = {
  handleCloseModal: () => void
  // setImage: (image: null | string) => void
  isOpen?: boolean
  postPhoto?: boolean
  setImage: (image: null | string | string[]) => void
}

export const useModalAddPhoto = ({
  handleCloseModal,
  isOpen,
  postPhoto = false,
  setImage,
}: UseModalAddPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<null | string>(null)
  const [selectedImage, setSelectedImage] = useState<null | string | string[]>(null)
  // const [selectedImages, setSelectedImages] = useState<null | string[]>(null)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSelectedImage(null)

      setError(null)
      setIsSaved(false)
    }
  }, [isOpen])

  const handleClick = () => {
    fileInputRef.current?.click()
  }

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
        const image = e.target?.result as string

        setSelectedImage(image)
        setError(null)

        if (postPhoto) {
          setImage(image)
          setIsSaved(true)
          handleCloseModal()
        }
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
