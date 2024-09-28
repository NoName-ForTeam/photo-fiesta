import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { MoreHorizontal, OutlineBell } from '@/shared/assets'
import { ROUTES } from '@/shared/config'
import { LanguageSelect } from '@/shared/ui'
import { Button, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Link from 'next/link'

import styles from './header.module.scss'

export type HeaderProps = {
  isAuth?: boolean
} & ComponentPropsWithoutRef<'div'>

/**
 * Header component for the Photo Fiesta application.
 *
 * @component
 * @example
 *       <Header isAuth={true} className="custom-header" />
 */

export const Header = forwardRef<ElementRef<'div'>, HeaderProps>(
  ({ className, isAuth = true, ...rest }, ref) => {
    const classNames = {
      bell: styles.bell,
      buttonsContainer: styles.buttonsContainer,
      flag: styles.flag,
      header: clsx(styles.header, className),
      lang: styles.lang,
      loginButtons: styles.loginButtons,
      logo: styles.logo,
      more: styles.more,
      select: styles.select,
      selectItem: styles.selectItem,
    } as const

    return (
      <div className={classNames.header} ref={ref} {...rest}>
        <Link className={classNames.logo} href={ROUTES.HOME}>
          <Typography variant={'textLarge'}>Photo Fiesta</Typography>
        </Link>
        <div className={classNames.buttonsContainer}>
          {/**TODO: add dropdown menu using icon for desktop*/}
          {isAuth && <OutlineBell className={classNames.bell} />}
          <LanguageSelect className={classNames.select} />
          {/**TODO: add dropdown menu using icon for mobile*/}
          {isAuth && <MoreHorizontal className={classNames.more} />}
          {!isAuth && (
            <div className={classNames.loginButtons}>
              <Button asChild variant={'link'}>
                <Link href={ROUTES.SIGN_IN}>Log in</Link>
              </Button>
              <Button asChild variant={'primary'}>
                <Link href={ROUTES.SIGN_UP}>Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
)
