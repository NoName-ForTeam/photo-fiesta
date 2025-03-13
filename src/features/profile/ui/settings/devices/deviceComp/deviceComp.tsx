import { Device, useDeleteByIdMutation } from '@/features'
import { Chrome, LogOut, PC, Phone } from '@/shared/assets'
import { formatDateTo, useTranslation } from '@/shared/utils'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import styles from 'src/features/profile/ui/settings/devices/deviceComp/deviceComp.module.scss'

type DeviceCompProps = {
  device: Device
  other?: boolean
}

/**
 * A React component that displays device information with the option to log out from a session.
 * @param {DeviceComp} device - The device object containing details such as device type, name, browser name, IP, and last active time.
 * @param {boolean} [other=false] - Indicates whether the device is an "other" device (not the current session).
 */

export const DeviceComp = ({ device, other = false }: DeviceCompProps) => {
  const { t } = useTranslation()
  const [logout] = useDeleteByIdMutation()
  const { locale } = useRouter()
  const isLangRu = locale === 'ru'

  const classNames = {
    btn: clsx(styles.btn, { [styles.langRu]: isLangRu }),
    container: styles.container,
    dataLastVisit: styles.dataLastVisit,
    deviceInfo: styles.deviceInfo,
    icon: styles.icon,
    info: clsx(styles.info, { [styles.langRu]: isLangRu }),
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
          <div className={classNames.deviceInfo}>
            <Typography className={classNames.title} variant={'textBold16'}>
              {deviceTitle}
            </Typography>
            <div className={classNames.info}>
              <Typography variant={'text14'}>IP: {device?.ip}</Typography>
              {other && (
                <Typography variant={'textSmall'}>
                  {t.devices.visit} {formatDateTo(device?.lastActive)}
                </Typography>
              )}
            </div>
          </div>
        </div>

        {other && (
          <Button className={classNames.btn} onClick={logoutHandler} variant={'link'}>
            <LogOut />
            <Typography variant={'textMedium14'}>Log Out</Typography>
          </Button>
        )}
      </div>
    </div>
  )
}
