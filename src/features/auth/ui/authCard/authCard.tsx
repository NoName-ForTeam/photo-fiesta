import { ComponentPropsWithoutRef } from 'react'

import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/shared/assets'
import { Button, Card, Typography } from '@photo-fiesta/ui-lib'
import Link from 'next/link'

import styles from './authCard.module.scss'

type AuthCardProps = {
  footerLinkHref: string
  footerLinkText: string
  footerText: string
  title: string
} & ComponentPropsWithoutRef<typeof Card>

/**
 * AuthCard component for authentication forms
 * @component
 * @example
 * <AuthCard
 *   title="Sign In"
 *   footerText="Don't have an account?"
 *   footerLinkText="Sign Up"
 *   footerLinkHref="/signup"
 * >
 *   <form>
 *     {/* Your form fields here *\/}
 *   </form>
 * </AuthCard>
 */

export const AuthCard = ({
  children,
  footerLinkHref,
  footerLinkText,
  footerText,
  title,
}: AuthCardProps) => {
  const classNames = {
    card: styles.card,
    footer: styles.footer,
    header: styles.header,
    icons: styles.icons,
    links: styles.links,
  } as const

  return (
    <Card className={classNames.card}>
      <div className={classNames.header}>
        <Typography variant={'h1'}>{title}</Typography>
        <div className={classNames.links}>
          <Button asChild variant={'icon-link'}>
            {/**TODO: add link to google*/}
            <Link href={'#'} passHref>
              <GoogleSvgrepoCom1 className={classNames.icons} />
            </Link>
          </Button>
          <Button asChild variant={'icon-link'}>
            {/**TODO: add link to github*/}
            <Link href={'#'} passHref>
              <GithubSvgrepoCom31 className={classNames.icons} />
            </Link>
          </Button>
        </div>
      </div>
      {children}
      <div className={classNames.footer}>
        <Typography variant={'text16'}>{footerText}</Typography>
        <Button asChild variant={'link'}>
          <Link href={footerLinkHref}>{footerLinkText}</Link>
        </Button>
      </div>
    </Card>
  )
}
