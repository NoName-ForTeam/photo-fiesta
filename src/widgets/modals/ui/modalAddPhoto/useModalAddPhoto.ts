import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { ALLOWED_FORMATS, MAX_FILE_SIZE } from '@/shared/config'

type UseModalAddPhotoProps = {
  handleCloseModal: () => void
  isOpen?: boolean
  postPhoto?: boolean
  setImage: (image: null | string | string[]) => void
  // setImage: (image: null | string) => void
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
  // const [selectedImage, setSelectedImage] = useState<null | string>(null)
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
        // setSelectedImage(prevSelected =>
        //   prevSelected
        //     ? [...(Array.isArray(prevSelected) ? prevSelected : [prevSelected]), image]
        //     : [image]
        // )
        setError(null)

        if (postPhoto) {
          setImage(image)
          // setImage(prevImage => {
          //   const newImages = prevImage ? (Array.isArray(prevImage) ? prevImage : [prevImage]) : []
          //
          //   return [...newImages, image] // Возвращаем новый массив с добавленным изображением
          // })
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
