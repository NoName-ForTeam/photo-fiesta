import { useDeleteByIdMutation } from '@/features/device/api/device.api'
import { DeviceType } from '@/features/device/api/device.types'
import { Chrome, LogOut, PC, Phone } from '@/shared/assets'
import { formatDateTo, useTranslation } from '@/shared/utils'
import { Button, Typography } from '@photo-fiesta/ui-lib'

import styles from './device.module.scss'

type Props = {
  device: DeviceType
  other?: boolean
}

/**
 * A React component that displays device information with the option to log out from a session.
 * @param {DeviceType} device - The device object containing details such as device type, name, browser name, IP, and last active time.
 * @param {boolean} [other=false] - Indicates whether the device is an "other" device (not the current session).
 */

export const Device = ({ device, other = false }: Props) => {
  const { t } = useTranslation()
  const [logout] = useDeleteByIdMutation()
  const classNames = {
    btn: styles.btn,
    container: styles.container,
    icon: styles.icon,
    info: styles.info,
    leftSide: styles.leftSide,
    title: styles.title,
    wrapper: styles.wrapper,
  } as const

  let DeviceIcon

  if (device?.deviceType === 'mobile') {
    DeviceIcon = Phone
  } else if (device?.deviceType === 'desktop') {
    DeviceIcon = PC
  } else {
    DeviceIcon = Chrome
  }
  const deviceTitle = other && device.deviceName ? device.deviceName : device.browserName

  const logoutHandler = () => {
    logout({ deviceId: device.deviceId })
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.wrapper}>
        <div className={classNames.leftSide}>
          <div className={classNames.icon}>
            <DeviceIcon />
          </div>
          <div>
            <Typography className={classNames.title} variant={'textBold16'}>
              {deviceTitle}
            </Typography>
            <div className={classNames.info}>
              <Typography variant={'text14'}>IP: {device?.ip}</Typography>
              {other && (
                <Typography variant={'text14'}>
                  {t.devices.visit} {formatDateTo(device?.lastActive)}
                </Typography>
              )}
            </div>
          </div>
        </div>

        {other && (
          <div>
            <Button className={classNames.btn} onClick={logoutHandler} variant={'ghost'}>
              <LogOut />
              <Typography variant={'textMedium14'}>Log Out</Typography>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
