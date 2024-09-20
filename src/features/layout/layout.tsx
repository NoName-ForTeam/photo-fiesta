import { ReactNode } from 'react'

import { useAuthMeQuery } from '@/features'
import { Header, Sidebar } from '@/shared/ui'

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
  const { data: authData } = useAuthMeQuery()

  const isSuccess = !!authData

  return (
    <>
      <Header isAuth={isSuccess} />
      <div className={style.wrapper}>
        {isSuccess && (
          <div className={style.sidebar}>
            <Sidebar />
          </div>
        )}
        <main className={style.main}>{children}</main>
      </div>
    </>
  )
}
