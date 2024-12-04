import { GetPublicPostsResponse } from '@/features'

export const getLastPostId = (posts: GetPublicPostsResponse['items']): null | number => {
  return posts[posts.length - 1]?.id || null
}
