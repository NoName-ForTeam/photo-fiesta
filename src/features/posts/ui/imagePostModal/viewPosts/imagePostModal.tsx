import { useState } from 'react'

import { Avatar, PostForm, useDeletePostMutation, useGetPostByIdQuery } from '@/features'
import {
  BookmarkOutline,
  Close,
  CloseOutline,
  Edit2,
  HeartOutline,
  MoreHorizontalOutline,
  PaperPlaneOutline,
} from '@/shared/assets'
import { PopoverContent, PopoverRoot, PopoverTrigger, ProfileAvatar } from '@/shared/ui'
import { useChangeTitle, useModal } from '@/shared/utils'
import { Carousel, ConfirmationModal } from '@/widgets'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './viewPosts.module.scss'

type ImagePostModalProps = {
  avatar: Avatar[] | undefined
  handleClose: () => void
  postId: number | undefined
  selectedImages: string[]
  setSelectedImages: (images: string[]) => void
  userId: number | undefined
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
  postId,
  selectedImages,
  setSelectedImages,
  viewMode = false,
}: ImagePostModalProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const confirmCloseModal = useModal()
  const confirmDeleteModal = useModal()
  const { getStepTitle } = useChangeTitle({ isEditing, viewMode })

  const { data: postById } = useGetPostByIdQuery({ postId }, { skip: !postId })
  const [deletePost] = useDeletePostMutation()

  /** Delete post function */
  const confirmDelete = async () => {
    if (postId) {
      await deletePost({ postId })
    }
    handleClose()
  }

  const classNames = {
    body: styles.body,
    closeIcon: styles.closeIcon,
    header: styles.header,
    icon: styles.icon,
    imageSection: styles.imageSection,
    info: styles.info,
    modalContent: styles.modalContent,
    overlay: styles.overlay,
    popover: styles.popover,
    postDetails: styles.postDetails,
    profileInfo: styles.profileInfo,
    viewMode: styles.viewMode,
  }
  // TODO: addTranslate

  const postImages = postById?.images.map(img => img.url) ?? []

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

        <div className={styles.body}>
          <section className={classNames.imageSection}>
            {postById?.images?.length ? (
              <Carousel
                handleCloseModal={handleClose}
                photos={postImages}
                setPhotos={setSelectedImages}
              />
            ) : (
              <Typography variant={'h2'}>No image selected</Typography>
            )}
          </section>

          <section className={classNames.viewMode}>
            {!isEditing ? (
              <div className={classNames.info}>
                <div className={classNames.profileInfo}>
                  <ProfileAvatar avatarOwner={avatar?.[0]?.url} />
                  <Typography variant={'h3'}>{postById?.userName}</Typography>
                </div>
                <div className={classNames.popover}>
                  <PopoverRoot>
                    <PopoverTrigger asChild>
                      <MoreHorizontalOutline className={styles.icon} />
                    </PopoverTrigger>
                    <PopoverContent align={'start'} alignOffset={20} side={'right'} sideOffset={1}>
                      <Button onClick={() => setIsEditing(true)} variant={'icon-link'}>
                        <Edit2 className={styles.icon} /> Edit Post
                      </Button>
                      <Button
                        onClick={() => confirmDeleteModal.openModal('ConfirmDelete')}
                        variant={'icon-link'}
                      >
                        <CloseOutline className={styles.icon} /> Delete Post
                      </Button>
                    </PopoverContent>
                  </PopoverRoot>
                </div>
              </div>
            ) : (
              <div className={styles.editInfo}>
                <ProfileAvatar avatarOwner={avatar?.[0]?.url} />
                <Typography variant={'h3'}>{postById?.userName}</Typography>
              </div>
            )}

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
                <div>
                  <div className={styles.descriptionContainer}>
                    <div className={styles.profileAva}>
                      <ProfileAvatar avatarOwner={avatar?.[0]?.url} />
                    </div>
                    <div>
                      <Typography variant={'h3'}>{postById?.userName}</Typography>
                      <Typography variant={'text14'}>{postById?.description}</Typography>
                    </div>
                    <span>
                      <HeartOutline className={styles.icon} />
                    </span>
                  </div>
                  <div className={styles.options}>
                    <div className={styles.buttonsActions}>
                      <div className={styles.buttons}>
                        <div className={styles.likeWrite}>
                          <HeartOutline className={styles.icon} />
                          <PaperPlaneOutline className={styles.icon} />
                        </div>
                        <BookmarkOutline className={styles.icon} />
                      </div>
                      <div className={styles.likes}>
                        <div>{postById?.avatarWhoLikes}</div>
                        <div>{postById?.likesCount} Like</div>
                      </div>
                      <div>{postById?.createdAt}</div>
                    </div>

                    <div className={styles.addComment}>
                      Add a Comment... <Button variant={'ghost'}>Publish</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {confirmCloseModal.isModalOpen && (
        <ConfirmationModal
          closeModal={confirmCloseModal.closeModal}
          content={
            'Do you really want to close the edition of the publication? If you close, changes won’t be saved.'
          }
          handleConfirmation={handleClose}
          isOpen={confirmCloseModal.isModalOpen}
          isTwoButtons
          title={'Close Post'}
        />
      )}

      {confirmDeleteModal.isModalOpen && (
        <ConfirmationModal
          closeModal={confirmDeleteModal.closeModal}
          content={'Are you sure you want to delete this post?'}
          handleConfirmation={confirmDelete}
          isOpen={confirmDeleteModal.isModalOpen}
          isTwoButtons
          title={'Delete Post'}
        />
      )}
    </div>
  )
}
