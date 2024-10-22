import { ChangeEvent, useState } from 'react'
import Slider from 'react-slick'

import { Step } from '@/features'
import { ArrowIosBackOutline, ArrowIosForwardOutline, ImageOutline } from '@/shared/assets'
import { useModalAddPhoto } from '@/widgets/modals/ui/modalAddPhoto/useModalAddPhoto'
import { Button } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Image from 'next/image'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import styles from './slider.module.scss'

type CarouselProps = {
  handleCloseModal: () => void
  photos: string | string[]
  postPhoto?: boolean
  setImage: (image: null | string | string[]) => void
  step?: Step
}
/**
 * Carousel component for displaying images in a slider, with the ability to add more images.
 * It includes navigation arrows for browsing through images and logic for handling file input and image uploads.
 */
export const Carousel = ({
  handleCloseModal,
  photos,
  postPhoto,
  setImage,
  step,
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [indexArrow, setIndexArrow] = useState(0)

  const { fileInputRef, handleClick, handleFileChange, selectedImage } = useModalAddPhoto({
    handleCloseModal,
    postPhoto,
    setImage,
  })

  const classNames = {
    dotsItem: styles.dotsItem,
    dotsItemActive: styles.dotsItemActive,
    icon: styles.icon,
    selectedImage: styles.selectedImage,
    slider: styles.slider,
  }
  const allPhotos = Array.isArray(photos) ? photos : [photos]
  /**
   * Settings for the react-slick slider.
   * These settings configure how the carousel behaves, including arrows, dots, and transition speed.
   */
  const settings = {
    adaptiveHeight: true,
    arrows: allPhotos.length > 1,
    beforeChange: (current: number, next: number) => setActiveIndex(next),
    customPaging: (index: number) => (
      <div
        className={clsx(classNames.dotsItem, {
          [classNames.dotsItemActive]: index === activeIndex,
        })}
      ></div>
    ),
    dots: allPhotos.length > 1,
    infinite: allPhotos.length > 1,
    nextArrow: (
      <NextArrowComponent
        indexArrow={indexArrow}
        photosLength={photos?.length}
        setIndexArrow={setIndexArrow}
      />
    ),
    prevArrow: (
      <PrevArrowComponent
        indexArrow={indexArrow}
        photosLength={photos?.length}
        setIndexArrow={setIndexArrow}
      />
    ),
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
  }
  /**
   * Handles the addition of a new image to the carousel.
   * Updates the images array with the newly added image(s).
   */
  const handleImageAddition = (newImage: string | string[]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setImage(prevImages => {
      const updatedImages = Array.isArray(prevImages) ? prevImages : [prevImages]

      return [...updatedImages, newImage]
    })
  }

  /**
   * Handles file input change and adds the selected image to the carousel.
   * This function is triggered when a new image file is selected.
   */
  const handleFileChangeWithAddition = async (event: ChangeEvent<HTMLInputElement>) => {
    await handleFileChange(event)
    if (selectedImage) {
      handleImageAddition(selectedImage)
    }
  }
  const carousel = allPhotos.map((photo, index) => (
    <div key={index}>
      <Image
        alt={`Image ${index + 1}`}
        className={classNames.selectedImage}
        height={432}
        src={photo}
        width={492}
      />
    </div>
  ))

  // TODO: logic for cropping step
  return (
    <div className={classNames.slider}>
      <Slider {...settings}>{carousel}</Slider>
      {step === 'cropping' && (
        <div>
          <Button onClick={handleClick} variant={'icon-link'}>
            <ImageOutline className={classNames.icon} />
          </Button>
          <input
            accept={'image/*'}
            hidden
            multiple
            onChange={handleFileChangeWithAddition}
            ref={fileInputRef}
            type={'file'}
          />
        </div>
      )}
    </div>
  )
}

type ArrowsProps = {
  callbackFunction?: () => void
  indexArrow: number
  onClick?: () => void
  photosLength?: number
  setIndexArrow: (value: number) => void
}
/** NextArrowComponent - Renders the "next" arrow button for the carousel.*/
export const NextArrowComponent = ({
  callbackFunction,
  indexArrow,
  onClick,
  photosLength,
  setIndexArrow,
}: ArrowsProps) => {
  if (
    indexArrow === (photosLength ? photosLength - 1 : 0) ||
    (photosLength ? photosLength : 0) <= 1
  ) {
    return null
  }
  /**
   * Handles the click event for the "next" arrow, advancing the carousel.
   * Updates the slide index and triggers optional callbacks.
   */
  const handleClick = () => {
    setIndexArrow(indexArrow + 1)
    if (callbackFunction) {
      callbackFunction()
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <Button className={styles.nextArrow} onClick={handleClick} variant={'icon-link'}>
      <ArrowIosForwardOutline />
    </Button>
  )
}
/** PrevArrowComponent - Renders the "previous" arrow button for the carousel.*/
export const PrevArrowComponent = ({
  callbackFunction,
  indexArrow,
  onClick,
  photosLength,
  setIndexArrow,
}: ArrowsProps) => {
  if (indexArrow === 0 || (photosLength ? photosLength : 0) <= 1) {
    return null
  }
  /**
   * Handles the click event for the "previous" arrow, going back in the carousel.
   * Updates the slide index and triggers optional callbacks.
   */
  const handleClick = () => {
    setIndexArrow(indexArrow - 1)
    if (callbackFunction) {
      callbackFunction()
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <Button className={styles.prevArrow} onClick={handleClick} variant={'icon-link'}>
      <ArrowIosBackOutline />
    </Button>
  )
}
