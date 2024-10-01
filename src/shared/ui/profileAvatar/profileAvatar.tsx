import { avaTest } from '@/shared/assets'
import clsx from 'clsx'
import Image from 'next/image'

import styles from './profileAvatar.module.scss'

type Props = {
  avatarOwner: string | undefined
  className?: string
  height?: number
  width?: number
}
export const ProfileAvatar = (props: Props) => {
  const { avatarOwner, className, height = 36, width = 36 } = props

  const classNames = {
    avatar: clsx(styles.avatar, className),
  }

  return (
    <Image
      alt={'avatar image'}
      className={classNames.avatar}
      height={height}
      src={avatarOwner ?? avaTest}
      width={width}
    />
  )
}
