import { ChangeEvent, ComponentPropsWithoutRef, useRef, useState } from 'react'

import { CloseOutline, ImageOutline } from '@/shared/assets'
import { ALLOWED_FORMATS, MAX_FILE_SIZE } from '@/shared/config'
import { CustomDatePicker } from '@/shared/ui'
import {
  Button,
  Input,
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  Select,
  Typography,
} from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Image from 'next/image'

import styles from './generalInfo.module.scss'

export type GeneralInfoProps = ComponentPropsWithoutRef<'div'>
export const GeneralInfo = ({ className }: GeneralInfoProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const [image, setImage] = useState<null | string>(null)

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

  const handleCloseModal = () => {
    setIsOpen(false)
  }
  const handleOpenModal = () => {
    setIsOpen(true)
  }

  return (
    <div className={clsx(classNames.root, className)}>
      <div className={classNames.container}>
        <PhotoPreview image={image} preview={styles.imagePreview} size={192} />
        <Button className={classNames.uploadButton} onClick={handleOpenModal} variant={'outlined'}>
          Add a Profile Photo
        </Button>
      </div>
      <form className={classNames.form} onSubmit={() => {}}>
        <Input label={'Username*'} placeholder={'Enter your username'} />
        <Input label={'First name*'} placeholder={'Enter your first name'} />
        <Input label={'Last name*'} placeholder={'Enter your last name'} />
        <CustomDatePicker />
        <div className={classNames.selectBlock}>
          <Select
            className={classNames.select}
            label={'Select your country'}
            placeholder={'Country'}
          ></Select>
          <Select
            className={classNames.select}
            label={'Select your city'}
            placeholder={'City'}
          ></Select>
        </div>

        {/* <div className={classNames.textareaBlock}>
          <TextArea
            className={classNames.textarea}
            label={'About me'}
            placeholder={'Enter your about me'}
          />
        </div> */}
        <Button className={classNames.submit}>Save Changes</Button>
      </form>
      <ModalAddPhoto
        handleCloseModal={handleCloseModal}
        image={image}
        isOpen={isOpen}
        setImage={setImage}
      />
    </div>
  )
}

//PHOTO PREVIEW

type PhotoPreviewProps = {
  image: null | string
  preview: string
  size: number
}

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
  image: null | string
  isOpen: boolean
  setImage: (image: null | string) => void
}

const ModalAddPhoto = ({ handleCloseModal, image, isOpen, setImage }: ModalAddPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<null | string>(null)
  const classNames = {
    block: styles.block,
    close: styles.close,
    content: styles.content,
    error: clsx(styles.error, error && styles.visible),
    header: styles.header,
    main: styles.main,
    save: styles.save,
  } as const
  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError('Photo size must be less than 10 MB!')

        return
      }

      if (!ALLOWED_FORMATS.includes(file.type)) {
        setError('The format of the uploaded photo must be PNG and JPEG')

        return
      }

      const reader = new FileReader()

      reader.onload = e => {
        setImage(e.target?.result as string)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

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
              Error! Photo size must be less than 10 MB!
            </Typography>
          </div>
          <div className={classNames.block}>
            <PhotoPreview image={image} preview={styles.photoPreview} size={228} />
            <input
              accept={'image/*'}
              hidden
              onChange={handleFileChange}
              ref={fileInputRef}
              type={'file'}
            />
            {false && (
              <Button fullWidth onClick={handleClick}>
                Select from Computer
              </Button>
            )}
            {true && <Button className={classNames.save}>Save</Button>}
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
