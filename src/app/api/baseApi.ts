import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReAuth } from './baseQueryWithReauth'

export const baseApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Auth', 'Profile'],
})
