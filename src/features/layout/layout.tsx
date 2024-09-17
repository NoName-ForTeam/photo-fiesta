import { ReactNode } from 'react'

import { useAuthMeQuery } from '@/features'
import { Header } from '@/shared/ui'
import { Sidebars } from '@photo-fiesta/ui-lib'
import { useRouter } from 'next/router'

import style from './layout.module.scss'

/**
 * `Layout` is a layout component that wraps around pages that require authentication.
 * It includes a header with user-specific options and provides a consistent layout
 * for authentication-related pages.
 *
 * @component
 * @param {PropsWithChildren} props - The props object containing child components.
 * @returns {JSX.Element} The `Layout` component containing a header and the child content.
 *
 * @example
 * return (
 *   <Layout>
 *     <SignInPage />
 *   </Layout>
 * )
 */

export const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const isProfilePage = router.pathname.startsWith('/profile')
  const { data: authData } = useAuthMeQuery()
  const isAuthMe = isProfilePage && !!authData

  return (
    <>
      <Header isAuth={isAuthMe} />
      {isAuthMe && <Sidebars />}
      <div className={style.authLayout}>{children}</div>
    </>
  )
}
