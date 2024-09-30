import { useGetUserPostsQuery } from '@/features/posts'
import { ImagePostModal } from '@/features/posts/ui/imagePostModal/imagePostModal'
import { ImageOutline } from '@/shared/assets'

import styles from './postList.module.scss'

export const PostList = () => {
  const { data: userPosts } = useGetUserPostsQuery({})

  if (!userPosts?.items.length) {
    return (
      <div className={styles.placeholder}>
        <ImageOutline className={styles.icon} />
      </div>
    )
  }

  return (
    <div className={styles.postGrid}>
      {userPosts.items.map(post => (
        <ImagePostModal
          avatarOwner={post.avatarOwner}
          createdAt={post.createdAt}
          description={post.description}
          id={post.id}
          images={post.images}
          isLiked={post.isLiked}
          key={post.id}
          likesCount={post.count}
          location={post.location}
          owner={post.owner}
          ownerId={post.ownerId}
          updatedAt={post.updatedAt}
          userName={post.userName}
        />
      ))}
    </div>
  )
}
