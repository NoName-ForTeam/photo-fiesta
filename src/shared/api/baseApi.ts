import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work',
  }),
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Auth'],
})
