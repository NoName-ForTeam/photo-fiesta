import React, { useEffect, useState } from 'react'

import {
  AddComments,
  Avatar,
  Comments,
  GetPostResponse,
  LikesDisplay,
  OptionsButtons,
  PostForm,
  useAuthMeQuery,
  useGetPostLikesQuery,
  useLazyGetPostCommentsQuery,
  useLazyGetPublicPostCommentsQuery,
} from '@/features'
import { ProfileAvatar } from '@/shared/ui'
import { useTimeAgo } from '@/shared/utils'
import { Scroll, Typography } from '@photo-fiesta/ui-lib'

import styles from './postDescription.module.scss'

type PostDescriptionProps = {
  avatar: Avatar[]
  handleClose: () => void
  initialLikePostState: boolean
  isEditing: boolean
  postById: GetPostResponse
  postId: number
  selectedImages: string[]
  setIsEditing: (isEditing: boolean) => void
}
export const PostDescription = ({
  avatar,
  handleClose,
  initialLikePostState,
  isEditing,
  postById,
  postId,
  selectedImages,
  setIsEditing,
}: PostDescriptionProps) => {
  const { data: authMe } = useAuthMeQuery()
  const { data: postLikes } = useGetPostLikesQuery({ postId })
  const [pageNumber, setPageNumber] = useState(1)
  const [triggerGetPostComments, { data: postComments, isFetching }] = useLazyGetPostCommentsQuery()
  const [triggerGetPublicPostComments, { data: publicPostComments }] =
    useLazyGetPublicPostCommentsQuery()

  const createdAt = useTimeAgo(postById?.createdAt)

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { clientHeight, scrollHeight, scrollTop } = e.currentTarget

    if (scrollHeight - scrollTop === clientHeight && !isFetching) {
      setPageNumber(prev => prev + 1)
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      if (authMe) {
        await triggerGetPostComments({ pageNumber, pageSize: 2, postId })
      } else {
        await triggerGetPublicPostComments({ pageNumber, pageSize: 2, postId })
      }
    }

    fetchComments()
  }, [authMe, pageNumber, postId, triggerGetPostComments, triggerGetPublicPostComments])

  const currentComments = authMe ? postComments : publicPostComments

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
              <Scroll maxHeight={200} onScroll={handleScroll}>
                {currentComments?.items
                  .slice()
                  .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                  .map(postComment => (
                    <Comments
                      authMe={authMe}
                      commentId={postComment.id}
                      key={postComment.id}
                      postComment={postComment}
                      postId={postId}
                    />
                  ))}
              </Scroll>
            </div>
          </div>

          <div className={classNames.options}>
            <div className={classNames.buttonsActions}>
              {authMe && (
                <OptionsButtons
                  authMe={authMe}
                  initialLikePostState={initialLikePostState}
                  postId={postId}
                  postLikes={postLikes}
                />
              )}
              <LikesDisplay postLikes={postLikes} />
            </div>
            {authMe && <AddComments postId={postId} />}
          </div>
        </div>
      )}
    </div>
  )
}
