import type { AppProps } from 'next/app'

import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import { wrapper } from '@/app/store'
import { useLazyAuthMeQuery } from '@/features'
import { ROUTES } from '@/shared/config'
import { Storage } from '@/shared/utils'
import { Layout } from '@/widgets'
import { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/router'

import '@/app/styles/index.scss'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@photo-fiesta/ui-lib/style.css'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, ...rest }: AppProps) {
  const { props, store } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <AppContent Component={Component} pageProps={props.pageProps} />
    </Provider>
  )
}

type AppContentProps = {
  Component: NextComponentType<NextPageContext, unknown, Record<string, unknown>>
  pageProps: Record<string, unknown>
}

//! DUCT TAPE SOLUTION: needs discussion
function AppContent({ Component, pageProps }: AppContentProps) {
  const router = useRouter()
  const [triggerAuthMe, { isLoading }] = useLazyAuthMeQuery()

  useEffect(() => {
    /**
     * Checks user authentication status.
     * Redirects to sign in page if not authenticated.
     */
    const checkAuth = async () => {
      const token = Storage.getToken()

      //*  work at first render component
      if (!token) {
        //TODO: change to route to public page
        router.push(ROUTES.SIGN_IN)

        return
      }
      //*this case works when the user reloads the tab
      try {
        await triggerAuthMe().unwrap()
      } catch (err: unknown) {
        toast.error('Failed to load profile. You are not authorized.')
        router.push(ROUTES.SIGN_IN)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  )
}

export default MyApp
