import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { AuthMeResponse, GetCommentAnswersLikesResponse, Like } from '@/features'
import { FavoritePost, toggleFavorite } from '@/features/posts/api/slice/favoritesSlice'
import { Bookmark, BookmarkOutline, PaperPlaneOutline } from '@/shared/assets'

import styles from './optionsButtons.module.scss'

type OptionsButtonsProps = {
  authMe: AuthMeResponse
  initialLikePostState: boolean
  postId: number
  postLikes?: GetCommentAnswersLikesResponse
}

export const OptionsButtons = ({
  authMe,
  initialLikePostState,
  postId,
  postLikes,
}: OptionsButtonsProps) => {
  const classNames = {
    buttons: styles.buttons,
    icon: styles.icon,
    likeWrite: styles.likeWrite,
  }

  const dispatch = useDispatch()
  const favoritePosts = useSelector((state: RootState) => state.favorites.favoritePosts) // Получаем избранные посты

  const isFavorite = favoritePosts.some((fav: FavoritePost) => fav.postId === postId)

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({ postId }))
  }

  return (
    <div className={classNames.buttons}>
      <div className={classNames.likeWrite}>
        <Like
          authMe={authMe}
          initialLikePostState={initialLikePostState}
          postId={postId}
          postLikes={postLikes}
        />
        <PaperPlaneOutline className={classNames.icon} />
      </div>
      {isFavorite ? (
        <Bookmark className={classNames.icon} onClick={handleToggleFavorite} />
      ) : (
        <BookmarkOutline className={classNames.icon} onClick={handleToggleFavorite} />
      )}
    </div>
  )
}
