import styles from './devices.module.scss'
export const Devices = () => {
  const classNames = {
    root: styles.root,
  } as const

  return <div className={classNames.root}>Devices</div>
}
