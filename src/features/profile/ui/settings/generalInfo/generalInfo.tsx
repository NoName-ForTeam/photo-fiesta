import { ChangeEvent, ComponentPropsWithoutRef, useRef, useState } from 'react'

import { ImageOutline } from '@/shared/assets'
import { CustomDatePicker } from '@/shared/ui'
import { Button, Input, Select, TextArea } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Image from 'next/image'

import styles from './generalInfo.module.scss'

export type GeneralInfoProps = ComponentPropsWithoutRef<'div'>
export const GeneralInfo = ({ className }: GeneralInfoProps) => {
  const [image, setImage] = useState<null | string>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = e => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  const classNames = {
    container: styles.container,
    form: styles.form,
    icon: styles.icon,
    imagePreview: styles.imagePreview,
    imageWrapper: styles.imageWrapper,
    placeholder: styles.placeholder,
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
        <div className={classNames.imagePreview}>
          {image ? (
            <div className={classNames.imageWrapper}>
              <Image alt={'Uploaded'} height={192} src={image} width={192} />
            </div>
          ) : (
            <span className={classNames.placeholder}>
              <ImageOutline className={classNames.icon} />
            </span>
          )}
        </div>
        <input
          accept={'image/*'}
          hidden
          onChange={handleFileChange}
          ref={fileInputRef}
          type={'file'}
        />
        <Button className={classNames.uploadButton} onClick={handleClick} variant={'outlined'}>
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

        <div className={classNames.textareaBlock}>
          <TextArea
            className={classNames.textarea}
            label={'About me'}
            placeholder={'Enter your about me'}
          />
        </div>
        <Button className={classNames.submit}>Save Changes</Button>
      </form>
    </div>
  )
}
