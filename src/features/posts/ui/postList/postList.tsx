import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Avatar, GetPublicPostsResponse, ImagePostModal, useGetUserPostsQuery } from '@/features'
import { ImageOutline } from '@/shared/assets'
import { Loader } from '@/shared/ui'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from './postList.module.scss'

type PostListProps = {
  avatar: Avatar[]
  initialFollowState: boolean
  initialPosts: GetPublicPostsResponse
  isOwnProfile: boolean
  userId: number
}

/**
 * PostList component for displaying a user's posts with infinite scroll functionality.
 */
export const PostList = ({
  avatar,
  initialFollowState,
  initialPosts,
  isOwnProfile,
  userId,
}: PostListProps) => {
  const router = useRouter()
  const { postId, ...restQuery } = router.query

  const [endCursorPostId, setEndCursorPostId] = useState<null | number>(
    initialPosts.items[initialPosts.items.length - 1]?.id || null
  )

  const { data, isLoading } = useGetUserPostsQuery(
    {
      endCursorPostId: endCursorPostId || 0,
      pageSize: 8,
      sortBy: 'createdAt',
      sortDirection: 'desc',
      userId,
    },
    { skip: endCursorPostId === null }
  )

  const [modalData, setModalData] = useState<{
    images: string[]
    isOpen: boolean
    postId: null | number
  }>({ images: [], isOpen: false, postId: null })

  // Holds the list of posts for rendering.
  const [posts, setPosts] = useState(initialPosts.items)
  // State to track if more posts can be loaded.
  const [hasMore, setHasMore] = useState(posts.length < initialPosts.totalCount)

  /**
   * Updates the state of posts, the end cursor post ID, and the `hasMore` flag
   * whenever the `userId` or `initialPosts` props change.
   *
   * @description This hook ensures that the state is correctly updated when user ID
   * or initial posts data changes. It resets the `posts` array, calculates the
   * ID of the last post, and determines whether more posts can be loaded.
   */
  useEffect(() => {
    setPosts(initialPosts.items)
    setEndCursorPostId(initialPosts.items[initialPosts.items.length - 1]?.id || null)
    setHasMore(initialPosts.items.length < initialPosts.totalCount)
  }, [initialPosts])

  const classNames = {
    image: styles.image,
    postGrid: styles.postGrid,
  } as const

  /**
   * Opens the image modal and sets the selected post ID and image URL when
   * a post ID is found in the query parameters.
   *
   * @description This hook checks the `postId` query parameter and attempts to
   * find the corresponding post in the `posts` array. If a match is found, it
   * sets the post ID and image URL in state and opens the modal.
   */
  useEffect(() => {
    if (postId) {
      const parsedPostId = Number(postId)
      const post = posts.find(p => p.id === parsedPostId)

      if (post) {
        setModalData({
          images: post.images.map(img => img.url),
          isOpen: true,
          postId: parsedPostId,
        })
      }
    }
  }, [postId, posts])

  const handleOpenImageModal = (postId: number, images: string[]) => {
    setModalData({ images, isOpen: true, postId })
    router.push({ pathname: router.pathname, query: { ...restQuery, postId } }, undefined, {
      shallow: true,
    })
  }

  const handleCloseModal = () => {
    setModalData({ images: [], isOpen: false, postId: null })
    router.push({ pathname: router.pathname, query: restQuery }, undefined, { shallow: true })
  }

  const getImageClickHandler = (postId: number, images: string[]) => () => {
    handleOpenImageModal(postId, images)
  }

  /** Fetches and appends additional posts when the user scrolls to the bottom. */
  const loadMorePosts = () => {
    if (data?.items?.length) {
      setPosts(prev => [...prev, ...data.items.filter(p => !prev.some(post => post.id === p.id))])
      setEndCursorPostId(data.items[data.items.length - 1]?.id || null)
      setHasMore(data.items.length >= 8)
    } else {
      setHasMore(false)
    }
  }

  if (!posts?.length) {
    return (
      <div className={styles.placeholder}>
        <ImageOutline className={styles.icon} />
      </div>
    )
  }

  return (
    <>
      <InfiniteScroll
        className={styles.infiniteScrollWrapper}
        dataLength={posts.length}
        hasMore={hasMore}
        loader={isLoading ? <Loader /> : null}
        next={loadMorePosts}
      >
        <div className={classNames.postGrid}>
          {posts?.map(post => (
            <Image
              alt={'post image'}
              className={classNames.image}
              height={228}
              key={post.id}
              onClick={getImageClickHandler(
                post.id,
                post.images.map(image => image.url)
              )}
              src={post.images[0]?.url}
              width={234}
            />
          ))}
        </div>
      </InfiniteScroll>
      {modalData.isOpen && modalData.postId && modalData.images && (
        <div className={styles.postModal}>
          <ImagePostModal
            avatar={avatar}
            handleClose={handleCloseModal}
            initialFollowState={initialFollowState}
            isOwnProfile={isOwnProfile}
            postId={modalData.postId}
            selectedImages={modalData.images}
            setSelectedImages={images => setModalData(prev => ({ ...prev, images }))}
            userId={userId}
            viewMode
          />
        </div>
      )}
    </>
  )
}
