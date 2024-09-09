import { baseApi } from '@/shared/api'
import { API_URLS } from '@/shared/config/apiURLs'

import { CreateNewPasswordData, SignUpData } from './auth.types'

/**
 * API service for authentication-related endpoints.
 * This service provides methods for user registration and other authentication tasks.
 *
 * @example
 * const [signUpPage, { isLoading, error }] = useSignUpMutation();
 * signUpPage({ email: 'test@example.com', password: 'password123' });
 */

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      /**Mutation for user create new password */
      createNewPassword: builder.mutation<void, CreateNewPasswordData>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: 'POST',
          url: API_URLS.AUTH.NEW_PASSWORD,
        }),
      }),
      /**
       * Mutation for user sign-up (registration).
       * Sends a POST request to the registration endpoint with the provided sign-up data.
       */
      signUp: builder.mutation<void, SignUpData>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: 'POST',
          url: API_URLS.AUTH.REGISTRATION,
        }),
      }),
    }
  },
})

export const { useCreateNewPasswordMutation, useSignUpMutation } = authApi
