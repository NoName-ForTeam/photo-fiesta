import { BookmarkOutline, HeartOutline, PaperPlaneOutline } from '@/shared/assets'

import styles from './optionsButtons.module.scss'

export const OptionsButtons = () => {
  return (
    <div className={styles.buttons}>
      <div className={styles.likeWrite}>
        <HeartOutline className={styles.icon} />
        <PaperPlaneOutline className={styles.icon} />
      </div>
      <BookmarkOutline className={styles.icon} />
    </div>
  )
}
