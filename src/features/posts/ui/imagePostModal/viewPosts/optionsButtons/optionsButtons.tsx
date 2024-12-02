import { BookmarkOutline, HeartOutline, PaperPlaneOutline } from '@/shared/assets'

import styles from './optionsButtons.module.scss'

export const OptionsButtons = () => {
  const classNames = {
    buttons: styles.buttons,
    icon: styles.icon,
    likeWrite: styles.likeWrite,
  }

  return (
    <div className={classNames.buttons}>
      <div className={classNames.likeWrite}>
        <HeartOutline className={classNames.icon} />
        <PaperPlaneOutline className={classNames.icon} />
      </div>
      <BookmarkOutline className={classNames.icon} />
    </div>
  )
}
