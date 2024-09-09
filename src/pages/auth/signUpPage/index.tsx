import { SignUp, getAuthLayout } from '@/features'

/**
 * `SignUpPage` is a page component that renders the sign-up form for new users.
 * It utilizes the `SignUp` component to handle user registration.
 *
 * This page is wrapped in the `AuthLayout` to provide a consistent layout that
 * includes a header and other authentication-related elements.
 */

const SignUpPage = () => {
  return <SignUp />
}

export default SignUpPage

/**
 * Associates the `AuthLayout` with the `SignUpPage`, ensuring the page is rendered
 * within the authentication layout. This function is used by Next.js to apply the layout.
 */

SignUpPage.getLayout = getAuthLayout
