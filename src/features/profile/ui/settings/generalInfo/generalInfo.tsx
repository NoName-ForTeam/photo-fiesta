import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import styles from './generalInfo.module.scss'

export type GeneralInfoProps = ComponentPropsWithoutRef<'div'>
export const GeneralInfo = ({ className }: GeneralInfoProps) => {
  const classNames = {
    root: styles.root,
  } as const

  return <div className={clsx(classNames.root, className)}></div>
}
