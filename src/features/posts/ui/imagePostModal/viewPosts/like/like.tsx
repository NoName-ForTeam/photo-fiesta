import { useEffect } from 'react'

import {
  AuthMeResponse,
  GetCommentAnswersLikesResponse,
  useUpdatePostLikeStatusMutation,
} from '@/features'
import { Heart, HeartOutline } from '@/shared/assets'
import { useLiked, useModal } from '@/shared/utils'
import clsx from 'clsx'

import styles from './like.module.scss'

type LikeProps = {
  authMe?: AuthMeResponse
  initialLikedState: boolean
  postId: number
  postLikes?: GetCommentAnswersLikesResponse
}
export const Like = ({ authMe, initialLikedState, postId, postLikes }: LikeProps) => {
  const isModalOpen = useModal()
  const [updatePostLike] = useUpdatePostLikeStatusMutation()

  const { like, setLike, toggleLike } = useLiked({ initialLikedState, postId, updatePostLike })
  const isLikedByUser = !!postLikes?.items.some(p => p.userId === authMe?.userId)

  useEffect(() => {
    if (isModalOpen) {
      setLike(isLikedByUser)
    }
  }, [isModalOpen, isLikedByUser, setLike])

  return (
    <div onClick={toggleLike}>
      {like ? (
        <Heart className={clsx(styles.icon, styles.likeIcon)} />
      ) : (
        <HeartOutline className={styles.icon} />
      )}
    </div>
  )
}
