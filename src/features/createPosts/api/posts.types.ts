export type GetPostResponse = {
  avatarOwner: string
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
export type PostResponseImages = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type GetPostsResponse = {
  items: GetPostResponse[]
  pageSize?: number
  totalCount?: number
  totalUsers?: number
}
