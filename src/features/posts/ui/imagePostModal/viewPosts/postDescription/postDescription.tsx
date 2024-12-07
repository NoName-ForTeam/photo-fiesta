import {
  AddComments,
  Avatar,
  Comments,
  GetPostResponse,
  LikesDisplay,
  OptionsButtons,
  PostForm,
  useAuthMeQuery,
  useGetPostCommentsQuery,
  useGetPostLikesQuery,
} from '@/features'
import { ProfileAvatar } from '@/shared/ui'
import { useTimeAgo } from '@/shared/utils'
import { Scroll, Typography } from '@photo-fiesta/ui-lib'

import styles from './postDescription.module.scss'

type PostDescriptionProps = {
  avatar: Avatar[]
  handleClose: () => void
  initialLikedState: boolean
  isEditing: boolean
  postById: GetPostResponse
  postId: number
  selectedImages: string[]
  setIsEditing: (isEditing: boolean) => void
}
export const PostDescription = ({
  avatar,
  handleClose,
  initialLikedState,
  isEditing,
  postById,
  postId,
  selectedImages,
  setIsEditing,
}: PostDescriptionProps) => {
  const { data: authMe } = useAuthMeQuery()
  const { data: postLikes } = useGetPostLikesQuery({ postId }, { skip: !postId })
  const { data: postComments } = useGetPostCommentsQuery({ postId })
  const createdAt = useTimeAgo(postById?.createdAt)

  const classNames = {
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
        <div className={styles.form}>
          <PostForm
            handleClose={handleClose}
            isEditing
            photos={selectedImages}
            postId={postId}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : (
        <div className={classNames.viewPostDetails}>
          <div>
            <div className={classNames.descriptionContainer}>
              <div className={classNames.profileAva}>
                <ProfileAvatar avatarOwner={avatar?.[0]?.url} />
              </div>
              <div>
                <Typography variant={'h3'}>{postById?.userName}</Typography>
                <Typography variant={'text14'}>{postById?.description}</Typography>
                <Typography style={{ color: 'var(--light-900)' }} variant={'textSmall'}>
                  {createdAt}
                </Typography>
              </div>
            </div>
            <div>
              <Scroll>
                {postComments?.items.map(postComment => (
                  <Comments key={postComment.id} postComment={postComment} />
                ))}
              </Scroll>
            </div>
          </div>

          <div className={classNames.options}>
            <div className={classNames.buttonsActions}>
              {authMe && (
                <OptionsButtons
                  authMe={authMe}
                  initialLikedState={initialLikedState}
                  postId={postId}
                  postLikes={postLikes}
                />
              )}
              <LikesDisplay postLikes={postLikes} />
            </div>
            {authMe && <AddComments />}
          </div>
        </div>
      )}
    </div>
  )
}
