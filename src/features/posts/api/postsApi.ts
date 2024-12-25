import { baseApi } from '@/app/api'
import {
  CommentAnswer,
  GetCommentAnswersArgs,
  GetCommentAnswersLikesArgs,
  GetCommentAnswersLikesResponse,
  GetCommentAnswersResponse,
  GetCommentLikesArgs,
  GetPostByUsernameArgs,
  GetPostByUsernameResponse,
  GetPostCommentsArgs,
  GetPostCommentsResponse,
  GetPostLikesArgs,
  GetPostResponse,
  LikeStatus,
  PostArgs,
  PostComment,
  PostsImages,
  UpdateAnswerLikeArgs,
  UpdateCommentLikeArgs,
} from '@/features'
import { API_URLS, METHOD } from '@/shared/config'

const { DELETE, GET, POST, PUT } = METHOD
const {
  CREATE_POST,
  CreateAnswerComment,
  CreateComment,
  DeletePost,
  DeleteUploadImage,
  GetCommentAnswers,
  GetCommentAnswersLikes,
  GetCommentLikes,
  GetPostComments,
  GetPostLikes,
  GetPostsByUsername,
  UPLOAD_POST_IMAGE,
  UpdateAnswerLikeStatus,
  UpdateCommentLikeStatus,
  UpdatePost,
  UpdatePostLikeStatus,
} = API_URLS.POSTS

/**
 * API service for posts endpoints.
 */

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Creates a reply to a specific comment on a post.
     * @returns {Promise<CommentAnswer>} The created reply to the comment.
     * @param - The IDs of the post and comment, along with the reply content.
     */
    createAnswerComment: builder.mutation<
      CommentAnswer,
      { commentId: number; content: string; postId: number }
    >({
      invalidatesTags: ['Posts', 'Comments'],
      query: ({ commentId, content, postId }) => ({
        body: { content },
        method: POST,
        url: CreateAnswerComment(postId, commentId),
      }),
    }),
    /**
     * Creates a new comment for a specific post.
     * @returns {Promise<PostComment>} The created comment.
     * @param - The ID of the post and the comment content.
     */
    createComment: builder.mutation<PostComment, { content: string; postId: number }>({
      invalidatesTags: ['Posts', 'Comments'],
      query: ({ content, postId }) => ({
        body: { content },
        method: POST,
        url: CreateComment(postId),
      }),
    }),
    /**
     * Creates a new post.
     * @returns {Promise<GetPostResponse>} The created post.
     * @param {PostArgs} params - The post data.
     */
    createPost: builder.mutation<GetPostResponse, PostArgs>({
      invalidatesTags: ['Posts'],
      query: body => ({
        body,
        method: POST,
        url: CREATE_POST,
      }),
    }),
    /**
     * Deletes a post by its ID.
     * @param {{ postId: number }} params - The ID of the post to delete.
     */
    deletePost: builder.mutation<void, { postId: number }>({
      invalidatesTags: ['Posts', 'Public-posts', 'Profile'],
      query: ({ postId }) => ({
        method: DELETE,
        url: DeletePost(postId),
      }),
    }),
    /**
     * Deletes an uploaded image by its ID.
     * @param {{ uploadId: string }} params - The ID of the uploaded image to delete.
     */
    deleteUploadImage: builder.mutation<void, { uploadId: string | string[] }>({
      invalidatesTags: ['Posts'],
      query: ({ uploadId }) => ({
        method: DELETE,
        url: DeleteUploadImage(uploadId),
      }),
    }),
    /**
     * Fetches replies to a specific comment on a post.
     * @param GetCommentAnswersArgs - Contains the comment and post IDs
     */
    getCommentAnswers: builder.query<GetCommentAnswersResponse, GetCommentAnswersArgs>({
      providesTags: ['Posts'],
      query: ({ commentId, postId }) => ({
        method: GET,
        url: GetCommentAnswers(commentId, postId),
      }),
    }),
    /**
     * Fetches likes for a specific reply to a comment on a post.
     * @param GetCommentAnswersLikesArgs - Contains IDs for the answer, comment, and post.
     */
    getCommentAnswersLikes: builder.query<
      GetCommentAnswersLikesResponse,
      GetCommentAnswersLikesArgs
    >({
      providesTags: ['Posts'],
      query: ({ answerId, commentId, postId }) => ({
        method: GET,
        url: GetCommentAnswersLikes(commentId, postId, answerId),
      }),
    }),
    /**
     * Fetches likes for a specific comment on a post.
     * @param GetCommentLikesArgs - Contains the comment and post IDs.
     */
    getCommentLikes: builder.query<GetCommentAnswersLikesResponse, GetCommentLikesArgs>({
      providesTags: ['Posts'],
      query: ({ commentId, postId }) => ({
        method: GET,
        url: GetCommentLikes(commentId, postId),
      }),
    }),
    /**
     * Fetches addComments for a specific post.
     * @param GetPostCommentsArgs - Contains the post ID.
     */
    getPostComments: builder.query<GetPostCommentsResponse, GetPostCommentsArgs>({
      providesTags: ['Posts'],
      query: ({ postId }) => ({
        method: GET,
        url: GetPostComments(postId),
      }),
    }),
    /**
     * Fetches likes for a specific post.
     * @param GetPostLikesArgs - Contains the post ID.
     */
    getPostLikes: builder.query<GetCommentAnswersLikesResponse, GetPostLikesArgs>({
      providesTags: ['Posts'],
      query: ({ postId }) => ({
        method: GET,
        url: GetPostLikes(postId),
      }),
    }),
    /**
     * Fetches posts by a specific user.
     * @param GetPostByUsernameArgs - Contains the username.
     */
    getPostsByUsername: builder.query<GetPostByUsernameResponse, GetPostByUsernameArgs>({
      providesTags: ['Posts'],
      query: ({ userName }) => ({
        method: GET,
        url: GetPostsByUsername(userName),
      }),
    }),
    /**
     * Updates the like status for a specific reply to a comment.
     * @param {UpdateAnswerLikeArgs} params - The answer, comment, and post IDs along with the new like status.
     */
    updateAnswerLikeStatus: builder.mutation<void, UpdateAnswerLikeArgs>({
      invalidatesTags: ['Posts'],
      query: ({ answerId, commentId, likeStatus, postId }) => ({
        body: { likeStatus },
        method: PUT,
        url: UpdateAnswerLikeStatus(answerId, commentId, postId),
      }),
    }),
    /**
     * Updates the like status for a specific comment on a post.
     * @param {UpdateCommentLikeArgs} params - The comment and post IDs along with the new like status.
     */
    updateCommentLikeStatus: builder.mutation<void, UpdateCommentLikeArgs>({
      invalidatesTags: ['Posts'],
      query: ({ commentId, likeStatus, postId }) => ({
        body: { likeStatus },
        method: PUT,
        url: UpdateCommentLikeStatus(commentId, postId),
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
        url: UpdatePost(postId),
      }),
    }),
    /**
     * Updates the like status for a specific post.
     * @param { likeStatus: LikeStatus, postId: number } - The new like status and the post ID.
     */
    updatePostLikeStatus: builder.mutation<void, { likeStatus: LikeStatus; postId: number }>({
      invalidatesTags: ['Posts'],
      query: ({ likeStatus, postId }) => ({
        body: { likeStatus },
        method: PUT,
        url: UpdatePostLikeStatus(postId),
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
  useCreateAnswerCommentMutation,
  useCreateCommentMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useDeleteUploadImageMutation,
  useGetCommentAnswersLikesQuery,
  useGetCommentAnswersQuery,
  useGetCommentLikesQuery,
  useGetPostCommentsQuery,
  useGetPostLikesQuery,
  useGetPostsByUsernameQuery,
  useLazyGetPostCommentsQuery,
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
  useUpdatePostLikeStatusMutation,
  useUpdatePostMutation,
  useUploadPostImageMutation,
} = postsApi
