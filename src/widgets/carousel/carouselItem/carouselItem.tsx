import ReactCrop, { Crop } from 'react-image-crop'

import Image from 'next/image'

import styles from './carouselItem.module.scss'

import { ImageData } from '../carousel'

type CarouselItemProps = {
  handleCropChange: (crop: Crop) => void
  imageData: ImageData
  index: number
  step?: string
}

export const CarouselItem = ({ handleCropChange, imageData, index, step }: CarouselItemProps) => {
  return (
    <div>
      {step === 'cropping' ? (
        <ReactCrop
          aspect={imageData.aspectRatio.value ?? undefined}
          crop={imageData.crop}
          onChange={(_, percentCrop) => handleCropChange(percentCrop)}
        >
          <Image
            alt={`Image ${index + 1}`}
            className={styles.selectedImage}
            height={432}
            src={imageData.src}
            style={{
              transform: `scale(${imageData.zoom})`,
            }}
            width={492}
          />
        </ReactCrop>
      ) : (
        <Image
          alt={`Image ${index + 1}`}
          className={styles.selectedImage}
          height={432}
          src={imageData.src}
          style={{
            transform: `scale(${imageData.zoom})`,
          }}
          width={492}
        />
      )}
    </div>
  )
}
