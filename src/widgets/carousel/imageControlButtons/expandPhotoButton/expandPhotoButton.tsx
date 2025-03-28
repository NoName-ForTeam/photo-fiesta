import { ExpandOutline, ImageOutline } from '@/shared/assets'
import {
  Button,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  Typography,
} from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './expandPhotoButton.module.scss'

type ExpandPhotoButtonProps = {
  currentAspectRatio: { label: string; value: null | number }
  onAspectRatioChange: (newAspectRatio: { label: string; value: null | number }) => void
}

/**
 * ExpandPhotoButton component for selecting different aspect ratios for a photo.
 */

export const ExpandPhotoButton = ({
  currentAspectRatio,
  onAspectRatioChange,
}: ExpandPhotoButtonProps) => {
  const classNames = {
    active: styles.active,
    buttonBlock: styles.buttonBlock,
    expandPhoto: styles.expandPhoto,
    extendContent: styles.extendContent,
    extendElement: styles.extendElement,
    extendIcon: styles.extendIcon,
    extendSquare: styles.extendSquare,
    icon: styles.icon,
    portrait: styles.five,
    trigger: styles.trigger,
    wideScreen: styles.nine,
    wrapper: styles.wrapper,
  } as const

  const aspectRatios = [
    { label: 'Original', value: null },
    { label: '1:1', value: 1 },
    { label: '4:5', value: 4 / 5 },
    { label: '16:9', value: 16 / 9 },
  ]

  return (
    <div className={clsx(classNames.wrapper, classNames.expandPhoto)}>
      <PopoverRoot>
        <PopoverTrigger asChild className={classNames.trigger}>
          <div className={classNames.buttonBlock}>
            <Button asChild variant={'icon-link'}>
              <ExpandOutline className={classNames.icon} />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent align={'start'} className={classNames.extendContent} side={'left'}>
          {aspectRatios.map(ratio => {
            const isActive = currentAspectRatio?.label === ratio.label

            return (
              <div
                className={clsx(classNames.extendElement, isActive && classNames.active)}
                key={ratio.label}
                onClick={() => onAspectRatioChange(ratio)}
              >
                <Typography variant={ratio.label === 'Original' ? 'h3' : 'text16'}>
                  {ratio.label}
                </Typography>
                {ratio.label === 'Original' ? (
                  <ImageOutline
                    className={clsx(classNames.extendIcon, isActive && classNames.active)}
                  />
                ) : (
                  <div
                    className={clsx(
                      classNames.extendSquare,
                      ratio.label === '4:5' && classNames.portrait,
                      ratio.label === '16:9' && classNames.wideScreen,
                      isActive && classNames.active
                    )}
                  ></div>
                )}
              </div>
            )
          })}
        </PopoverContent>
      </PopoverRoot>
    </div>
  )
}
