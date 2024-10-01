import { useState } from 'react'

import { useGetUserPostsQuery } from '@/features/posts'
import { ImageOutline } from '@/shared/assets'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from './postList.module.scss'

type Props = { userId: number | undefined }

export const PostList = ({ userId }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const { data: userPosts } = useGetUserPostsQuery({ userId })

  const router = useRouter()

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
          openModal
          router.push('/imagePostModal')
        }

        return (
          <Image
            alt={'post image'}
            height={228}
            key={post.id}
            onClick={handleOpenImageModal}
            src={post.url}
            width={234}
          />
          // <ImagePostModal
          //   avatarOwner={post.avatarOwner}
          //   createdAt={post.createdAt}
          //   description={post.description}
          //   id={post.id}
          //   images={post.images}
          //   isLiked={post.isLiked}
          //   key={post.id}
          //   likesCount={post.count}
          //   location={post.location}
          //   owner={post.owner}
          //   ownerId={post.ownerId}
          //   updatedAt={post.updatedAt}
          //   userName={post.userName}
          // />
        )
      })}
    </div>
  )
}
