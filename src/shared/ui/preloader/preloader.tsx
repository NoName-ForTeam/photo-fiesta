import { Typography } from '@photo-fiesta/ui-lib'

import styles from './preloader.module.scss'

export const Loader = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <Typography className={styles.loader} variant={'h3'}>
          Loading...
        </Typography>
      </div>
    </div>
  )
}
