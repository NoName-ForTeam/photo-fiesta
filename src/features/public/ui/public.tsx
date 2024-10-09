import { RegisteredUsersCounter } from '@/shared/ui'

import styles from './publicPage.module.scss'
export const Public = () => {
  const classNames = {
    container: styles.container,
  }

  return (
    <div className={classNames.container}>
      <RegisteredUsersCounter />
      <div>
        PostsList
      </div>
    </div>
  )
}
