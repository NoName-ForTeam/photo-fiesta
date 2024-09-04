import { PropsWithChildren, ReactNode } from 'react'

import { Header } from '@photo-fiesta/ui-lib'

import style from './authLayout.module.scss'

/**
 * `AuthLayout` is a layout component that wraps around pages that require authentication.
 * It includes a header with user-specific options and provides a consistent layout
 * for authentication-related pages.
 *
 * @component
 * @param {PropsWithChildren} props - The props object containing child components.
 * @returns {JSX.Element} The `AuthLayout` component containing a header and the child content.
 *
 * @example
 * return (
 *   <AuthLayout>
 *     <SignInPage />
 *   </AuthLayout>
 * )
 */

const AuthLayout = ({ children }: PropsWithChildren) => {
  //isLoggedIn & onChangeLanguage is mock data
  const isLoggedIn = true
  const onChangeLanguage = (value: string) => {
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
 * `getAuthLayout` is a helper function that applies the `AuthLayout` to a given page.
 *
 * @param {ReactNode} page - The page component to be wrapped by the `AuthLayout`.
 * @returns {JSX.Element} The page component wrapped in the `AuthLayout`.
 *
 * @example
 * SignUpPage.getLayout = getAuthLayout
 */

export const getAuthLayout = (page: ReactNode) => {
  return <AuthLayout>{page}</AuthLayout>
}
