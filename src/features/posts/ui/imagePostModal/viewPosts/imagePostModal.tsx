import { useState } from 'react'

import {
  Avatar,
  PopoverMenu,
  PostDescription,
  ProfileInfo,
  useDeletePostMutation,
  useGetPostByIdQuery,
  useGetUserPostsQuery,
} from '@/features'
import { Close, CloseOutline } from '@/shared/assets'
import { Loader } from '@/shared/ui'
import { getPostImages, useChangeTitle, useModal, useTranslation } from '@/shared/utils'
import { Carousel, ConfirmationModal } from '@/widgets'
import { Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './viewPosts.module.scss'

type ImagePostModalProps = {
  avatar: Avatar[]
  handleClose: () => void
  initialFollowState: boolean
  isOwnProfile: boolean
  postId: number
  selectedImages: string[]
  setSelectedImages: (images: string[]) => void
  userId: number
  viewMode?: boolean
}

/**
 * A modal component for display creating and editing image posts.
 *
 * @example
 * <ImagePostModal
 *   avatar={avatarData}
 *   handleClose={handleCloseModal}
 *   postId={postId}
 *   selectedImage={selectedImage}
 *   userId={userId}
 *   viewMode={true}
 * />
 */

export const ImagePostModal = ({
  avatar,
  handleClose,
  initialFollowState,
  isOwnProfile,
  postId,
  selectedImages,
  setSelectedImages,
  userId,
  viewMode = false,
}: ImagePostModalProps) => {
  const { t } = useTranslation()
  const confirmCloseModal = useModal()
  const { data: postById, isLoading } = useGetPostByIdQuery({ postId }, { skip: !postId })
  const { refetch: refetchPosts } = useGetUserPostsQuery({ endCursorPostId: 0, userId })
  const isLiked = postById?.isLiked ?? false

  const [deletePost] = useDeletePostMutation()

  const [isEditing, setIsEditing] = useState(false)
  const { getStepTitle } = useChangeTitle({ isEditing, viewMode })

  /** Delete post function */
  const confirmDelete = async () => {
    if (postId) {
      await deletePost({ postId }).unwrap()
    }
    handleClose()
    refetchPosts()
  }

  const classNames = {
    body: styles.body,
    closeIcon: styles.closeIcon,
    edit: styles.edit,
    header: styles.header,
    imageSection: styles.imageSection,
    info: styles.info,
    modalContent: styles.modalContent,
    overlay: styles.overlay,
    viewMode: styles.viewMode,
  }

  if (isLoading) {
    return <Loader />
  }
  if (!postById) {
    return <Typography variant={'text14'}>No post found</Typography>
  }

  return (
    <div className={classNames.overlay}>
      <div className={clsx(classNames.modalContent)}>
        {isEditing ? (
          <div className={classNames.header}>
            <Typography variant={'h1'}>{getStepTitle()}</Typography>
            <Close onClick={() => confirmCloseModal.openModal('ConfirmClose')} />
          </div>
        ) : (
          <CloseOutline className={classNames.closeIcon} onClick={handleClose} />
        )}
        <div className={classNames.body}>
          <section className={classNames.imageSection}>
            {postById?.images?.length ? (
              <Carousel
                handleCloseModal={handleClose}
                photos={getPostImages(postById)}
                setPhotos={setSelectedImages}
              />
            ) : (
              <Typography variant={'h2'}>{t.posts.noImage}</Typography>
            )}
          </section>
          <section className={classNames.viewMode}>
            {!isEditing ? (
              <div className={classNames.info}>
                <ProfileInfo avatar={avatar} postById={postById} />
                <PopoverMenu
                  confirmDelete={confirmDelete}
                  initialFollowState={initialFollowState}
                  isOwnProfile={isOwnProfile}
                  setIsEditing={setIsEditing}
                  userId={userId}
                />
              </div>
            ) : (
              <div className={classNames.edit}>
                <ProfileInfo avatar={avatar} postById={postById} />
              </div>
            )}
            <PostDescription
              avatar={avatar}
              handleClose={handleClose}
              initialLikePostState={isLiked}
              isEditing={isEditing}
              postById={postById}
              postId={postId}
              selectedImages={selectedImages}
              setIsEditing={setIsEditing}
            />
          </section>
        </div>
      </div>
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
