import { baseApi } from '@/app/api'
import {
  AuthMeResponse,
  ConfirmRegistration,
  CreateNewPasswordData,
  PasswordRecoveryData,
  ResendLink,
  SignInData,
  SignUpData,
  SuccessSignInResponse,
} from '@/features'
import { API_URLS, METHOD } from '@/shared/config'

/**
 * API service for authentication-related endpoints.
 * This service provides methods for user registration and other authentication tasks.
 */

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      /**
       * Query to fetch authenticated user information.
       * @returns {AuthMeResponse} The authenticated user's information.
       */
      authMe: builder.query<AuthMeResponse, void>({
        providesTags: ['Auth'],
        query: () => API_URLS.AUTH.ME,
      }),
      /**
       * Query to confirm user registration.
       * @param {ConfirmRegistration} params - The confirmation parameters.
       */
      confirmRegistration: builder.query<void, ConfirmRegistration>({
        query: params => ({
          body: params,
          method: METHOD.POST,
          url: API_URLS.AUTH.REGISTRATION_CONFIRMATION,
        }),
      }),
      /**Mutation for user create new password
       *  @param {CreateNewPasswordData} params - The new password data.
       */
      createNewPassword: builder.mutation<void, CreateNewPasswordData>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: METHOD.POST,
          url: API_URLS.AUTH.NEW_PASSWORD,
        }),
      }),
      /**
       * Mutation to log out the current user.
       */
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: METHOD.POST,
          url: API_URLS.AUTH.LOGOUT,
        }),
      }),
      /**
       * Mutation to initiate password recovery process.
       * @param {PasswordRecoveryData} params - The password recovery data.
       */
      passwordRecovery: builder.mutation<void, PasswordRecoveryData>({
        query: params => ({
          body: params,
          method: METHOD.POST,
          url: API_URLS.AUTH.PASSWORD_RECOVERY,
        }),
      }),
      /**
       * Mutation to resend registration confirmation link.
       * @param {ResendLink} params - The resend link parameters.
       */
      resendLink: builder.mutation<void, ResendLink>({
        query: params => ({
          body: params,
          method: METHOD.POST,
          url: API_URLS.AUTH.REGISTRATION_EMAIL_RESENDING,
        }),
      }),
      /**
       * Mutation for user sign-in (login).
       * Sends a POST request to the login endpoint with the provided sign-in data.
       *  @example
       * const [signIn] = useSignInMutation();
       * signIn({ email: 'user@example.com', password: 'password123' });
       */
      signIn: builder.mutation<SuccessSignInResponse, SignInData>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: METHOD.POST,
          url: API_URLS.AUTH.LOGIN,
        }),
      }),
      /**
       * Mutation for user sign-up (registration).
       * Sends a POST request to the registration endpoint with the provided sign-up data.
       * @example
       * const [signUpPage, { isLoading, error }] = useSignUpMutation();
       * signUpPage({ email: 'test@example.com', password: 'password123' });
       */
      signUp: builder.mutation<void, SignUpData>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: METHOD.POST,
          url: API_URLS.AUTH.REGISTRATION,
        }),
      }),
    }
  },
})

export const {
  useAuthMeQuery,
  useConfirmRegistrationQuery,
  useCreateNewPasswordMutation,
  useLazyAuthMeQuery,
  useLogoutMutation,
  usePasswordRecoveryMutation,
  useResendLinkMutation,
  useSignInMutation,
  useSignUpMutation,
} = authApi
