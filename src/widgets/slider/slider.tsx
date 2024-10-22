import { ChangeEvent, useState } from 'react'
import Slider from 'react-slick'

import { Step } from '@/features'
import { ImageOutline } from '@/shared/assets'
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
export const Carousel = ({
  handleCloseModal,
  photos,
  postPhoto,
  setImage,
  step,
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const allPhotos = Array.isArray(photos) ? photos : [photos]
  const { fileInputRef, handleClick, handleFileChange, selectedImage } = useModalAddPhoto({
    handleCloseModal,
    postPhoto,
    setImage,
  })
  // const isSingleImage = allPhotos.length === 1
  // Carousel settings
  const settings = {
    adaptiveHeight: true,
    arrows: allPhotos.length > 1,
    // arrows: true,
    beforeChange: (current: number, next: number) => setActiveIndex(next),
    customPaging: (index: number) => (
      <div
        className={clsx(styles.dotsItem, { [styles.dotsItemActive]: index === activeIndex })}
      ></div>
    ),
    dots: allPhotos.length > 1,
    // infinite: !isSingleImage,
    infinite: allPhotos.length > 1,
    // nextArrow: null,
    // prevArrow: null,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
  }
  const handleImageAddition = (newImage: string | string[]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setImage(prevImages => {
      // Если предыдущие изображения это не массив, превращаем их в массив
      const updatedImages = Array.isArray(prevImages) ? prevImages : [prevImages]

      return [...updatedImages, newImage]
    })
  }

  const handleFileChangeWithAddition = async (event: ChangeEvent<HTMLInputElement>) => {
    await handleFileChange(event)
    if (selectedImage) {
      handleImageAddition(selectedImage)
    }
  }
  const carousel = allPhotos.map((photo, index) => (
    <div className={styles.photo} key={index}>
      <Image
        alt={`Image ${index + 1}`}
        className={styles.selectedImage}
        height={432}
        src={photo}
        width={492}
      />
    </div>
  ))

  // TODO: logic for cropping step
  return (
    <div className={styles.slider}>
      <Slider {...settings}>{carousel}</Slider>
      {step === 'cropping' && (
        <div>
          <Button onClick={handleClick} variant={'icon-link'}>
            <ImageOutline className={styles.icon} />
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
