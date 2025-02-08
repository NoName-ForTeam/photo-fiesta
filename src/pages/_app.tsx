import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { wrapper } from '@/app/store'
import { Layout } from '@/widgets'
import Head from 'next/head'

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
      <Head>
        <title>Photo Fiesta</title>
        <meta
          content={
            'Photo Fiesta is a place where you can share your photos with your friends and family.'
          }
          name={'description'}
        />
        <link href={'/favicon.jpg'} rel={'icon'} sizes={'32x32'} type={'image/png'} />
      </Head>
      <Layout>
        <Component {...props.pageProps} />
        <ToastContainer />
      </Layout>
    </Provider>
  )
}

export default MyApp
