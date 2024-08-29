import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import styles from './signIn.module.scss'

export type SignInProps = ComponentPropsWithoutRef<'div'>
export const SignIn = ({ className }: SignInProps) => {
  const classNames = {
    root: styles.root,
  } as const

  return <div className={clsx(classNames.root, className)}></div>
}
