import { ArrowBackOutline } from '@/shared/assets'
import { ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/utils'
import { Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './privacyPolicy.module.scss'

import { PrivacyList } from './privacyList'

export const PrivacyPolicy = () => {
  const { t } = useTranslation()
  const classNames = {
    container: styles.container,
    link: styles.link,
    signUp: styles.signUp,
    svg: styles.svg,
    terms: styles.terms,
    text: styles.text,
    title: styles.title,
  }

  /**
   * Page with terms of service
   * @component
   * @example
   * <PrivacyPolicy/>
   */

  return (
    <div className={classNames.container}>
      <Link className={classNames.link} href={ROUTES.SIGN_UP}>
        <ArrowBackOutline className={classNames.svg} />
        <Typography className={classNames.signUp}>{t.auth.backToSignUp}</Typography>
      </Link>
      <Typography as={'h1'} className={classNames.title}>
        {t.auth.privacyPolicy}
      </Typography>
      <div className={classNames.terms}>
        <PrivacyList />
      </div>
    </div>
  )
}
