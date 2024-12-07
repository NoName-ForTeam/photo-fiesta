import { PostComment } from '@/features'
import { HeartOutline } from '@/shared/assets'
import { ProfileAvatar } from '@/shared/ui'
import { useTimeAgo } from '@/shared/utils'
import { Typography } from '@photo-fiesta/ui-lib'

import styles from './comments.module.scss'

type CommentsProps = {
  postComment: PostComment
}
export const Comments = ({ postComment }: CommentsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.profileInfo}>
          <ProfileAvatar avatarOwner={postComment.from.avatars[0].url} />
          <div>{postComment.from.username}</div>
          <div className={styles.description}>
            <Typography variant={'text14'}>{postComment.content}</Typography>
          </div>
        </div>
        <HeartOutline />
      </div>
      <Typography className={styles.options} variant={'textSmall'}>
        <div>{useTimeAgo(postComment.createdAt)}</div>
        <div>Likes: {postComment.likeCount}</div>
        <div>Answer: {postComment.answerCount}</div>
      </Typography>
      <div></div>
    </div>
  )
}
