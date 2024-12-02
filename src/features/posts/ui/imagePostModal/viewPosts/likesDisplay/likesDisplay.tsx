import { useGetPostLikesQuery } from '@/features'
import { ProfileAvatar } from '@/shared/ui'
import { Typography } from '@photo-fiesta/ui-lib'
import { format } from 'date-fns'

import styles from './likesDisplay.module.scss'

type LikesDisplayProps = {
  postId: number
}

export const LikesDisplay = ({ postId }: LikesDisplayProps) => {
  const { data: postLikes } = useGetPostLikesQuery({ postId }, { skip: !postId })

  const likeCount = postLikes?.items?.length ?? 0
  const postAvatar = postLikes?.items
    .slice(0, 5)
    .map(like => <ProfileAvatar avatarOwner={like.avatars[0]?.url} key={like.id} />)
  const createAt = postLikes?.items.map(like => (
    <Typography key={like.id} variant={'textSmall'}>
      {format(new Date(like.createdAt), 'MMMM d, yyyy')}
    </Typography>
  ))

  return (
    <div className={styles.likesContainer}>
      <div className={styles.whoLikes}>
        <div className={styles.likesAvatar}>{postAvatar}</div>
        <div className={styles.likes}>
          <Typography variant={'text14'}>{likeCount}</Typography>
          <Typography variant={'textBold14'}>&#34;Likes&#34;</Typography>
        </div>
      </div>
      <div className={styles.date}>{createAt}</div>
    </div>
  )
}
