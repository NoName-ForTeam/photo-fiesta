import { baseApi } from '@/app/api'
import {
  GetPostResponse,
  GetPublicPostsResponse,
  GetUserPublicPostsArgs,
  PostArgsType,
  PostsImages,
  PostsType,
} from '@/features'
import { API_URLS, METHOD } from '@/shared/config'

const { DELETE, GET, POST, PUT } = METHOD
const {
  CREATE_POST,
  DELETE_POST,
  DELETE_UPLOAD_IMAGE,
  GET_POST_BY_ID,
  GET_USER_PUBLIC_POSTS,
  UPDATE_POST,
  UPLOAD_POST_IMAGE,
} = API_URLS.POSTS

/**
 * @module postsApi
 * @description API endpoints for handling posts.
 */

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Creates a new post.
     * @returns {Promise<PostsType>} The created post.
     * @param {PostArgsType} params - The post data.
     */
    createPost: builder.mutation<PostsType, PostArgsType>({
      invalidatesTags: ['Posts'],
      query: params => ({
        body: params,
        method: POST,
        url: CREATE_POST,
      }),
    }),
    /**
     * Deletes a post by its ID.
     * @param {{ postId: number }} params - The ID of the post to delete.
     */
    deletePost: builder.mutation<void, { postId: number }>({
      invalidatesTags: ['Posts'],
      query: ({ postId }) => ({
        method: DELETE,
        url: DELETE_POST(postId),
      }),
    }),
    /**
     * Deletes an uploaded image by its ID.
     * @param {{ uploadId: string }} params - The ID of the uploaded image to delete.
     */
    deleteUploadImage: builder.mutation<void, { uploadId: string }>({
      invalidatesTags: ['Posts'],
      query: ({ uploadId }) => ({
        method: DELETE,
        url: DELETE_UPLOAD_IMAGE(uploadId),
      }),
    }),
    /**
     * Fetches a post by its ID.
     * @param {{ postId: number }} params - The ID of the post to fetch.
     */
    getPostById: builder.query<GetPostResponse, { postId: number }>({
      providesTags: ['Posts'],
      query: ({ postId }) => ({
        method: GET,
        url: GET_POST_BY_ID(postId),
      }),
    }),
    /**
     * Fetches public posts for a specific user.
     * @param {GetUserPublicPostsArgs} params - The user ID and optional end cursor post ID.
     */
    getUserPosts: builder.query<GetPublicPostsResponse, GetUserPublicPostsArgs>({
      providesTags: ['Posts'],
      query: ({ endCursorPostId, userId }) => ({
        method: GET,
        url: GET_USER_PUBLIC_POSTS(endCursorPostId, userId),
      }),
    }),
    /**
     * Updates a post by its ID.
     * @param {{ description: string, postId: number }} params - The updated post data and its ID.
     */
    updatePost: builder.mutation<void, { description: string; postId: number }>({
      invalidatesTags: ['Posts'],
      query: ({ description, postId }) => ({
        body: { description },
        method: PUT,
        url: UPDATE_POST(postId),
      }),
    }),
    /**
     * Uploads an image for a post.
     * @param {FormData} formData - The image file to upload.
     */
    uploadPostImage: builder.mutation<PostsImages, FormData>({
      invalidatesTags: ['Posts'],
      query: (formData: FormData) => ({
        body: formData,
        method: POST,
        url: UPLOAD_POST_IMAGE,
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useDeleteUploadImageMutation,
  useGetPostByIdQuery,
  useGetUserPostsQuery,
  useUpdatePostMutation,
  useUploadPostImageMutation,
} = postsApi
