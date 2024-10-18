import { Button, Typography } from '@photo-fiesta/ui-lib'
import Image from 'next/image'

import styles from './slider.module.scss'

type SliderProps = {
  selectedImage: null | string
}

export const ImageSlider = ({ selectedImage }: SliderProps) => {
  return (
    <div className={styles.slider}>
      <div className={styles.sliderWrapper}>
        {selectedImage && selectedImage.length > 0 ? (
          <Image
            alt={'Selected'}
            className={styles.selectedImage}
            height={432}
            src={selectedImage}
            width={492}
          />
        ) : (
          <Typography variant={'h2'}>No images available</Typography>
        )}
        {selectedImage && selectedImage.length > 1 && (
          <div className={styles.controls}>
            <Button>Prev</Button>
            <Button>Next</Button>
          </div>
        )}
      </div>
    </div>
  )
}
