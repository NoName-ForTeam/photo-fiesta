import { baseApi } from '@/app/api'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getUserPosts: builder.query({
        providesTags: ['Posts'],
        query: ({ endCursorPostId, userId }) => ({
          // body: params,
          method: 'GET',
          url: `v1/public-posts/user/${userId}/${endCursorPostId}`,
        }),
      }),
    }
  },
})
export const { useGetUserPostsQuery } = postsApi
