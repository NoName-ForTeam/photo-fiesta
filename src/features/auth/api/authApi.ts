import { SignUpData } from '@/features/auth/api/auth.types'
import { baseApi } from '@/shared/api'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
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
