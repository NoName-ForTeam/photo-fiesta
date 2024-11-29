import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useFollowUserMutation, useRemoveFollowerMutation } from '@/features'
import { useTranslation } from '@/shared/utils'
import { Button, Typography } from '@photo-fiesta/ui-lib'

type FollowProps = {
  initialFollowState: boolean
  userId: number
}

export const Follow = ({ initialFollowState = false, userId }: FollowProps) => {
  const { t } = useTranslation()
  const [follow, setFollow] = useState(initialFollowState)

  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()
  const [unfollowUser, { isLoading: isUnfollowLoading }] = useRemoveFollowerMutation()

  useEffect(() => {
    setFollow(initialFollowState)
  }, [initialFollowState])

  const handleFollow = async () => {
    try {
      await followUser({ selectedUserId: userId }).unwrap()
      setFollow(true)
    } catch (error) {
      toast.error('Error following user')
    }
  }

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
