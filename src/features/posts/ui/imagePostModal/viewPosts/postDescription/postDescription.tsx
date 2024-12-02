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

  return (
    <div className={styles.postDetails}>
      {isEditing ? (
        <PostForm
          handleClose={handleClose}
          isEditing
          photos={selectedImages}
          postId={postId}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className={styles.viewPostDetails}>
          <div className={styles.descriptionContainer}>
            <div className={styles.profileAva}>
              <ProfileAvatar avatarOwner={avatar?.[0]?.url} />
            </div>
            <div>
              <Typography variant={'h3'}>{postById?.userName}</Typography>
              <Typography variant={'text14'}>{postById?.description}</Typography>
              <Typography variant={'textSmall'}>{createdAt}</Typography>
            </div>
            <span style={{ alignSelf: 'center' }}>
              <HeartOutline className={styles.icon} />
            </span>
          </div>
          <div className={styles.options}>
            <div className={styles.buttonsActions}>
              <OptionsButtons />
              <LikesDisplay postId={postId ?? 0} />
            </div>

            <div className={styles.addComment}>
              {t.posts.addComment} <Button variant={'ghost'}>{t.posts.publish}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
