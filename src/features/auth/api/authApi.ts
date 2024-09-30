import { baseApi } from '@/app/api'
import {
  AuthMeResponse,
  CheckRecoveryCodeRequest,
  CheckRecoveryCodeResponse,
  ConfirmRegistration,
  CreateNewPasswordData,
  PasswordRecoveryData,
  ResendLink,
  SignInData,
  SignUpData,
  SuccessSignInResponse,
  UpdateTokens,
} from '@/features'
import { API_URLS, METHOD } from '@/shared/config'

const { POST } = METHOD

const {
  CHECK_RECOVERY_CODE,
  LOGIN,
  LOGOUT,
  ME,
  NEW_PASSWORD,
  PASSWORD_RECOVERY,
  REGISTRATION,
  REGISTRATION_CONFIRMATION,
  REGISTRATION_EMAIL_RESENDING,
  UPDATE_TOKENS,
} = API_URLS.AUTH
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
        query: () => ME,
      }),
      /**
       *  check recovery code for valid
       * @param {CheckRecoveryCodeRequest} params - The recovery code parameters.
       */
      checkRecoveryCode: builder.query<CheckRecoveryCodeResponse, CheckRecoveryCodeRequest>({
        query: params => ({
          body: params,
          method: POST,
          url: CHECK_RECOVERY_CODE,
        }),
      }),
      /**
       * Query to confirm user registration.
       * @param {ConfirmRegistration} params - The confirmation parameters.
       */
      confirmRegistration: builder.query<void, ConfirmRegistration>({
        query: params => ({
          body: params,
          method: POST,
          url: REGISTRATION_CONFIRMATION,
        }),
      }),
      /**Mutation for user create new password
       *  @param {CreateNewPasswordData} params - The new password data.
       */
      createNewPassword: builder.mutation<void, CreateNewPasswordData>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: POST,
          url: NEW_PASSWORD,
        }),
      }),
      /**
       * Mutation to log out the current user.
       * in cookie client must send correct refresh Token that will be revoked after refreshing
       */
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          credentials: 'include',
          method: POST,
          url: LOGOUT,
        }),
      }),
      /**
       * Mutation to initiate password recovery process.
       * email should be sent with Recovery Code inside
       * @param {PasswordRecoveryData} params - The password recovery data.
       */
      passwordRecovery: builder.mutation<void, PasswordRecoveryData>({
        query: params => ({
          body: params,
          method: POST,
          url: PASSWORD_RECOVERY,
        }),
      }),
      /**
       * Mutation to resend registration confirmation link.
       * resend confirmation registration email if user exists
       * @param {ResendLink} params - The resend link parameters.
       */
      resendLink: builder.mutation<void, ResendLink>({
        query: params => ({
          body: params,
          method: POST,
          url: REGISTRATION_EMAIL_RESENDING,
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
          method: POST,
          url: LOGIN,
        }),
      }),
      /**
       * Mutation for user sign-up (registration).
       * email with confirmation code should be sent to passed email address
       * Sends a POST request to the registration endpoint with the provided sign-up data.
       * @example
       * const [signUpPage, { isLoading, error }] = useSignUpMutation();
       * signUpPage({ email: 'test@example.com', password: 'password123' });
       */
      signUp: builder.mutation<void, SignUpData>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: POST,
          url: REGISTRATION,
        }),
      }),
      /**
       * Mutation to update access tokens.
       *'Generate new pair of access and refresh tokens (in cookie client must send correct refresh Token that will be revoked after refreshing) Device LastActiveDate should\n' + 'be overrode by issued Date of new refresh token',
       */
      updateTokens: builder.mutation<void, UpdateTokens>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: POST,
          url: UPDATE_TOKENS,
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
