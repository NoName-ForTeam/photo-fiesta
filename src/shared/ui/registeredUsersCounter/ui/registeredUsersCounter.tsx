import { useGetCountUsersQuery } from '@/features'
import { Card, Typography } from '@photo-fiesta/ui-lib'

import styles from './registeredUsersCounter.module.scss'

/**
 * This component displays the total number of registered users, formatting the number
 * @example
 * const App = () => {
 *   return <RegisteredUsersCounter />;
 * };
 */

export const RegisteredUsersCounter = () => {
  const { data: totalUsersCount } = useGetCountUsersQuery()

  // Converting the total count into an array of characters, padded to be 6 digits long
  const totalUsersCountArr = totalUsersCount?.totalCount.toString().padStart(6, '0').split('') || []

  const classNames = {
    counter: styles.counter,
    wrapper: styles.wrapper,
  } as const

  const emptyUsersNode = <Typography variant={'h2'}>0</Typography>

  return (
    <Card className={classNames.wrapper}>
      <Typography variant={'h2'}>Registered users:</Typography>
      {totalUsersCountArr.length ? (
        <div className={styles.counter}>
          {totalUsersCountArr.map((count, index) => (
            <Typography className={styles.count} key={index} variant={'h2'}>
              {count}
            </Typography>
          ))}
        </div>
      ) : (
        /*TODO: maybe change in future*/
        emptyUsersNode
      )}
    </Card>
  )
}
