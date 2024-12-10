export type GetPostByUsernameResponse = {
  items: GetPostResponse[]
  pageSize?: number
  totalCount?: number
}
type GetPostResponse = {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: PostResponseImages[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: { firstName: string; lastName: string }
  ownerId: number
  updatedAt: string
  userName: string
}
type PostResponseImages = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type PostsImages = {
  images: PostResponseImages[]
}
export type PostArgsType = {
  childrenMetadata: UploadId[]
  description: string
}
type UploadId = {
  uploadId: string
}

export type LikeStatus = 'DISLIKE' | 'LIKE' | 'NONE'

export type GetPostCommentsResponse = {
  items: PostComment[]
  pageSize: number
  totalCount: number
}
type PostComment = {
  answerCount: number
  content: string
  createdAt: string
  from: User
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}
type User = {
  avatars: Avatar[]
  id: number
  username: string
}
type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
export type GetPostCommentsArgs = { postId: number } & GetPostArgs
export type GetPostArgs = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
export type GetPostByUsernameArgs = { userName: string } & GetPostArgs
export type GetCommentAnswersResponse = {
  items: CommentAnswer[]
  pageSize: number
  totalCount: number
}
type CommentAnswer = {
  commentId: number
  content: string
  createdAt: string
  from: User
  id: number
  isLiked: boolean
  likeCount: number
}
export type GetCommentAnswersArgs = {
  commentId: number
  pageNumber?: number
  pageSize?: number
  postId: number
  sortBy?: string
  sortDirection?: string
}
export type GetCommentAnswersLikesResponse = {
  items: UserComment[]
  pageSize: number
  totalCount: number
}
type UserComment = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}
export type GetCommentAnswersLikesArgs = { answerId: number; commentId: number } & GetPostLikesArgs
export type GetCommentLikesArgs = { commentId: number } & GetPostLikesArgs
export type GetPostLikesArgs = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  postId: number
  search?: string
}
