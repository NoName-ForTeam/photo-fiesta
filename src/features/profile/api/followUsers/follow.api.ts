import { baseApi } from '@/app/api'
import {
  GetFollowersArgs,
  GetFollowersResponse,
  GetUserProfileArgs,
  GetUserProfileResponse,
  GetUserProfileWithPosts,
} from '@/features/profile/api/followUsers/follow.types'
import { API_URLS, METHOD } from '@/shared/config'

const {
  FOLLOW_USER,
  GET_USER_PROFILE,
  GetFollowers,
  GetFollowing,
  GetProfileUserWithPost,
  RemoveFollower,
} = API_URLS.FOLLOW
const { DELETE, POST } = METHOD

export const followApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      followUser: builder.mutation<void, { selectedUserId: number }>({
        invalidatesTags: ['Follow', 'Profile'],
        query: ({ selectedUserId }) => ({
          body: { selectedUserId },
          method: POST,
          url: FOLLOW_USER,
        }),
      }),
      getFollowers: builder.query<GetFollowersResponse, GetFollowersArgs>({
        providesTags: ['Follow'],
        query: ({ userName }) => GetFollowers(userName),
      }),
      getFollowings: builder.query<GetFollowersResponse, GetFollowersArgs>({
        providesTags: ['Follow'],
        query: ({ userName }) => GetFollowing(userName),
      }),
      getProfileUserWithPost: builder.query<GetUserProfileWithPosts, { userName: string }>({
        providesTags: ['Follow', 'Profile'],
        query: ({ userName }) => GetProfileUserWithPost(userName),
      }),
      getUserProfile: builder.query<GetUserProfileResponse, GetUserProfileArgs>({
        providesTags: ['Follow'],
        query: () => GET_USER_PROFILE,
      }),
      removeFollower: builder.mutation<void, { userId: number }>({
        invalidatesTags: ['Follow', 'Profile'],
        query: ({ userId }) => ({
          method: DELETE,
          url: RemoveFollower(userId),
        }),
      }),
    }
  },
})

export const {
  useFollowUserMutation,
  useGetFollowersQuery,
  useGetFollowingsQuery,
  useGetProfileUserWithPostQuery,
  useGetUserProfileQuery,
  useRemoveFollowerMutation,
} = followApi
