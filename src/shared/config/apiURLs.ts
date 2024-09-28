export const API_URLS = {
  AUTH: {
    CHECK_RECOVERY_CODE: 'v1/auth/check-recovery-code',
    LOGIN: 'v1/auth/login',
    LOGOUT: 'v1/auth/logout',
    ME: 'v1/auth/me',
    NEW_PASSWORD: 'v1/auth/new-password',
    PASSWORD_RECOVERY: 'v1/auth/password-recovery',
    REGISTRATION: 'v1/auth/registration',
    REGISTRATION_CONFIRMATION: 'v1/auth/registration-confirmation',
    REGISTRATION_EMAIL_RESENDING: 'v1/auth/registration-email-resending',
    UPDATE_TOKENS: 'v1/auth/update-tokens',
  },
  BASE_URL: 'https://inctagram.work/api/',
  PROFILE: {
    DELETE_AVATAR: 'v1/users/profile/avatar',
    DELETE_PROFILE: 'v1/users/profile',
    DELETE_PROFILE_BY_ID: (id: number) => `v1/users/profile/${id}`,
    GET_PROFILE: 'v1/users/profile',
    POST_AVATAR: 'v1/users/profile/avatar',
    UPDATE_PROFILE: 'v1/users/profile',
  },
}

export const METHOD = {
  DELETE: 'DELETE',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
} as const
