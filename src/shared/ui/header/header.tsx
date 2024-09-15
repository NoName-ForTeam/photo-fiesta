import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'

import { FlagRussia, FlagUnitedKingdom, MoreHorizontal, OutlineBell } from '@/shared/assets'
import { ROUTES } from '@/shared/config'
import { Button, Select, SelectItem, Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'
import Link from 'next/link'

import styles from './header.module.scss'

type Language = 'en' | 'ru'

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
    const [lang, setLang] = useState<Language>('en')

    const handleChangeLang = (value: Language) => {
      setLang(value)
    }

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
          <Select className={classNames.select} onValueChange={handleChangeLang} value={lang}>
            <SelectItem value={'ru'}>
              <div className={classNames.selectItem}>
                <FlagRussia className={styles.flag} />
                <span className={classNames.lang}>Russian</span>
              </div>
            </SelectItem>
            <SelectItem value={'en'}>
              <div className={classNames.selectItem}>
                <FlagUnitedKingdom className={classNames.flag} />
                <span className={classNames.lang}>English</span>{' '}
              </div>
            </SelectItem>
          </Select>
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
