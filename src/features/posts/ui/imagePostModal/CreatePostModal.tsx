import { useEffect, useRef, useState } from 'react'

import { Avatar, Post } from '@/features'
import { ArrowIosBackOutline } from '@/shared/assets'
import { useChangeTitle } from '@/shared/utils/hooks/useChangeTitle'
import { Carousel, ConfirmationModal } from '@/widgets'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './imagePostModal.module.scss'

type CreatePostModalProps = {
  avatar: Avatar[] | undefined
  handleClose: () => void
  isEditing?: boolean
  postId?: number | undefined
  selectedImage: null | string | string[]
  setIsEditing: (isEditing: boolean) => void
  setSelectedImage: (image: null | string | string[]) => void
  userId: number | undefined
}

export const CreatePostModal = ({
  avatar,
  handleClose,
  isEditing,
  postId,
  selectedImage,
  setIsEditing,
  setSelectedImage,
  userId,
}: CreatePostModalProps) => {
  const { changeStep, getStepTitle, step } = useChangeTitle({ isEditing })
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  /**
   * Sets up an event listener for mouse down events on the document (ImagePostModal for creating post).
   * When a click event occurs outside the modal reference element and the modal is not in view mode,
   * it sets `showConfirmModal` to true.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowConfirmModal(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /**The function aborts the process of editing a post and does not save any changes */
  const interruptionCreatePost = () => {
    setShowConfirmModal(false)
    handleClose()
  }

  return (
    <div className={styles.overlay}>
      <div
        className={clsx(styles.modalContent, step === 'cropping' ? styles.autoSize : '')}
        ref={modalRef}
      >
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
        <div className={styles.body}>
          <section className={styles.imageSection}>
            {selectedImage ? (
              <Carousel
                handleCloseModal={handleClose}
                photos={selectedImage}
                // postPhoto
                setImage={setSelectedImage}
                step={step}
              />
            ) : (
              <Typography variant={'h2'}>No image selected</Typography>
            )}
          </section>
          <Post
            avatar={avatar}
            handleClose={handleClose}
            postId={postId || undefined}
            selectedImage={selectedImage}
            setIsEditing={setIsEditing}
            step={step}
            userId={userId}
          />
          {/*TODO: rename buttons*/}
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
