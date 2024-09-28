export const ROUTES = {
  CREATE: '/create',
  CREATE_NEW_PASSWORD: '/auth/recovery',
  FAVORITES: '/favorites',
  FORGOT_PASSWORD: '/auth/forgotPasswordPage',
  HOME: '/home',
  MESSENGER: '/messenger',
  PRIVACY_POLICY: '/auth/privacyPolicyPage',
  PROFILE: '/profile',
  SEARCH: '/search',
  SETTINGS: '/profile/settings',
  SIGN_IN: '/auth/signInPage',
  SIGN_UP: '/auth/signUpPage',
  STATICS: '/statics',
  TERMS_OF_SERVICE: '/auth/termsOfServicePage',
}

export type AppRoutes = typeof ROUTES

export type AppRoutesValues = AppRoutes[keyof AppRoutes]
