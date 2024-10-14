import { forwardRef, useState } from 'react'
import { Controller } from 'react-hook-form'

import { Avatar, useImagePostModal } from '@/features'
import { PinOutline } from '@/shared/assets'
import { ProfileAvatar } from '@/shared/ui'
import { FormTextArea, Typography } from '@photo-fiesta/ui-lib'

import styles from './post.module.scss'

type PostProps = {
  avatar: Avatar[] | undefined
  handleClose: () => void
  selectedImage: null | string
  step: 'cropping' | 'filters' | 'publication'
  userId: number | undefined
}

export const Post = forwardRef<HTMLFormElement, PostProps>(
  ({ avatar, handleClose, selectedImage, step, userId }, ref) => {
    const { control, errors, onSubmit } = useImagePostModal({ handleClose, selectedImage })
    const [charCount, setCharCount] = useState(0)

    if (step === 'publication') {
      return (
        <section className={styles.formSection}>
          <div className={styles.profileInfo}>
            <ProfileAvatar avatarOwner={avatar?.[0].url} />
            <Typography variant={'h3'}>{userId}</Typography>
          </div>
          <form id={'postDescription'} onSubmit={onSubmit} ref={ref}>
            <div className={styles.form}>
              <Controller
                control={control}
                name={'description'}
                render={({ field }) => (
                  <>
                    <FormTextArea
                      {...field}
                      control={control}
                      error={errors.description?.message}
                      label={'Add publication descriptions'}
                      onChangeValue={value => {
                        field.onChange(value)
                        setCharCount(value.length)
                      }}
                      placeholder={'Text-area'}
                    />
                    <Typography className={styles.char} variant={'textSmall'}>
                      {charCount}/500
                    </Typography>
                  </>
                )}
              />
            </div>
          </form>
          <div className={styles.locationContainer}>
            <Typography>
              <label className={styles.locationLabel}>Add location</label>
              <div className={styles.textareaWrapper}>
                <textarea className={styles.location} name={'location'} placeholder={'NewYork'} />
                <PinOutline className={styles.icon} />
              </div>
            </Typography>
          </div>
        </section>
      )
    }

    if (step === 'filters') {
      return (
        <div className={styles.filterSection}>
          <Typography variant={'h3'}>Apply Filters</Typography>
          {/* Здесь могут быть ползунки фильтров и другие элементы */}
        </div>
      )
    }

    return null // Если step === 'cropping', правая часть не отображается
  }
)
