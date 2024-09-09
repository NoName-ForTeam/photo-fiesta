import { getAuthLayout } from '@/features'
import { PrivacyPolicy } from '@/features/auth/ui/privacyPolicy/privacyPolicy'

/**
 * `PrivacyPolicyPage` is a page component that renders the privacy policy for users.
 * It utilizes the `PrivacyPolicy` component to display the privacy policy.
 */

const PrivacyPolicyPage = () => {
  return <PrivacyPolicy />
}

export default PrivacyPolicyPage

/**
 * Associates the `AuthLayout` with the `PrivacyPolicyPage`, ensuring the page is rendered
 * within the authentication layout. This function is used by Next.js to apply the layout.
 */

PrivacyPolicyPage.getLayout = getAuthLayout
