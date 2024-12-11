import { AuthMeResponse, Like, PostComment, useGetCommentLikesQuery } from '@/features'
import { ProfileAvatar } from '@/shared/ui'
import { useTimeAgo } from '@/shared/utils'
import { Typography } from '@photo-fiesta/ui-lib'

import styles from './comments.module.scss'

type CommentsProps = {
  authMe?: AuthMeResponse
  commentId: number
  postComment: PostComment
  postId: number
}
export const Comments = ({ authMe, commentId, postComment, postId }: CommentsProps) => {
  const { data: commentLikes } = useGetCommentLikesQuery({ commentId, postId })

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
        {authMe && (
          <Like
            authMe={authMe}
            commentId={commentId}
            commentLikes={commentLikes}
            initialLikeCommentState={postComment.isLiked}
            postId={postId}
          />
        )}
      </div>
      <Typography className={styles.options} variant={'textSmall'}>
        <div>{useTimeAgo(postComment.createdAt)}</div>
        <div>Likes: {postComment.likeCount}</div>
        <div>Answer: {postComment.answerCount}</div>
      </Typography>
    </div>
  )
}
