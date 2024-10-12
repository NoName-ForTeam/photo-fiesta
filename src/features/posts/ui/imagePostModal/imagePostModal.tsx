import { useEffect, useRef, useState } from 'react'

import { Avatar, Post, useImagePostModal } from '@/features'
import { usePost } from '@/features/posts/ui/post/usePost'
import { ArrowIosBackOutline, Close, CloseOutline, Edit2 } from '@/shared/assets'
import { ProfileAvatar } from '@/shared/ui'
import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Typography,
} from '@photo-fiesta/ui-lib'
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
  const { setShowConfirmModal, showConfirmModal } = useImagePostModal({
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
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (!viewMode && (step === 'cropping' || step === 'filters' || step === 'publication')) {
          setShowConfirmModal(true)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [viewMode, step])

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
                      <Modal>
                        <div className={styles.closeModalContainer}>
                          <ModalHeader className={styles.closeModalHeader}>
                            <ModalTitle>Close Post</ModalTitle>
                            <CloseOutline className={styles.icon} />
                          </ModalHeader>
                          <div className={styles.closeModalDescription}>
                            <Typography className={styles.description} variant={'text16'}>
                              Do you really want to close the edition of the publication? If you If
                              If you close changes won`t be saved
                            </Typography>
                            <ModalFooter className={styles.closeModalFooter}>
                              <Button onClick={() => handleClose()} variant={'outlined'}>
                                Yes
                              </Button>
                              <Button onClick={() => setShowConfirmCloseModal(false)}>No</Button>
                            </ModalFooter>
                          </div>
                        </div>
                      </Modal>
                    )}
                  </div>
                ) : (
                  <Typography variant={'h3'}>{postById?.description}</Typography> // Иначе показываем описание
                )}
                {showConfirmDeleteModal && (
                  <Modal>
                    <div className={styles.closeModalContainer}>
                      <ModalHeader className={styles.closeModalHeader}>
                        <ModalTitle>
                          <Typography variant={'h1'}>Delete Post</Typography>
                        </ModalTitle>
                        <CloseOutline className={styles.icon} />
                      </ModalHeader>
                      <div className={styles.closeModalDescription}>
                        <Typography className={styles.description} variant={'text16'}>
                          Are you sure you want to delete this post?
                        </Typography>
                      </div>
                      <ModalFooter className={styles.closeModalFooter}>
                        <Button onClick={confirmDelete}>Yes</Button>
                        <Button onClick={() => setShowConfirmDeleteModal(false)}>No</Button>
                      </ModalFooter>
                    </div>
                  </Modal>
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
            <Modal onOpenChange={() => setShowConfirmModal(false)} open={showConfirmModal}>
              <div className={styles.closeModalContainer}>
                <ModalHeader className={styles.closeModalHeader}>
                  <ModalTitle>
                    <Typography variant={'h1'}>Close</Typography>
                  </ModalTitle>
                  <CloseOutline
                    className={styles.icon}
                    onClick={() => setShowConfirmModal(false)}
                  />
                </ModalHeader>
                <div className={styles.closeModalDescription}>
                  <Typography className={styles.description} variant={'text16'}>
                    Do you really want to close the creation of a publication? If you close
                    everything will be deleted.
                  </Typography>
                </div>
                <ModalFooter className={styles.closeModalFooter}>
                  <Button
                    onClick={() => {
                      setShowConfirmModal(false)
                      handleClose()
                    }}
                    variant={'outlined'}
                  >
                    Discard
                  </Button>
                  <Button>SafeDraft</Button>
                </ModalFooter>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}
