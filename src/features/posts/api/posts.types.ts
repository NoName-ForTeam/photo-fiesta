export type GetPostsResponse = {
  items: GetPostResponse[]
  pageSize?: number
  totalCount?: number
  totalUsers?: number
}

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

export type PostsType = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: PostsImagesType[]
  location: string
  owner: {
    firstName: string
    lastName: string
  }
  ownerId: number
  updatedAt: string
  userName: string
}
export type ImageType = {
  fileSize: number
  height: number
  url: string
  width: number
}
export type PostsImagesType = ImageType & UploadIdType
export type UploadIdType = {
  uploadId: string
}
export type PostArgsType = {
  childrenMetadata: UploadIdType[]
  description: string
}
export type PostsImages = {
  images: PostsImagesType[]
}
export type GetPublicPostsResponse = {
  items: PostsType[]
  pageSize: number
  totalCount: number
  totalUsers: number
}
export type GetUserPublicPostsArgs = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  userId: number
}
