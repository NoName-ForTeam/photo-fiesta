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

  const classNames = {
    date: styles.date,
    likes: styles.likes,
    likesAvatar: styles.likesAvatar,
    likesContainer: styles.likesContainer,
    whoLikes: styles.whoLikes,
  }

  return (
    <div className={classNames.likesContainer}>
      <div className={classNames.whoLikes}>
        <div className={classNames.likesAvatar}>{postAvatar}</div>
        <div className={classNames.likes}>
          <Typography variant={'text14'}>{likeCount}</Typography>
          <Typography variant={'textBold14'}>&#34;Likes&#34;</Typography>
        </div>
      </div>
      <div className={classNames.date}>{createAt}</div>
    </div>
  )
}
