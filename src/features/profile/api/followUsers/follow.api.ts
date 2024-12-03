import { baseApi } from '@/app/api'
import {
  GetFollowersArgs,
  GetFollowersResponse,
  GetUserProfileArgs,
  GetUserProfileResponse,
  GetUserProfileWithPosts,
} from '@/features'
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

/**
 * API for managing user follow-related actions.
 * Provides endpoints to follow/unfollow users, retrieve followers/followings,
 * and fetch user profiles with posts.
 */
export const followApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      /**
       * Mutation to follow a user.
       * @param {number} args.selectedUserId - ID of the user to follow.
       */
      followUser: builder.mutation<void, { selectedUserId: number }>({
        invalidatesTags: ['Follow', 'Profile'],
        query: ({ selectedUserId }) => ({
          body: { selectedUserId },
          method: POST,
          url: FOLLOW_USER,
        }),
      }),
      /**
       * Query to get a list of followers.
       * @param {string} args.userName - Username to fetch followers for.
       */
      getFollowers: builder.query<GetFollowersResponse, GetFollowersArgs>({
        providesTags: ['Follow'],
        query: ({ userName }) => GetFollowers(userName),
      }),
      /**
       * Query to get a list of users the user is following.
       * @param {string} args.userName - Username to fetch followings for.
       */
      getFollowings: builder.query<GetFollowersResponse, GetFollowersArgs>({
        providesTags: ['Follow'],
        query: ({ userName }) => GetFollowing(userName),
      }),
      /**
       * Query to get a user profile along with their posts.
       * @param {string} args.userName - Username to fetch the profile and posts for.
       */
      getProfileUserWithPost: builder.query<GetUserProfileWithPosts, { userName: string }>({
        providesTags: ['Follow', 'Profile'],
        query: ({ userName }) => GetProfileUserWithPost(userName),
      }),
      /**
       * Query to get the current user's profile.
       * @returns {GetUserProfileResponse} - Current user profile data.
       */
      getUserProfile: builder.query<GetUserProfileResponse, GetUserProfileArgs>({
        providesTags: ['Follow'],
        query: () => GET_USER_PROFILE,
      }),
      /**
       * Mutation to unfollow a user.
       * @param {number} args.userId - ID of the user to unfollow.
       */
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
