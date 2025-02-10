export type GetUserProfileArgs = {
  cursor: number
  pageNumber: number
  pageSize: number
  search: string
}
export type GetUserProfileResponse = {
  items: UserProfile
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
export type UserProfile = {
  avatars: Avatar[]
  createdAt: string
  firstName: string
  id: number
  lastName: string
  userName: string
}
type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
export type GetUserProfileWithPosts = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  lastName: string
  publicationsCount: number
  region: string
  userName: string
}
export type GetFollowersArgs = { userName: string } & GetUserProfileArgs
export type GetFollowersResponse = {
  items: Followers
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
type Followers = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}
