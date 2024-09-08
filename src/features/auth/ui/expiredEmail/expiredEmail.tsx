import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import styles from './expiredEmail.module.scss'

export type ExpiredEmailProps = ComponentPropsWithoutRef<'div'>
export const ExpiredEmail = ({ className }: ExpiredEmailProps) => {
  const classNames = {
    root: styles.root,
  } as const

  return <div className={clsx(classNames.root, className)}></div>
}
