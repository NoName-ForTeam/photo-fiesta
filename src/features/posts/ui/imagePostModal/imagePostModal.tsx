import { useState } from 'react'

import { GetPostResponse } from '@/features/posts/api/posts.types'
import { ImageOutline } from '@/shared/assets'
import { Modal, Typography } from '@photo-fiesta/ui-lib'

import styles from '../postList/postList.module.scss'

export const ImagePostModal = ({
  createdAt,
  description,
  images,
  likesCount,
  location,
  userName,
}: GetPostResponse) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>()
  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  return (
    <div>
      <div className={styles.imageWrapper} onClick={handleOpenModal}>
        {images?.length ? (
          // <Image alt={'Post image'} height={200} src={images[0].url} width={200} />
          <img alt={'Post image'} height={200} src={images[0].url} width={200} />
        ) : (
          <ImageOutline />
        )}
      </div>
      <Modal onOpenChange={handleCloseModal} open={isOpenModal}>
        <div className={styles.modalContent}>
          {/*<Image alt={'Post image'} height={400} src={images[0].url} width={400} />*/}
          <img alt={'Post image'} height={400} src={images[0].url} width={400} />
          <div className={styles.modalInfo}>
            <Typography variant={'h3'}>{userName}</Typography>
            <Typography>{location}</Typography>
            <Typography>{description}</Typography>
            <Typography>{`Likes: ${likesCount}`}</Typography>
            <Typography>{createdAt}</Typography>
          </div>
        </div>
      </Modal>
    </div>
  )
}
