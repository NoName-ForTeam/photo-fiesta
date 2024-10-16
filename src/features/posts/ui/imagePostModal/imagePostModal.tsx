import { forwardRef, useEffect, useRef } from 'react'

import { Avatar, Post, PostForm, useImagePostModal } from '@/features'
import { ArrowIosBackOutline, Close, CloseOutline, Edit2 } from '@/shared/assets'
import { ProfileAvatar } from '@/shared/ui'
import { ConfirmationModal } from '@/widgets'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Image from 'next/image'

import styles from './imagePostModal.module.scss'

type ImagePostModalProps = {
  avatar: Avatar[] | undefined
  handleClose: () => void
  postId: number
  selectedImage: null | string
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
  ({ avatar, handleClose, postId, selectedImage, userId, viewMode = false }) => {
    const {
      changeStep,
      confirmDelete,
      getStepTitle,
      interruptionCreatePost,
      isEditing,
      postById,
      setIsEditing,
      setShowConfirmCloseModal,
      setShowConfirmDeleteModal,
      setShowConfirmModal,
      showConfirmCloseModal,
      showConfirmDeleteModal,
      showConfirmModal,
      step,
    } = useImagePostModal({
      handleClose,
      postId,
      selectedImage,
    })

    // TODO: addTranslate

    const modalRef = useRef<HTMLDivElement>(null)

    /**
     * Sets up an event listener for mouse down events on the document (ImagePostModal for creating post).
     * When a click event occurs outside the modal reference element and the modal is not in view mode,
     * it sets `showConfirmModal` to true.
     */
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!viewMode && modalRef.current && !modalRef.current.contains(event.target as Node)) {
          setShowConfirmModal(true)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)

      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [viewMode])

    // TODO: rebase handleClickOutside in useImagePostModal(and fix bugs)

    return (
      <div className={styles.overlay}>
        <div
          className={clsx(styles.modalContent, step === 'cropping' ? styles.autoSize : '')}
          ref={modalRef}
        >
          {viewMode && !isEditing && (
            <CloseOutline className={styles.closeIcon} onClick={() => handleClose()} />
          )}
          {!viewMode && (
            <div className={styles.header}>
              <Button onClick={() => changeStep('prev')} variant={'icon-link'}>
                <ArrowIosBackOutline />
              </Button>
              <Typography variant={'h1'}>{getStepTitle()}</Typography>
              {step !== 'publication' && (
                <Button onClick={() => changeStep('next')} variant={'ghost'}>
                  Next
                </Button>
              )}
              {step === 'publication' && (
                <Button form={'postDescription'} variant={'ghost'}>
                  Publish
                </Button>
              )}
            </div>
          )}
          {isEditing && (
            <div className={styles.header}>
              <Typography variant={'h1'}>{getStepTitle()}</Typography>
              <Close onClick={() => setShowConfirmCloseModal(true)} />
            </div>
          )}

          <div className={styles.body}>
            <section className={styles.imageSection}>
              {selectedImage ? (
                <Image
                  alt={'Selected'}
                  className={styles.selectedImage}
                  height={432}
                  src={selectedImage}
                  width={492}
                />
              ) : (
                <Typography variant={'h2'}>No image selected</Typography>
              )}
            </section>
            {viewMode && postById && (
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
                      />
                      {showConfirmCloseModal && (
                        <ConfirmationModal
                          closeModal={() => setShowConfirmCloseModal(false)}
                          confirmation={() => handleClose()}
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
            )}
            {!viewMode && (
              <Post
                avatar={avatar}
                handleClose={handleClose}
                postId={postId}
                selectedImage={selectedImage}
                step={step}
                userId={userId}
              />
            )}
            {showConfirmModal && (
              <ConfirmationModal
                closeModal={() => setShowConfirmModal(false)}
                confirmation={interruptionCreatePost}
                content={
                  'Do you really want to close the creation of a publication? If you close everything will be deleted.'
                }
                isOpen={showConfirmModal}
                title={'Close'}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
)
