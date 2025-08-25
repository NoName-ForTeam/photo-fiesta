'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  AddComments,
  Avatar,
  Comments,
  GetPostCommentsArgs,
  GetPostResponse,
  LikesDisplay,
  OptionsButtons,
  PostComment,
  PostForm,
  useAuthMeQuery,
  useGetPostLikesQuery,
  useLazyGetPostCommentsQuery,
} from '@/features'
import { ProfileAvatar } from '@/shared/ui'
import { useModal, useTranslation, useTimeAgo } from '@/shared/utils'
import { ConfirmationModal } from '@/widgets'
import { Loader } from '@/shared/ui'
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
  const isAuthed = !!authMe?.userId
  const { data: postLikes } = useGetPostLikesQuery({ postId })
  const [triggerGetPostComments, { isLoading }] = useLazyGetPostCommentsQuery()
  const { t } = useTranslation()
  const confirmCloseModal = useModal()

  const [pageNumber, setPageNumber] = useState(1)
  const [accComments, setAccComments] = useState<PostComment[]>([])
  const [hasMore, setHasMore] = useState(true)

  let inFlight = useRef(false)
  const createdAt = useTimeAgo(postById?.createdAt)

  useEffect(() => {
    setAccComments([])
    setPageNumber(1)
    setHasMore(true)
  }, [postId, isAuthed])

  const fetchComments = useCallback(async () => {
    if (!hasMore || inFlight.current) return
    inFlight.current = true

    const params: GetPostCommentsArgs = {
      pageNumber,
      pageSize: 2,
      postId,
    }

    try {
      const res = await triggerGetPostComments(params).unwrap()
      const items = (res?.items ?? []) as PostComment[]
      setAccComments(prev => [...prev, ...items])
      if (items.length < (params.pageSize ?? 2)) setHasMore(false)
    } catch {
      setHasMore(false)
    } finally {
      inFlight.current = false
    }
  }, [hasMore, pageNumber, postId, triggerGetPostComments])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { clientHeight, scrollHeight, scrollTop } = e.currentTarget
    if (scrollHeight - scrollTop <= clientHeight + 10 && hasMore) {
      setPageNumber(prev => prev + 1)
    }
  }

  const currentComments = useMemo(() => accComments, [accComments])

  const classNames = {
    buttonsActions: styles.buttonsActions,
    description: styles.description,
    descriptionContainer: styles.descriptionContainer,
    icon: styles.icon,
    options: styles.options,
    postDetails: styles.postDetails,
    profileAva: styles.profileAva,
    viewPostDetails: styles.viewPostDetails,
    body: styles.body,
    closeIcon: styles.closeIcon,
    edit: styles.edit,
    header: styles.header,
    imageSection: styles.imageSection,
    info: styles.info,
    modalContent: styles.modalContent,
    overlay: styles.overlay,
  }

  if (!postById) {
    return <Typography variant="text14">No post found</Typography>
  }

  const isLiked = postById?.isLiked ?? false

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
          <div>
            <div className={classNames.descriptionContainer}>
              <div className={classNames.profileAva}>
                <ProfileAvatar avatarOwner={avatar?.[0]?.url ?? ''} />
              </div>
              <div>
                <Typography variant="h3">{postById?.userName}</Typography>
                <Typography className={classNames.description} variant="text14">
                  {postById?.description}
                </Typography>
                <Typography style={{ color: 'var(--light-900)' }} variant="textSmall">
                  {createdAt}
                </Typography>
              </div>
            </div>

            <div>
              <Scroll maxHeight={200} onScroll={handleScroll}>
                {currentComments
                  ?.slice()
                  .reverse()
                  .map(postComment => (
                    <Comments
                      authMe={authMe}
                      commentId={postComment.id}
                      key={postComment.id}
                      postComment={postComment}
                      postId={postId}
                    />
                  ))}

                {/* Индикатор подгрузки */}
                {isLoading && (
                  <div style={{ padding: 8 }}>
                    <Loader />
                  </div>
                )}

                {/* Пустое состояние */}
                {!isLoading && (!currentComments || currentComments.length === 0) && (
                  <Typography variant="textSmall" style={{ opacity: 0.7, padding: 8 }}>
                    {'No comments yet'}
                  </Typography>
                )}
              </Scroll>
            </div>
          </div>

          <div className={classNames.options}>
            <div className={classNames.buttonsActions}>
              {authMe && (
                <OptionsButtons
                  authMe={authMe}
                  initialLikePostState={initialLikePostState ?? isLiked}
                  postId={postId}
                  postLikes={postLikes}
                />
              )}
              {postLikes && <LikesDisplay postLikes={postLikes} />}
            </div>

            {authMe && <AddComments postId={postId} />}
          </div>
        </div>
      )}

      {confirmCloseModal.isModalOpen && (
        <ConfirmationModal
          closeModal={confirmCloseModal.closeModal}
          content={t.posts.closePostText}
          handleConfirmation={handleClose}
          isOpen={confirmCloseModal.isModalOpen}
          isTwoButtons
          title={t.posts.closePost}
        />
      )}
    </div>
  )
}
