import { PropsWithChildren, ReactNode } from 'react'

import { Header } from '@photo-fiesta/ui-lib'

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

// eslint-disable-next-line react-refresh/only-export-components
const Layout = ({ children }: PropsWithChildren) => {
  //toDO isLoggedIn & onChangeLanguage
  const isLoggedIn = true
  const onChangeLanguage = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(`Language changed to ${value}`)
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onChangeLanguage={onChangeLanguage} />
      <div className={style.authLayout}>{children}</div>
    </>
  )
}

/**
 * `getAuthLayout` is a helper function that applies the `Layout` to a given page.
 *
 * @param {ReactNode} page - The page component to be wrapped by the `Layout`.
 * @returns {JSX.Element} The page component wrapped in the `Layout`.
 *
 * @example
 * SignUpPage.getLayout = getAuthLayout
 */

export const getAuthLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>
}
