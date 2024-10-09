import { useGetCountUsersQuery } from '@/features'
import { Card, Typography } from '@photo-fiesta/ui-lib'

import styles from './registeredUsersCounter.module.scss'

export const RegisteredUsersCounter = () => {
  const { data: totalUsersCount } = useGetCountUsersQuery()

  const totalUsersCountArr = totalUsersCount?.totalCount.toString().padStart(6, '0').split('') || []

  const classNames = {
    counter: styles.counter,
    wrapper: styles.wrapper,
  } as const

  return (
    <Card className={classNames.wrapper}>
      <Typography variant={'h2'}>Registered users:</Typography>
      <div className={styles.counter}>
        {totalUsersCountArr.map((count, index) => (
          <Typography className={styles.count} key={index} variant={'h2'}>
            {count}
          </Typography>
        ))}
      </div>
    </Card>
  )
}
