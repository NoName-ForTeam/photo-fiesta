import { baseApi } from '@/shared/api'

import { SignInData, SignUpData, SuccessSignInResponse } from './auth.types'

/**
 * API service for authentication-related endpoints.
 * This service provides methods for user registration and other authentication tasks.
 */

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
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
          method: 'POST',
          //TODO: add url constant
          url: 'v1/auth/login',
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
          method: 'POST',
          //TODO: add url constant
          url: 'v1/auth/registration',
        }),
      }),
    }
  },
})

export const { useSignInMutation, useSignUpMutation } = authApi
