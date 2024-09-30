import { ReactNode } from 'react'

import { useAuthMeQuery } from '@/features'
import { Storage } from '@/shared/utils'
import { Header, Sidebar } from '@/widgets'

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

//! Problem with 401 error here
export const Layout = ({ children }: { children: ReactNode }) => {
  const { data: authData } = useAuthMeQuery()

  const isSuccess = !!authData && !!Storage.getToken()

  const classNames = {
    main: style.main,
    wrapper: style.wrapper,
  } as const

  return (
    <>
      <Header isAuth={isSuccess} />
      <div className={classNames.wrapper}>
        {isSuccess && <Sidebar />}
        <main className={classNames.main}>{children}</main>
      </div>
    </>
  )
}
