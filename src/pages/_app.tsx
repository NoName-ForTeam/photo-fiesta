import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { Layout } from '@/features'
import { wrapper } from '@/shared/store'

import '@/shared/styles/index.scss'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@photo-fiesta/ui-lib/style.css'
import 'react-toastify/dist/ReactToastify.css'

export default function MyApp({ Component, ...rest }: AppProps) {
  const { props, store } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
        <ToastContainer />
      </Layout>
    </Provider>
  )
}
