import { useEffect, useRef, useState } from 'react'

import {
  Avatar,
  Post,
  useDeletePostMutation,
  useDeleteUploadImageMutation,
  useGetPostByIdQuery,
} from '@/features'
import { ArrowIosBackOutline, CloseOutline } from '@/shared/assets'
import { ProfileAvatar } from '@/shared/ui'
import {
  Button,
  Modal,
  ModalDescription,
  ModalFooter,
  ModalHeader,
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
  const [step, setStep] = useState<'cropping' | 'filters' | 'publication'>('cropping')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const { data: postById } = useGetPostByIdQuery({ postId })
  const [deleteImage] = useDeleteUploadImageMutation()
  const [deletePost] = useDeletePostMutation()

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowConfirmModal(true) // Открываем модалку подтверждения
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Логика удаления поста и картинки при подтверждении
  const confirmDelete = async () => {
    if (selectedImage) {
      await deleteImage({ uploadId: selectedImage }) // Удаляем картинку
    }
    await deletePost({ postId }) // Удаляем пост
    handleClose() // Закрываем модалку
  }

  const getStepTitle = () => {
    if (viewMode) {
      return 'View Post' // Название для режима просмотра
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
                <CloseOutline onClick={confirmDelete} />
                <ProfileAvatar avatarOwner={avatar?.[0]?.url} />
                <Typography variant={'h3'}>{userId}</Typography>
              </div>
              <div className={styles.postDetails}>
                <Typography variant={'h3'}>{postById?.description}</Typography>
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
