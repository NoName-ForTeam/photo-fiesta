import { API_URLS, METHOD } from '@/shared/config'
import { Storage } from '@/shared/utils'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

const { POST } = METHOD
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: API_URLS.BASE_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    const token = Storage.getToken()

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<
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
        if (Storage.getToken()) {
          const refreshResult = await baseQuery(
            {
              method: POST,
              url: API_URLS.AUTH.UPDATE_TOKENS,
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
