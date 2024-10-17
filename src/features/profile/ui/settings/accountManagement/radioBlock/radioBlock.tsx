import { ComponentPropsWithoutRef } from 'react'

import { RadioGroupItem, Typography } from '@photo-fiesta/ui-lib'

import styles from './radioBlock.module.scss'

type RadioBlockProps = {
  title: string
  value: string
} & ComponentPropsWithoutRef<'div'>

/**
 * RadioBlock component for rendering a radio button with a label
 */

export const RadioBlock = ({ title, value }: RadioBlockProps) => {
  const classNames = {
    block: styles.block,
    radio: styles.radio,
  } as const

  return (
    <div className={classNames.block}>
      <RadioGroupItem className={classNames.radio} value={value} />
      <Typography variant={'text14'}>{title}</Typography>
    </div>
  )
}
