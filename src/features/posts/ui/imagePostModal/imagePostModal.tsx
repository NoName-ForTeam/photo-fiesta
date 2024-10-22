import { forwardRef, useState } from 'react'

import {
  Avatar,
  PostForm,
  useDeletePostMutation,
  useDeleteUploadImageMutation,
  useGetPostByIdQuery,
} from '@/features'
import { Close, CloseOutline, Edit2 } from '@/shared/assets'
import { ProfileAvatar } from '@/shared/ui'
import { useChangeTitle } from '@/shared/utils/hooks/useChangeTitle'
import { ConfirmationModal } from '@/widgets'
import { Carousel } from '@/widgets/slider/slider'
import { Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './imagePostModal.module.scss'

type ImagePostModalProps = {
  avatar: Avatar[] | undefined
  handleClose: () => void
  postId: number | undefined
  // selectedImage: null | string
  selectedImage: null | string | string[]
  setSelectedImage: (image: null | string | string[]) => void
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

export const ImagePostModal = forwardRef<HTMLFormElement, ImagePostModalProps>(
  ({ avatar, handleClose, postId, selectedImage, setSelectedImage, userId, viewMode = false }) => {
    const { data: postById } = useGetPostByIdQuery({ postId }, { skip: !postId })
    const [deleteImage] = useDeleteUploadImageMutation()
    const [deletePost] = useDeletePostMutation()

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
    const [showConfirmCloseModal, setShowConfirmCloseModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const { getStepTitle } = useChangeTitle({ isEditing, viewMode })

    /** Delete post function */
    const confirmDelete = async () => {
      if (postId) {
        if (selectedImage) {
          /**  Delete the image, and if the operation is successful, then delete all posts with the same description */
          await deleteImage({ uploadId: selectedImage })
        }
        await deletePost({ postId })
      }
      handleClose()
    }

    // TODO: addTranslate

    return (
      <div className={styles.overlay}>
        <div className={clsx(styles.modalContent)}>
          {!isEditing && <CloseOutline className={styles.closeIcon} onClick={handleClose} />}
          {isEditing && (
            <div className={styles.header}>
              <Typography variant={'h1'}>{getStepTitle()}</Typography>
              <Close onClick={() => setShowConfirmCloseModal(true)} />
            </div>
          )}
          <div className={styles.body}>
            <section className={styles.imageSection}>
              {selectedImage ? (
                <Carousel
                  handleCloseModal={handleClose}
                  photos={selectedImage}
                  // postPhoto
                  setImage={setSelectedImage}
                />
              ) : (
                <Typography variant={'h2'}>No image selected</Typography>
              )}
            </section>
            <section className={styles.viewMode}>
              <div className={styles.profileInfo}>
                <CloseOutline onClick={() => setShowConfirmDeleteModal(true)} />
                <Edit2 onClick={() => setIsEditing(true)} />
                <ProfileAvatar avatarOwner={avatar?.[0]?.url} />
                <Typography variant={'h3'}>{userId}</Typography>
              </div>
              <div className={styles.postDetails}>
                {isEditing ? (
                  <div>
                    <PostForm
                      handleClose={handleClose}
                      isEditing
                      postId={postId}
                      selectedImage={selectedImage}
                      setIsEditing={setIsEditing}
                    />
                    {showConfirmCloseModal && (
                      <ConfirmationModal
                        closeModal={() => setShowConfirmCloseModal(false)}
                        confirmation={handleClose}
                        content={
                          'Do you really want to close the edition of the publication? If you close changes won`t be saved'
                        }
                        isOpen={showConfirmCloseModal}
                        isTwoButtons
                        title={'Close Post'}
                      />
                    )}
                  </div>
                ) : (
                  <Typography variant={'h3'}>{postById?.description}</Typography> // Иначе показываем описание
                )}
                {showConfirmDeleteModal && (
                  <ConfirmationModal
                    closeModal={() => setShowConfirmDeleteModal(false)}
                    confirmation={confirmDelete}
                    content={'Are you sure you want to delete this post?'}
                    isOpen={showConfirmDeleteModal}
                    isTwoButtons
                    title={'Delete Post'}
                  />
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
)
