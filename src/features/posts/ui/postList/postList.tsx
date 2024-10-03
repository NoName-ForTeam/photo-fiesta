import { useState } from 'react'

import { useGetUserPostsQuery } from '@/features/posts'
import { ImageOutline } from '@/shared/assets'
import { Modal } from '@photo-fiesta/ui-lib'
import Image from 'next/image'

import styles from './postList.module.scss'

type Props = { userId: number | undefined }

export const PostList = ({ userId }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const { data: userPosts } = useGetUserPostsQuery({ userId })

  if (!userPosts?.items.length) {
    return (
      <div className={styles.placeholder}>
        <ImageOutline className={styles.icon} />
      </div>
    )
  }

  return (
    <div className={styles.postGrid}>
      {userPosts.items.map(post => {
        const handleOpenImageModal = () => {
          setOpenModal(true)
          // router.push('/imagePostModal')
        }

        return (
          <>
            <Image
              alt={'post image'}
              height={228}
              key={post.id}
              onClick={handleOpenImageModal}
              src={post.images[0]?.url}
              width={234}
            />
            {openModal && <Modal></Modal>}
          </>
        )
      })}
    </div>
  )
}
