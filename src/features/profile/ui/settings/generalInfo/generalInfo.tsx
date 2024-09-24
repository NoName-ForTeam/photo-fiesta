import { ComponentPropsWithoutRef } from 'react'

import { ModalAddPhoto } from '@/features'
import { ImageOutline } from '@/shared/assets'
import { City, Country, cities, countries } from '@/shared/config'
import { FormDatePicker } from '@/shared/ui'
import { Button, FormInput, FormSelect, FormTextArea, SelectItem } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Image from 'next/image'

import styles from './generalInfo.module.scss'

import { useGeneralInfo } from './useGeneralInfo'

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
    datePicker: styles.datePicker,
    form: styles.form,
    line: styles.line,
    root: styles.root,
    select: styles.select,
    selectBlock: styles.selectBlock,
    submit: styles.submit,
    textarea: styles.textarea,
    uploadButton: styles.uploadButton,
  } as const

  const renderCountryOptions = (countries: Country[]) => {
    return countries.map(country => (
      <SelectItem key={country.id} value={country.countryEn}>
        {country.countryEn}
      </SelectItem>
    ))
  }

  const renderCityOptions = (cities: City[]) => {
    return cities.map(city => (
      <SelectItem key={city.id} value={city.cityEn}>
        {city.cityEn}
      </SelectItem>
    ))
  }

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
          className={classNames.datePicker}
          control={control}
          errorMessage={errors.dateOfBirth?.message}
          label={'Date of birth*'}
          name={'dateOfBirth'}
        />
        <div className={classNames.selectBlock}>
          <FormSelect
            className={classNames.select}
            control={control}
            defaultValue={String(countries[0].id)}
            label={'Select your country'}
            name={'country'}
          >
            {renderCountryOptions(countries)}
          </FormSelect>
          <FormSelect
            className={classNames.select}
            control={control}
            defaultValue={String(cities[0].id)}
            label={'Select your city'}
            name={'city'}
          >
            {renderCityOptions(cities)}
          </FormSelect>
        </div>
        <FormTextArea
          className={classNames.textarea}
          control={control}
          label={'About me'}
          name={'aboutMe'}
        />
        <div className={classNames.line}></div>
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
