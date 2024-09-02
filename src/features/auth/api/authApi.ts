import { baseApi } from '@/shared/api'

import { SignUpData } from './auth.types'

/**
 * API service for authentication-related endpoints.
 * This service provides methods for user registration and other authentication tasks.
 *
 * @example
 * const [signUp, { isLoading, error }] = useSignUpMutation();
 * signUp({ email: 'test@example.com', password: 'password123' });
 */

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      /**
       * Mutation for user sign-up (registration).
       * Sends a POST request to the registration endpoint with the provided sign-up data.
       */
      signUp: builder.mutation<void, SignUpData>({
        invalidatesTags: ['Auth'],
        query: params => ({
          body: params,
          method: 'POST',
          url: 'v1/auth/registration',
        }),
      }),
    }
  },
})

export const { useSignUpMutation } = authApi
