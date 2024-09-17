import { Storage } from '@/shared/utils/storage'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api/',
  prepareHeaders: headers => {
    const token = Storage.getToken()

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            credentials: 'include',
            method: 'POST',
            url: 'v1/auth/update-tokens',
          },
          api,
          extraOptions
        )

        if (
          typeof refreshResult.data === 'object' &&
          refreshResult.data !== null &&
          'accessToken' in refreshResult.data &&
          refreshResult.data?.accessToken &&
          typeof refreshResult.data?.accessToken === 'string'
        ) {
          Storage.setToken(refreshResult.data.accessToken)
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}