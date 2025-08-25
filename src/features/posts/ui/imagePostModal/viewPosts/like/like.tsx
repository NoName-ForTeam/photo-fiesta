import { useEffect, useMemo, useState } from 'react'
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
  commentLikes,
}: LikeProps) => {
  const [hasPostLike, setHasPostLike] = useState(initialLikePostState)
  const [hasCommentLike, setHasCommentLike] = useState(initialLikeCommentState)
  const [hasAnswerLike, setHasAnswerLike] = useState(initialLikeAnswerState)

  const [updatePostLike] = useUpdatePostLikeStatusMutation()
  const [updateCommentLike] = useUpdateCommentLikeStatusMutation()
  const [updateAnswerLike] = useUpdateAnswerLikeStatusMutation()

  const targetHasLike = useMemo(() => {
    if (commentId) return !!hasCommentLike
    if (answerId) return !!hasAnswerLike
    return !!hasPostLike
  }, [commentId, answerId, hasCommentLike, hasAnswerLike, hasPostLike])

  // иконка — по таргету
  const isActive = targetHasLike

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
    } catch {
      toast.error('Failed to update like')
    }
  }

  useEffect(() => {
    if (!postLikes?.items || !authMe?.userId || commentId || answerId) return
    if (postLikes.items.some(l => l.userId === authMe.userId)) setHasPostLike(true)
  }, [postLikes?.items, authMe?.userId, commentId, answerId])

  // комментарий: аналогично
  useEffect(() => {
    if (!commentLikes?.items || !authMe?.userId || !commentId) return
    if (commentLikes.items.some(l => l.userId === authMe.userId)) setHasCommentLike(true)
  }, [commentLikes?.items, authMe?.userId, commentId])

  useEffect(() => setHasPostLike(initialLikePostState), [initialLikePostState])
  useEffect(() => setHasCommentLike(initialLikeCommentState), [initialLikeCommentState])
  useEffect(() => setHasAnswerLike(initialLikeAnswerState), [initialLikeAnswerState])

  return (
    <div className={styles.likeContainer} onClick={handleToggleLike}>
      {isActive ? (
        <Heart className={clsx(styles.icon, styles.likeIcon)} />
      ) : (
        <HeartOutline className={styles.icon} />
      )}
    </div>
  )
}
