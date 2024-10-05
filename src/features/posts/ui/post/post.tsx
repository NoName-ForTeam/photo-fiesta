import { forwardRef } from 'react'

import { Avatar } from '@/features'
import { useImagePostModal } from '@/features/posts/ui/imagePostModal/useImagePostModal'
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

    if (step === 'publication') {
      return (
        <section className={styles.formSection}>
          <div className={styles.profileInfo}>
            <img alt={'avatar'} src={avatar?.[0].url} />
            <Typography variant={'h3'}>{userId}</Typography>
          </div>
          <form id={'postDescription'} onSubmit={onSubmit} ref={ref}>
            <div className={styles.form}>
              <FormTextArea
                control={control}
                error={errors.description?.message}
                label={'Add publication descriptions'}
                name={'description'}
                placeholder={'Text-area'}
              />
              <Typography>
                <input className={styles.location} placeholder={'Location'} />
              </Typography>
            </div>
          </form>
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
