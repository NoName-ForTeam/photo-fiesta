import { Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './profileStat.module.scss'
type ProfileStatProps = {
  className?: string
  counts: number
  title: string
}

/**
 * `ProfileStat` component displays a statistic for a profile such as
 * followers, following, or publications. If the number is greater than 1000,
 * it separates the first digit for styling purposes.
 *
 * @component
 * @example
 * // Usage example:
 * <ProfileStat counts={2764} title="Followers" />
 */

export const ProfileStat = ({ className, counts, title }: ProfileStatProps) => {
  const classNames = {
    firstDigit: styles.firstDigit,
    root: clsx(styles.root, className),
  }
  let firstDigit
  let restDigits

  //transform number to string and divide the first digit
  if (counts >= 1000) {
    firstDigit = counts.toString().charAt(0)
    restDigits = counts.toString().slice(1)
  }

  return (
    <div className={classNames.root}>
      <Typography variant={'textBold14'}>
        {firstDigit && <span className={styles.firstDigit}>{firstDigit}</span>}
        <span>{restDigits ? restDigits : counts}</span>
      </Typography>
      <Typography variant={'textBold14'}>{title}</Typography>
    </div>
  )
}
