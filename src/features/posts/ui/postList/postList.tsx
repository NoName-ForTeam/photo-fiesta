import { useState } from 'react'

import { Avatar } from '@/features'
import { ImagePostModal, useGetUserPostsQuery } from '@/features/posts'
import { ImageOutline } from '@/shared/assets'
import Image from 'next/image'

import styles from './postList.module.scss'

type Props = {
  avatar: Avatar[] | undefined
  userId: number
}

export const PostList = ({ avatar, userId }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null)
  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const { data: userPosts } = useGetUserPostsQuery({ userId }, { skip: !userId })

  if (!userPosts?.items.length) {
    return (
      <div className={styles.placeholder}>
        <ImageOutline className={styles.icon} />
      </div>
    )
  }

  const handleOpenImageModal = (postId: number, imageUrl: string) => {
    setSelectedPostId(postId)
    setSelectedImage(imageUrl)
    setOpenModal(true)
  }

  return (
    <div className={styles.postGrid}>
      {userPosts.items.map(post => (
        <Image
          alt={'post image'}
          height={228}
          key={post.id}
          onClick={() => handleOpenImageModal(post.id, post.images[0]?.url)}
          src={post.images[0]?.url}
          width={234}
        />
      ))}
      {openModal && selectedPostId && selectedImage && (
        <ImagePostModal
          avatar={avatar}
          handleClose={() => setOpenModal(false)}
          postId={selectedPostId}
          selectedImage={selectedImage}
          userId={userId}
          viewMode
        />
      )}
    </div>
  )
}
