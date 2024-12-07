import { useTranslation } from '@/shared/utils'
import { Button } from '@photo-fiesta/ui-lib'

import styles from './addComments.module.scss'

export const AddComments = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.addComment}>
      {t.posts.addComment} <Button variant={'ghost'}>{t.posts.publish}</Button>
    </div>
  )
}
