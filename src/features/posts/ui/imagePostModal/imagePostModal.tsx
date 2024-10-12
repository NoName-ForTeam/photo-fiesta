import { useEffect, useRef, useState } from 'react'

import { Avatar, Post, useImagePostModal, usePost } from '@/features'
import { ArrowIosBackOutline, Close, CloseOutline, Edit2 } from '@/shared/assets'
import { ProfileAvatar } from '@/shared/ui'
import { ConfirmationModal } from '@/widgets'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './imagePostModal.module.scss'

type ImagePostModalProps = {
  avatar: Avatar[] | undefined
  handleClose: () => void
  postId: number
  selectedImage: null | string
  userId: number | undefined
  viewMode?: boolean
}

export const ImagePostModal = ({
  avatar,
  handleClose,
  postId,
  selectedImage,
  userId,
  viewMode = false,
}: ImagePostModalProps) => {
  const { interruptionCreatePost, setShowConfirmModal, showConfirmModal } = useImagePostModal({
    handleClose,
    selectedImage,
  })
  const {
    confirmDelete,
    description,
    isEditing,
    postById,
    saveDescriptionChanges,
    setDescription,
    setIsEditing,
    setShowConfirmCloseModal,
    setShowConfirmDeleteModal,
    showConfirmCloseModal,
    showConfirmDeleteModal,
  } = usePost({ handleClose, postId })

  const [step, setStep] = useState<'cropping' | 'filters' | 'publication'>('cropping')

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!viewMode && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowConfirmModal(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [viewMode])

  const getStepTitle = () =>
    isEditing ? 'Edit Post' : step.charAt(0).toUpperCase() + step.slice(1)

  const changeStep = (direction: 'next' | 'prev') => {
    if (!viewMode) {
      if (direction === 'next') {
        setStep(prev => (prev === 'cropping' ? 'filters' : 'publication'))
      } else {
        setStep(prev => (prev === 'publication' ? 'filters' : 'cropping'))
      }
    }
  }

  return (
    <div className={styles.overlay}>
      <div
        className={clsx(styles.modalContent, step === 'cropping' ? styles.autoSize : '')}
        ref={modalRef}
      >
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
              <img alt={'Selected'} className={styles.selectedImage} src={selectedImage} />
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
                    <textarea
                      className={styles.textarea}
                      onChange={e => setDescription(e.target.value)}
                      value={description}
                    />
                    <Button onClick={saveDescriptionChanges} variant={'primary'}>
                      Save Changes
                    </Button>
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
