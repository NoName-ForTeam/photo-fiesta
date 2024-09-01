import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import styles from './authCard.module.scss'

export type AuthCardProps = ComponentPropsWithoutRef<'div'>
export const AuthCard = ({ className }: AuthCardProps) => {
  const classNames = {
    root: styles.root,
  } as const

  return <div className={clsx(classNames.root, className)}></div>
}
