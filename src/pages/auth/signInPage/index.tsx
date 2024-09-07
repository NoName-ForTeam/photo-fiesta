import { SignIn, getAuthLayout } from '@/features'

/**
 * SignInPage component renders the sign-in page of the application.
 * It utilizes the SignIn component to handle user authentication.
 */
const SignInPage = () => {
  return <SignIn />
}

export default SignInPage
/**
 * Applies the authentication layout to the SignInPage component.

 * @example
 * In pages/_app.tsx
 * type NextPageWithLayout = {
 *   getLayout?: (page: ReactElement) => ReactElement
 * }
 * type AppPropsWithLayout = AppProps & {
 *   Component: NextPageWithLayout
 * }
 *
 * export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
 *   const getLayout = Component.getLayout ?? ((page) => page)
 *   return getLayout(<Component {...pageProps} />)
 * }
 */
SignInPage.getLayout = getAuthLayout
