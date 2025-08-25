import {
  AuthMeResponse,
  Like,
  PostComment,
  useGetCommentAnswersQuery,
  useGetCommentLikesQuery,
} from '@/features'
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
  const { data: commentAnswers } = useGetCommentAnswersQuery({ commentId, postId })

  const createdAgo = useTimeAgo(postComment.createdAt)
  const avatarUrl = postComment.from.avatars?.[0]?.url ?? ''
  const username = postComment.from.username ?? 'unknown'

  const showAnswer = () => {}

  const likesCount =
    (Array.isArray(commentLikes?.items) ? commentLikes!.items.length : undefined) ??
    postComment.likeCount ??
    0

  const answersCount =
    (Array.isArray(commentAnswers?.items) ? commentAnswers!.items.length : undefined) ??
    postComment.answerCount ??
    0

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.profileInfo}>
          <ProfileAvatar avatarOwner={avatarUrl} />
          <div>{username}</div>
          <div className={styles.description}>
            <Typography variant={'text14'}>{postComment.content}</Typography>
          </div>
        </div>
        {authMe && postId ? (
          <Like
            authMe={authMe}
            commentId={commentId}
            commentLikes={commentLikes}
            initialLikeCommentState={postComment.isLiked}
            postId={postId}
          />
        ) : null}
      </div>
      <div className={styles.options}>
        <Typography variant={'textSmall'}>{createdAgo}</Typography>
        <Typography variant={'textSmall'}>Likes: {likesCount}</Typography>
        <button className={styles.answerBtn} onClick={showAnswer}>
          <Typography variant="textSmall">Answer: {answersCount}</Typography>
        </button>
      </div>
      {commentAnswers?.items?.map(answer => {
        const ansAvatar = answer.from.avatars?.[0]?.url ?? ''
        const ansName = answer.from.username ?? 'unknown'

        return (
          <div key={answer.id}>
            <div className={styles.profileInfo}>
              <ProfileAvatar avatarOwner={ansAvatar} />
              <div>{ansName}</div>
              <div className={styles.description}>
                <Typography variant="text14">{answer.content}</Typography>
              </div>
            </div>
            <Typography className={styles.options} variant="textSmall">
              {/* <div>{ansAgo}</div> */}
              <div>Likes: {answer.likeCount ?? 0}</div>
            </Typography>
          </div>
        )
      })}
    </div>
  )
}
