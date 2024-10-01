import { baseApi } from '@/app/api'
import { PostArgsType, PostsImages, PostsType } from '@/features/posts/api/posts.types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createPost: builder.mutation<PostsType, PostArgsType>({
        query: params => ({
          body: params,
          method: 'POST',
          url: `v1/posts`,
        }),
      }),
      getUserPosts: builder.query({
        providesTags: ['Posts'],
        query: ({ endCursorPostId, userId }) => ({
          // body: params,
          method: 'GET',
          url: `v1/public-posts/user/${userId}/${endCursorPostId}`,
        }),
      }),
      uploadPostImage: builder.mutation<PostsImages, FormData>({
        invalidatesTags: [],
        query: body => ({
          body,
          method: 'POST',
          url: `v1/posts/image`,
        }),
      }),
    }
  },
})
export const { useCreatePostMutation, useGetUserPostsQuery, useUploadPostImageMutation } = postsApi
