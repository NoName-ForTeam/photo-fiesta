import { AuthMeResponse, GetCommentAnswersLikesResponse, Like } from '@/features'
import { BookmarkOutline, PaperPlaneOutline } from '@/shared/assets'

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
      <BookmarkOutline className={classNames.icon} />
    </div>
  )
}
