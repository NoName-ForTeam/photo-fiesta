export const ROUTES = {
  CREATE_NEW_PASSWORD: '/auth/recovery',
  FORGOT_PASSWORD: '/auth/forgotPasswordPage',
  HOME: '/homePage',
  PRIVACY_POLICY: '/auth/privacyPolicyPage',
  PROFILE: '/profile',
  SIGN_IN: '/auth/signInPage',
  SIGN_UP: '/auth/signUpPage',
  TERMS_OF_SERVICE: '/auth/termsOfServicePage',
}

export type AppRoutes = typeof ROUTES

export type AppRoutesValues = AppRoutes[keyof AppRoutes]
