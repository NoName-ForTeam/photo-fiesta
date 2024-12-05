import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { LikeStatus } from '@/features'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type LikedResponse =
  | { data: void; error?: undefined }
  | { data?: undefined; error: FetchBaseQueryError | SerializedError }

type UseLikedProps = {
  initialLikedState: boolean
  postId: number
  updatePostLike: (args: { likeStatus: LikeStatus; postId: number }) => Promise<LikedResponse>
}

export const useLiked = ({ initialLikedState, postId, updatePostLike }: UseLikedProps) => {
  const [like, setLike] = useState(initialLikedState)

  useEffect(() => {
    setLike(initialLikedState)
  }, [initialLikedState])

  const toggleLike = async () => {
    const newStatus: LikeStatus = like ? 'DISLIKE' : 'LIKE'

    try {
      await updatePostLike({ likeStatus: newStatus, postId })
    } catch (error) {
      setLike(prev => !prev)
      toast.error('Ошибка при обновлении лайка')
    }
  }

  return {
    like,
    setLike,
    toggleLike,
  }
}
