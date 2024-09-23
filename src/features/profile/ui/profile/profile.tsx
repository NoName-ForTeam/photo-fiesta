import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import styles from './profile.module.scss'

export type ProfileProps = ComponentPropsWithoutRef<'div'>
export const Profile = ({ className }: ProfileProps) => {
  const classNames = {
    root: styles.root,
  } as const

  return <div className={clsx(classNames.root, className)}></div>
}
