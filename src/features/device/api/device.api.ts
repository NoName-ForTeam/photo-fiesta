import { baseApi } from '@/app/api'
import { GetSessions } from '@/features/device/api/device.types'
import { API_URLS } from '@/shared/config'

const { DELETE_SESSION_BY_DEVICE_ID, DELETE_SESSION_TEMPLATE_ALL, GET_SESSIONS } = API_URLS.DEVICES

/**
 * API endpoints for managing device sessions.
 */

export const deviceApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      /**
       * Mutation to delete all device sessions.
       */
      deleteAll: builder.mutation<void, void>({
        invalidatesTags: ['Devices'],
        query: () => ({
          method: 'DELETE',
          url: DELETE_SESSION_TEMPLATE_ALL,
        }),
      }),
      /**
       * Mutation to delete a specific session by device ID.
       */
      deleteById: builder.mutation<void, { deviceId: number }>({
        invalidatesTags: ['Devices'],
        query: params => ({
          method: 'DELETE',
          url: DELETE_SESSION_BY_DEVICE_ID(params.deviceId),
        }),
      }),
      /**
       * Query to fetch all active device sessions.
       */
      sessions: builder.query<GetSessions, void>({
        providesTags: ['Devices'],
        query: () => GET_SESSIONS,
      }),
    }
  },
})

export const { useDeleteAllMutation, useDeleteByIdMutation, useSessionsQuery } = deviceApi
