import { useState } from 'react'

import { Avatar, useCreatePostMutation, useUploadPostImageMutation } from '@/features'
import { ArrowIosBackOutline } from '@/shared/assets'
// import { ImageOutline } from '@/shared/assets'
import {
  Button,
  Modal,
  // ModalClose,
  ModalContent,
  ModalHeader,
  Typography,
} from '@photo-fiesta/ui-lib'
// import Image from 'next/image'

import styles from './imagePostModal.module.scss'
type Props = {
  avatar: Avatar[] | undefined
  handleClose: () => void
  selectedImage: null | string
  userId: number | undefined
}

export const ImagePostModal = ({ avatar, handleClose, selectedImage, userId }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true)
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation()
  const [uploadImage, { isLoading: isUploading }] = useUploadPostImageMutation()
  const [description, setDescription] = useState('')

  const handleSavePost = async () => {
    if (selectedImage && description) {
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
          description,
        })
      } else {
        // Обработка случая, когда imageUploadData не является массивом
        await createPost({
          childrenMetadata: [{ uploadId: imageUploadData.images[0]?.uploadId }],
          description,
        })
      }

      handleClose()
      setDescription('')
      setIsOpenModal(isOpenModal)
    }
    console.log(description)
    console.log(selectedImage)
  }

  return (
    <div className={styles.wrapper}>
      <Modal onOpenChange={handleClose} open={isOpenModal}>
        <ModalContent className={styles.content}>
          <ModalHeader className={styles.header}>
            <Button variant={'icon-link'}>
              <ArrowIosBackOutline />
            </Button>
            <Typography variant={'h1'}>Publication</Typography>
            <Button
              disabled={isCreatingPost || isUploading || !selectedImage || !description}
              onClick={handleSavePost}
              variant={'ghost'}
            >
              {/*{isCreatingPost || isUploading ? 'Saving...' : 'Save Post'}*/}
              Publish
            </Button>
          </ModalHeader>

          <div className={styles.main}>
            <div className={styles.imageWrapper}>
              {/*<Image alt={'Post image'} height={400} src={images[0].url} width={400} />*/}
              <img alt={'Post image'} height={400} src={selectedImage!} width={400} />
            </div>
            <div className={styles.form}>
              {/*<Image alt={'avatar'} src={avatar} />*/}
              <img alt={'avatar'} src={avatar?.[0].url} />
              <Typography variant={'h3'}>{userId}</Typography>
              <Typography>
                <textarea
                  onChange={e => setDescription(e.target.value)}
                  placeholder={'Write a description...'}
                  value={description}
                />
              </Typography>
              {/*<Typography>{location}</Typography>*/}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  )
}
