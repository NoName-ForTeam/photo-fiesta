import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useFollowUserMutation, useRemoveFollowerMutation } from '@/features'
import { useTranslation } from '@/shared/utils'
import { Button, Typography } from '@photo-fiesta/ui-lib'

type FollowProps = {
  /* Initial follow state indicating if the user is already followed */
  initialFollowState: boolean
  /* ID of the user to follow/unfollow */
  userId: number
}
/**
 * Component for managing follow/unfollow actions for a user.
 * Displays a button that toggles between "Follow" and "Unfollow" states based on the follow status.
 */
export const Follow = ({ initialFollowState = false, userId }: FollowProps) => {
  const { t } = useTranslation()
  const [follow, setFollow] = useState(initialFollowState)

  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()
  const [unfollowUser, { isLoading: isUnfollowLoading }] = useRemoveFollowerMutation()

  /* Sync follow state with initial follow state when it changes */
  useEffect(() => {
    setFollow(initialFollowState)
  }, [initialFollowState])

  /**
   * Sends a request to follow the user and updates the local follow state.
   */
  const handleFollow = async () => {
    try {
      await followUser({ selectedUserId: userId }).unwrap()
      setFollow(true)
    } catch (error) {
      toast.error('Error following user')
    }
  }

  /**
   * Sends a request to unfollow the user and updates the local follow state.
   */
  const handleUnfollow = async () => {
    try {
      await unfollowUser({ userId }).unwrap()
      setFollow(false)
    } catch (error) {
      toast.error('Error unfollowing user')
    }
  }

  return (
    <Button
      disabled={isFollowLoading || isUnfollowLoading}
      onClick={follow ? handleUnfollow : handleFollow}
      variant={follow ? 'outlined' : 'primary'}
    >
      <Typography variant={'h3'}>{follow ? t.myProfile.unfollow : t.myProfile.follow}</Typography>
    </Button>
  )
}
