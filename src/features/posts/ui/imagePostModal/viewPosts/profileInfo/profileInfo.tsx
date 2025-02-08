import { Avatar, GetPostResponse } from '@/features'
import { ProfileAvatar } from '@/shared/ui'
import { Typography } from '@photo-fiesta/ui-lib'

import styles from './profileInfo.module.scss'

type ProfileInfoProps = {
  avatar: Avatar[]
  postById: GetPostResponse
}
export const ProfileInfo = ({ avatar, postById }: ProfileInfoProps) => {
  return (
    <div className={styles.profileInfo}>
      <ProfileAvatar avatarOwner={avatar?.[0]?.url} />
      <Typography variant={'h3'}>{postById?.userName}</Typography>
    </div>
  )
}
