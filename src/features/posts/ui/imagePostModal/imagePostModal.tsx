import { useState } from 'react'

import { Avatar, Post } from '@/features'
import { ArrowIosBackOutline } from '@/shared/assets'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './imagePostModal.module.scss'

type ImagePostModalProps = {
  avatar: Avatar[] | undefined
  handleClose: () => void
  selectedImage: null | string
  userId: number | undefined
}

export const ImagePostModal = ({
  avatar,
  handleClose,
  selectedImage,
  userId,
}: ImagePostModalProps) => {
  const [step, setStep] = useState<'cropping' | 'filters' | 'publication'>('cropping')
  const getStepTitle = () => {
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
    if (step === 'cropping') {
      setStep('filters')
    } else if (step === 'filters') {
      setStep('publication')
    }
  }

  const goToPrevStep = () => {
    if (step === 'publication') {
      setStep('filters')
    } else if (step === 'filters') {
      setStep('cropping')
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={clsx(styles.modalContent, step === 'cropping' ? styles.autoSize : '')}>
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

        <div className={styles.body}>
          <section className={styles.imageSection}>
            {selectedImage ? (
              <img alt={'Selected'} className={styles.selectedImage} src={selectedImage} />
            ) : (
              <Typography variant={'h2'}>No image selected</Typography>
            )}
          </section>
          <Post
            avatar={avatar}
            handleClose={handleClose}
            selectedImage={selectedImage}
            step={step}
            userId={userId}
          />
        </div>
      </div>
    </div>
  )
}
