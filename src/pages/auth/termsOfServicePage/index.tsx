import { TermsOfService } from '@/features/auth/ui/service'

/**
 * `TermsOfServicePage` is a page component that renders the terms of service for users.
 * It utilizes the `TermsOfService` component to display the terms of service.
 */

const TermsOfServicePage = () => {
  return <TermsOfService />
}

export default TermsOfServicePage

/**
 * Associates the `AuthLayout` with the `TermsOfServicePage`, ensuring the page is rendered
 * within the authentication layout. This function is used by Next.js to apply the layout.
 */

TermsOfServicePage.getLayout = TermsOfServicePage
