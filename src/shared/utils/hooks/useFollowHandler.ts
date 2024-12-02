import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type FollowingUserResponse =
  | { data: void; error?: undefined }
  | { data?: undefined; error: FetchBaseQueryError | SerializedError }

type UseFollowHandlerProps = {
  followUser: (args: { selectedUserId: number }) => Promise<FollowingUserResponse>
  initialFollowState: boolean
  unfollowUser: (args: { userId: number }) => Promise<FollowingUserResponse>
  userId: number
}

/**
 * Custom hook to manage the follow/unfollow state of a user.
 *
 * Provides functionality to follow or unfollow a user and handles the associated state changes and toast notifications.
 */
export const useFollowHandler = ({
  followUser,
  initialFollowState,
  unfollowUser,
  userId,
}: UseFollowHandlerProps) => {
  const [follow, setFollow] = useState(initialFollowState)

  useEffect(() => {
    setFollow(initialFollowState)
  }, [initialFollowState])

  const toggleFollow = async () => {
    try {
      if (follow) {
        await unfollowUser({ userId })
        setFollow(false)
        toast.success('Unfollowed successfully')
      } else {
        await followUser({ selectedUserId: userId })
        setFollow(true)
        toast.success('Followed successfully')
      }
    } catch (error) {
      toast.error(`Error ${follow ? 'unfollowing' : 'following'} user`)
    }
  }

  return {
    follow,
    toggleFollow,
  }
}
