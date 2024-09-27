import styles from './myPayments.module.scss'
const classNames = {
  root: styles.root,
} as const

export const MyPayments = () => {
  return <div className={classNames.root}>My Payments</div>
}
