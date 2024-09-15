import { CreateNewPassword, getAuthLayout } from '@/features'

/**
 * `CreateNewPasswordPage` is a page component that renders the create new password form for new users.
 * It utilizes the `CreateNewPassword` component to handle user registration.
 */

const CreateNewPasswordPage = () => {
  return <CreateNewPassword />
}

export default CreateNewPasswordPage

/**
 * Associates the `AuthLayout` with the `CreateNewPasswordPage`, ensuring the page is rendered
 * within the authentication layout. This function is used by Next.js to apply the layout.
 */

CreateNewPasswordPage.getLayout = getAuthLayout
