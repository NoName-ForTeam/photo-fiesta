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
 */
SignInPage.getLayout = getAuthLayout
