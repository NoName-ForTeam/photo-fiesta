import { useDeleteAllMutation, useSessionsQuery } from '@/features/device/api/device.api'
import { Device } from '@/features/device/ui/device'
import { useTranslation } from '@/shared/utils'
import { Button, Typography } from '@photo-fiesta/ui-lib'

import styles from './devices.module.scss'

/**
 * A React component that displays the current device and a list of other active sessions.
 * Provides functionality to terminate all other sessions.
 */

export const Devices = () => {
  const { t } = useTranslation()
  const { data: devices, error, isLoading } = useSessionsQuery()
  const [deleteAll] = useDeleteAllMutation()
  const classNames = {
    btn: styles.btn,
    current: styles.current,
    others: styles.others,
    othersList: styles.othersList,
    root: styles.root,
    title: styles.title,
  } as const

  let devicesList

  if (!isLoading) {
    devicesList =
      devices?.others &&
      devices.others
        .filter(device => device.deviceId !== devices.current.deviceId)
        .map(device => <Device device={device} key={device.deviceId} other />)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading devices</div>
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.current}>
        <Typography title={classNames.title} variant={'h3'}>
          {t.devices.current}
        </Typography>
        {devices?.current ? (
          <Device device={devices.current} />
        ) : (
          <div>No current device found</div>
        )}
        <div className={classNames.btn}>
          <Button onClick={() => deleteAll()} variant={'outlined'}>
            {t.devices.terminate}
          </Button>
        </div>
      </div>

      <div className={classNames.others}>
        <div className={classNames.current}>
          <Typography title={classNames.title} variant={'h3'}>
            {t.devices.active}
          </Typography>
          <div className={classNames.othersList}>{devicesList}</div>
        </div>
      </div>
    </div>
  )
}
