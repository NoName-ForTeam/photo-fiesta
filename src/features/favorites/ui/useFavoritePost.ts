import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { FavoritePost, GetPostResponse, useLazyGetPostByIdQuery } from '@/features'

/**
 * Custom hook for fetching favorite posts by their IDs from the Redux store.
 */

export const useFavoritePosts = () => {
  const favoritePostIds = useSelector((state: RootState) =>
    state.favorites.favoritePosts.map((f: FavoritePost) => f.postId)
  )

  const [fetchedPosts, setFetchedPosts] = useState<GetPostResponse[]>([])
  const [fetchPostById] = useLazyGetPostByIdQuery()

  useEffect(() => {
    /**
     * Fetches all favorite posts based on their IDs stored in Redux.
     *
     * @description
     * Iterates over the array of favorite post IDs and fetches each post one-by-one
     * using the `fetchPostById` lazy query (from RTK Query). Each successful result
     * is pushed into a temporary `posts` array. If a request fails, the error is
     * caught and logged to the console without interrupting the loop.
     *
     * After all requests are completed, the result array is saved to local component state
     * via `setFetchedPosts`.
     */

    const fetchAll = async () => {
      const posts: GetPostResponse[] = []

      for (const id of favoritePostIds) {
        try {
          const result = await fetchPostById({ postId: id }).unwrap()

          posts.push(result)
        } catch (e) {
          console.error(`Ошибка при загрузке поста ${id}:`, e)
        }
      }

      setFetchedPosts(posts)
    }

    if (favoritePostIds.length) {
      fetchAll()
    } else {
      setFetchedPosts([])
    }
  }, [favoritePostIds.join(',')])

  return {
    isLoading: favoritePostIds.length > 0 && fetchedPosts.length === 0,
    posts: fetchedPosts,
  }
}
