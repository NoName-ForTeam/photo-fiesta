import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  AuthMeResponse,
  GetCommentAnswersLikesResponse,
  LikeStatus,
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
  useUpdatePostLikeStatusMutation,
} from '@/features'
import { Heart, HeartOutline } from '@/shared/assets'
import clsx from 'clsx'

import styles from './like.module.scss'

type LikeProps = {
  answerId?: number
  authMe: AuthMeResponse
  commentId?: number
  commentLikes?: GetCommentAnswersLikesResponse
  initialLikeAnswerState?: boolean
  initialLikeCommentState?: boolean
  initialLikePostState?: boolean
  postId: number
  postLikes?: GetCommentAnswersLikesResponse
}

export const Like = ({
  answerId,
  authMe,
  commentId,
  initialLikeAnswerState,
  initialLikeCommentState,
  initialLikePostState,
  postId,
  postLikes,
}: LikeProps) => {
  const [hasPostLike, setHasPostLike] = useState(initialLikePostState)
  const [hasCommentLike, setHasCommentLike] = useState(initialLikeCommentState)
  const [hasAnswerLike, setHasAnswerLike] = useState(initialLikeAnswerState)

  const [updatePostLike] = useUpdatePostLikeStatusMutation()
  const [updateCommentLike] = useUpdateCommentLikeStatusMutation()
  const [updateAnswerLike] = useUpdateAnswerLikeStatusMutation()

  const handleToggleLike = async () => {
    const newStatus: LikeStatus =
      hasPostLike || hasCommentLike || hasAnswerLike ? 'DISLIKE' : 'LIKE'

    try {
      if (!commentId && !answerId) {
        await updatePostLike({ likeStatus: newStatus, postId }).unwrap()
        setHasPostLike(prev => !prev)
      } else if (commentId && !answerId) {
        await updateCommentLike({ commentId, likeStatus: newStatus, postId }).unwrap()
        setHasCommentLike(prev => !prev)
      } else if (answerId) {
        await updateAnswerLike({
          answerId,
          commentId: commentId!,
          likeStatus: newStatus,
          postId,
        }).unwrap()
        setHasAnswerLike(prev => !prev)
      } else {
        toast.error('Invalid identifiers for like operation')
      }
    } catch (error) {
      toast.error('Failed to update like')
    }
  }

  useEffect(() => {
    if (postLikes) {
      const isLikedByMe = postLikes.items.some(like => like.userId === authMe?.userId)

      setHasPostLike(isLikedByMe)
    }
  }, [postLikes, authMe, postId])

  return (
    <div className={styles.likeContainer} onClick={handleToggleLike}>
      {hasPostLike || hasCommentLike || hasAnswerLike ? (
        <Heart className={clsx(styles.icon, styles.likeIcon)} />
      ) : (
        <HeartOutline className={styles.icon} />
      )}
    </div>
  )
}
