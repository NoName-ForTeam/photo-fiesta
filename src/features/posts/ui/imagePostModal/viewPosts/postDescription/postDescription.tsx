import { Avatar, GetPostResponse, LikesDisplay, OptionsButtons, PostForm } from '@/features'
import { HeartOutline } from '@/shared/assets'
import { ProfileAvatar } from '@/shared/ui'
import { useTimeAgo, useTranslation } from '@/shared/utils'
import { Button, Typography } from '@photo-fiesta/ui-lib'

import styles from './postDescription.module.scss'

type PostDescriptionProps = {
  avatar: Avatar[]
  handleClose: () => void
  isEditing: boolean
  postById: GetPostResponse
  postId: number | undefined
  selectedImages: string[]
  setIsEditing: (isEditing: boolean) => void
}
export const PostDescription = ({
  avatar,
  handleClose,
  isEditing,
  postById,
  postId,
  selectedImages,
  setIsEditing,
}: PostDescriptionProps) => {
  const { t } = useTranslation()
  const createdAt = useTimeAgo(postById?.createdAt)

  const classNames = {
    addComment: styles.addComment,
    buttonsActions: styles.buttonsActions,
    descriptionContainer: styles.descriptionContainer,
    icon: styles.icon,
    options: styles.options,
    postDetails: styles.postDetails,
    profileAva: styles.profileAva,
    viewPostDetails: styles.viewPostDetails,
  }

  return (
    <div className={classNames.postDetails}>
      {isEditing ? (
        <PostForm
          handleClose={handleClose}
          isEditing
          photos={selectedImages}
          postId={postId}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className={classNames.viewPostDetails}>
          <div className={classNames.descriptionContainer}>
            <div className={classNames.profileAva}>
              <ProfileAvatar avatarOwner={avatar?.[0]?.url} />
            </div>
            <div>
              <Typography variant={'h3'}>{postById?.userName}</Typography>
              <Typography variant={'text14'}>{postById?.description}</Typography>
              <Typography variant={'textSmall'}>{createdAt}</Typography>
            </div>
            <span style={{ alignSelf: 'center' }}>
              <HeartOutline className={classNames.icon} />
            </span>
          </div>
          <div className={classNames.options}>
            <div className={classNames.buttonsActions}>
              <OptionsButtons />
              <LikesDisplay postId={postId ?? 0} />
            </div>
            <div className={classNames.addComment}>
              {t.posts.addComment} <Button variant={'ghost'}>{t.posts.publish}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
