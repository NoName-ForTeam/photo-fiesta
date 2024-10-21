import { useState } from 'react'
import Slider from 'react-slick'

import { Step } from '@/features'
import { ArrowIosBackOutline, ArrowIosForwardOutline, ImageOutline } from '@/shared/assets'
import { Button } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Image from 'next/image'

import styles from './slider.module.scss'

type CarouselProps = {
  handleCloseModal: () => void
  photos: string | string[]
  postPhoto?: boolean
  step: Step
}
export const Carousel = ({ photos, step }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const allPhotos = Array.isArray(photos) ? photos : [photos]

  const isSingleImage = allPhotos.length === 1
  // Carousel settings
  const settings = {
    arrows: !isSingleImage,
    beforeChange: (current: number, next: number) => setActiveIndex(next),
    customPaging: (index: number) => (
      <div
        className={clsx(styles.dotsItem, { [styles.dotsItemActive]: index === activeIndex })}
      ></div>
    ),
    dots: allPhotos.length > 1,
    infinite: !isSingleImage,
    nextArrow: <ArrowIosForwardOutline />,
    prevArrow: <ArrowIosBackOutline />,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
  }
  const handleCloseModal = () => {}
  const carousel = allPhotos.map((photo, index) => (
    <div key={index}>
      <Image
        alt={`Image ${index + 1}`}
        className={styles.selectedImage}
        height={432}
        src={photo}
        width={492}
      />

      {step === 'cropping' && (
        <Button onClick={handleCloseModal} variant={'icon-link'}>
          <ImageOutline />
        </Button>
      )}
    </div>
  ))

  // TODO: logic for cropping step
  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>{carousel}</Slider>
    </div>
  )
}
