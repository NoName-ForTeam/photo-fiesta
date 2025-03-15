import { DeviceComp, useDeleteAllMutation, useGetSessionsQuery } from '@/features'
import { Loader } from '@/shared/ui'
import { useTranslation } from '@/shared/utils'
import { Button, Typography } from '@photo-fiesta/ui-lib'

import styles from './devices.module.scss'

/**
 * A React component that displays the current device and a list of other active sessions.
 * Provides functionality to terminate all other sessions.
 */

export const Devices = () => {
  const { t } = useTranslation()
  const { data: devices, error, isLoading } = useGetSessionsQuery()
  const [deleteAll] = useDeleteAllMutation()
  const classNames = {
    btn: styles.btn,
    current: styles.current,
    infoLoggedDevices: styles.infoLoggedDevices,
    others: styles.others,
    othersList: styles.othersList,
    root: styles.root,
    title: styles.title,
  } as const

  let devicesList = null

  if (!isLoading) {
    devicesList =
      devices?.others &&
      devices.others
        .filter(device => device.deviceId !== devices.current.deviceId)
        .map(device => <DeviceComp device={device} key={device.deviceId} other />)
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error loading devices</div>
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.current}>
        <Typography title={classNames.title} variant={'textMedium14'}>
          {t.devices.current}
        </Typography>
        {devices?.current ? (
          <DeviceComp device={devices.current} />
        ) : (
          <div>No current device found</div>
        )}
      </div>
      <div className={classNames.btn}>
        <Button
          disabled={!devicesList || devicesList.length === 0}
          onClick={() => deleteAll()}
          variant={'outlined'}
        >
          {t.devices.terminate}
        </Button>
      </div>

      <div className={classNames.others}>
        <div className={classNames.current}>
          {devicesList && devicesList.length > 0 ? (
            <Typography title={classNames.title} variant={'textMedium14'}>
              {t.devices.active}
            </Typography>
          ) : (
            <Typography className={classNames.infoLoggedDevices} variant={'h2'}>
              {t.devices.noLoggedDevices}
            </Typography>
          )}
          <div className={classNames.othersList}>{devicesList}</div>
        </div>
      </div>
    </div>
  )
}
