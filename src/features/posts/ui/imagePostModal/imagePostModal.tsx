import { useState } from 'react'

import {
  Avatar,
  Post,
  useDeletePostMutation,
  useDeleteUploadImageMutation,
  useGetPostByIdQuery,
  useImagePostModal,
  useUpdatePostMutation,
} from '@/features'
import { ArrowIosBackOutline, Close, CloseOutline, Edit2 } from '@/shared/assets'
import { ProfileAvatar } from '@/shared/ui'
import {
  Button,
  Modal,
  ModalDescription,
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
  const { modalRef, setShowConfirmModal, showConfirmModal } = useImagePostModal({
    handleClose,
    selectedImage,
  })
  const [step, setStep] = useState<'cropping' | 'filters' | 'publication'>('cropping')
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
  const [showConfirmCloseModal, setShowConfirmCloseModal] = useState(false)
  const { data: postById } = useGetPostByIdQuery({ postId })
  const [deleteImage] = useDeleteUploadImageMutation()
  const [deletePost] = useDeletePostMutation()
  const [updateDescription] = useUpdatePostMutation()
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(postById?.description || '')

  // Логика удаления поста и картинки при подтверждении
  const confirmDelete = async () => {
    if (selectedImage) {
      await deleteImage({ uploadId: selectedImage }) // Удаляем картинку
    }
    await deletePost({ postId }) // Удаляем пост
    handleClose() // Закрываем модалку
  }
  const saveDescriptionChanges = async () => {
    await updateDescription({ description, postId }) // Сохраняем новое описание
    setIsEditing(false) // Отключаем режим редактирования
  }

  const getStepTitle = () => {
    if (isEditing) {
      return 'Edit Post' // Название для режима просмотра
    }
    switch (step) {
      case 'cropping':
        return 'Cropping'
      case 'filters':
        return 'Filters'
      case 'publication':
        return 'Publication'
      default:
        return ''
    }
  }

  const goToNextStep = () => {
    if (!viewMode) {
      if (step === 'cropping') {
        setStep('filters')
      } else if (step === 'filters') {
        setStep('publication')
      }
    }
  }

  const goToPrevStep = () => {
    if (!viewMode) {
      if (step === 'publication') {
        setStep('filters')
      } else if (step === 'filters') {
        setStep('cropping')
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
            <Button onClick={goToPrevStep} variant={'icon-link'}>
              <ArrowIosBackOutline />
            </Button>
            <Typography variant={'h1'}>{getStepTitle()}</Typography>
            {step !== 'publication' && (
              <Button onClick={goToNextStep} variant={'ghost'}>
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
                        <ModalTitle>Close Post</ModalTitle>
                        <ModalDescription>
                          Do you really want to close the edition of the publication? If you close
                          If you close changes won`t be saved
                        </ModalDescription>
                        <ModalFooter>
                          <Button onClick={() => handleClose()}>Yes</Button>
                          <Button onClick={() => setShowConfirmCloseModal(false)}>No</Button>
                        </ModalFooter>
                      </Modal>
                    )}
                  </div>
                ) : (
                  <Typography variant={'h3'}>{postById?.description}</Typography> // Иначе показываем описание
                )}
                {showConfirmDeleteModal && (
                  <Modal>
                    <ModalTitle>Delete Post</ModalTitle>
                    <ModalDescription>Are you sure you want to delete this post?</ModalDescription>
                    <ModalFooter>
                      <Button onClick={confirmDelete}>Yes</Button>
                      <Button onClick={() => setShowConfirmDeleteModal(false)}>No</Button>
                    </ModalFooter>
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
              <ModalHeader>
                Close
                <CloseOutline onClick={() => setShowConfirmModal(false)} />
              </ModalHeader>
              <ModalDescription>
                Do you really want to close the creation of a publication? If you close everything
                will be deleted.
              </ModalDescription>
              <ModalFooter>
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
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}
