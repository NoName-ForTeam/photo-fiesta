import { ComponentPropsWithoutRef } from 'react'

import { CloseOutline, ImageOutline } from '@/shared/assets'
import { FormDatePicker } from '@/shared/ui'
import {
  Button,
  FormInput,
  FormSelect,
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  Typography,
} from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Image from 'next/image'

import styles from './generalInfo.module.scss'

import { useGeneralInfo } from './useGeneralInfo'
import { useModalAddPhoto } from './useModalAddPhoto'

export type GeneralInfoProps = ComponentPropsWithoutRef<'div'>
/**
 * GeneralInfo component for displaying and editing user information
 * @example
 * <GeneralInfo className="custom-class" />
 */
export const GeneralInfo = ({ className }: GeneralInfoProps) => {
  const { control, errors, handleCloseModal, handleOpenModal, image, isOpen, onSubmit, setImage } =
    useGeneralInfo()

  const classNames = {
    container: styles.container,
    form: styles.form,
    root: styles.root,
    select: styles.select,
    selectBlock: styles.selectBlock,
    submit: styles.submit,
    textarea: styles.textarea,
    textareaBlock: styles.textareaBlock,
    uploadButton: styles.uploadButton,
  } as const

  return (
    <div className={clsx(classNames.root, className)}>
      <div className={classNames.container}>
        <PhotoPreview image={image} preview={styles.imagePreview} size={192} />
        <Button className={classNames.uploadButton} onClick={handleOpenModal} variant={'outlined'}>
          Add a Profile Photo
        </Button>
      </div>
      <form className={classNames.form} onSubmit={onSubmit}>
        <FormInput
          control={control}
          errorMessage={errors.userName?.message}
          label={'Username*'}
          name={'userName'}
          placeholder={'Enter your username'}
          type={'text'}
        />
        <FormInput
          control={control}
          errorMessage={errors.firstName?.message}
          label={'First name*'}
          name={'firstName'}
          placeholder={'Enter your first name'}
          type={'text'}
        />
        <FormInput
          control={control}
          errorMessage={errors.lastName?.message}
          label={'Last name*'}
          name={'lastName'}
          placeholder={'Enter your last name'}
          type={'text'}
        />

        <FormDatePicker
          control={control}
          errorMessage={errors.dateOfBirth?.message}
          label={'Date of birth*'}
          name={'dateOfBirth'}
        />
        <div className={classNames.selectBlock}>
          <FormSelect control={control} label={'Select your country'} name={'country'} />
          <FormSelect control={control} label={'Select your city'} name={'city'} />
        </div>
        {/**TODO: add textarea and resolve problem with z-index*/}
        <div className={classNames.textareaBlock}>
          {/* <FormTextArea control={control} label={'About me'} name={'aboutMe'} /> */}
        </div>
        <Button className={classNames.submit}>Save Changes</Button>
      </form>
      <ModalAddPhoto handleCloseModal={handleCloseModal} isOpen={isOpen} setImage={setImage} />
    </div>
  )
}

//PHOTO PREVIEW

type PhotoPreviewProps = {
  image: null | string
  preview: string
  size: number
}
/**
 * PhotoPreview component for displaying a user's profile photo or placeholder
 * <PhotoPreview image="https://example.com/photo.jpg" preview="previewClass" size={192} />
 */
export const PhotoPreview = ({ image, preview, size }: PhotoPreviewProps) => {
  const classNames = {
    icon: styles.icon,
    imageWrapper: styles.imageWrapper,
    placeholder: styles.placeholder,
    preview,
  } as const

  return (
    <div className={classNames.preview}>
      {image ? (
        <div className={classNames.imageWrapper}>
          {/** *width and height are required for the image to be displayed in next */}
          {/** *TODO: add button as red circle with X icon to remove image in profile settings*/}
          <Image alt={'Uploaded'} height={size} src={image} width={size} />
        </div>
      ) : (
        <span className={classNames.placeholder}>
          <ImageOutline className={classNames.icon} />
        </span>
      )}
    </div>
  )
}

//MODAL
type ModalAddPhotoProps = {
  handleCloseModal: () => void
  isOpen: boolean
  setImage: (image: null | string) => void
}
/**
 * ModalAddPhoto component for adding or changing a profile photo
 */
const ModalAddPhoto = ({ handleCloseModal, isOpen, setImage }: ModalAddPhotoProps) => {
  const { error, fileInputRef, handleClick, handleFileChange, handleSave, isSaved, selectedImage } =
    useModalAddPhoto({ handleCloseModal, isOpen, setImage })

  const classNames = {
    block: styles.block,
    close: styles.close,
    content: styles.content,
    error: clsx(styles.error, error && styles.visible),
    header: styles.header,
    main: styles.main,
    save: styles.save,
  } as const

  return (
    <Modal open={isOpen}>
      <ModalContent className={classNames.content}>
        <ModalHeader className={classNames.header}>
          <Typography variant={'h1'}>Add a Profile Photo</Typography>
          <ModalClose>
            <CloseOutline className={classNames.close} onClick={handleCloseModal} />
          </ModalClose>
        </ModalHeader>
        <div className={classNames.main}>
          <div className={classNames.error}>
            <Typography as={'span'} variant={'textBold16'}>
              Error!{' '}
            </Typography>
            <Typography as={'span'} variant={'text14'}>
              Error! {error}
            </Typography>
          </div>
          <div className={classNames.block}>
            <PhotoPreview image={selectedImage} preview={styles.photoPreview} size={228} />
            <input
              accept={'image/*'}
              hidden
              onChange={handleFileChange}
              ref={fileInputRef}
              type={'file'}
            />
            {!selectedImage && !isSaved && (
              <Button fullWidth onClick={handleClick}>
                Select from Computer
              </Button>
            )}
            {selectedImage && !error && !isSaved && (
              <Button className={classNames.save} onClick={handleSave}>
                Save
              </Button>
            )}
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
