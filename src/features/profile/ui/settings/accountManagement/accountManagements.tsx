import styles from './accountManagement.module.scss'
const classNames = {
  root: styles.root,
} as const

export const AccountManagements = () => {
  return <div className={classNames.root}>Account Management</div>
}
