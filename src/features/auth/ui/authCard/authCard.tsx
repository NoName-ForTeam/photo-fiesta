import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/shared/assets'
import { API_URLS } from '@/shared/config'
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
    footerTitle: styles.footerTitle,
    header: styles.header,
    icons: styles.icons,
    link: styles.link,
    links: styles.links,
    title: styles.title,
  } as const

  const [githubAuthUrl, setGithubAuthUrl] = useState<string>('#')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const redirectUrl = encodeURIComponent(`${window.location.origin}/auth/auth-callback`)

      setGithubAuthUrl(API_URLS.GITHUB_OAUTH2(redirectUrl))
    }
  }, [])

  return (
    <Card className={classNames.card}>
      <div className={classNames.header}>
        <Typography className={classNames.title} variant={'h1'}>
          {title}
        </Typography>
        <div className={classNames.links}>
          <Button asChild variant={'icon-link'}>
            {/**TODO: add link to google*/}
            <Link href={'#'} passHref>
              <GoogleSvgrepoCom1 className={classNames.icons} />
            </Link>
          </Button>
          <Button asChild variant={'icon-link'}>
            {/**TODO: add link to github*/}
            <Link href={githubAuthUrl} passHref>
              <GithubSvgrepoCom31 className={classNames.icons} />
            </Link>
          </Button>
        </div>
      </div>
      {children}
      <div className={classNames.footer}>
        <Typography className={classNames.footerTitle} variant={'text16'}>
          {footerText}
        </Typography>
        <Button asChild variant={'link'}>
          <Link className={classNames.link} href={footerLinkHref}>
            {footerLinkText}
          </Link>
        </Button>
      </div>
    </Card>
  )
}
