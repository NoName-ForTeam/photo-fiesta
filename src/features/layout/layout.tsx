import { ReactNode } from 'react'

import { Header, Sidebars } from '@photo-fiesta/ui-lib'
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
  // const { data: isAuthMe, isLoading } = useAuthMeQuery()
  const router = useRouter()

  //toDO isLoggedIn & onChangeLanguage
  const isLoggedIn = true
  const onChangeLanguage = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(`Language changed to ${value}`)
  }
  const isProfilePage = router.pathname.startsWith('/profile')

  //   // Обрабатываем состояния загрузки и ошибок
  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onChangeLanguage={onChangeLanguage} />
      {isLoggedIn && isProfilePage && <Sidebars />}
      <div className={style.authLayout}>{children}</div>
    </>
  )
}
