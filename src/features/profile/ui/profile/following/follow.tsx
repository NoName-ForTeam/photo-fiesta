import { useFollowUserMutation, useRemoveFollowerMutation } from '@/features'
import { Loader } from '@/shared/ui'
import { useFollowHandler, useTranslation } from '@/shared/utils'
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
export const Follow = ({ initialFollowState, userId }: FollowProps) => {
  const { t } = useTranslation()

  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()
  const [unfollowUser, { isLoading: isUnfollowLoading }] = useRemoveFollowerMutation()

  const { follow, toggleFollow } = useFollowHandler({
    followUser,
    initialFollowState,
    unfollowUser,
    userId,
  })

  const isLoading = isFollowLoading || isUnfollowLoading

  if (isLoading) {
    return <Loader />
  }

  return (
    <Button disabled={isLoading} onClick={toggleFollow} variant={follow ? 'outlined' : 'primary'}>
      <Typography variant={'h3'}>{follow ? t.myProfile.unfollow : t.myProfile.follow}</Typography>
    </Button>
  )
}
