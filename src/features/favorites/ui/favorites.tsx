import { useEffect, useState } from 'react'

import { PostList } from '@/features'
import { Loader } from '@/shared/ui'
import { Typography } from '@photo-fiesta/ui-lib'

import styles from '@/features/profile/ui/profile/profile.module.scss'

import { useFavoritePosts } from './useFavoritePost'

/**
 * Favorites component that displays the list of user's favorite posts.
 */

export const Favorites = () => {
  const { isLoading, posts } = useFavoritePosts()
  const classNames = {
    postsWrapper: styles.postsWrapper,
    title: styles.title,
    wrapper: styles.wrapper,
  } as const

  const [isClient, setIsClient] = useState(false)

  // fix issue Hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={classNames.wrapper}>
      <Typography variant={'h1'}>Favorites</Typography>
      <div className={classNames.postsWrapper}>
        <PostList
          avatar={[]}
          initialFollowState={false}
          initialPosts={{ items: posts, pageSize: 8, totalCount: 0, totalUsers: 0 }}
          isOwnProfile={false}
          userId={0}
        />
      </div>
    </div>
  )
}
