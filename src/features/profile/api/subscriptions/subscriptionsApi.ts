import { baseApi } from '@/app/api'
import { API_URLS, METHOD } from '@/shared/config'

import {
  RequestSubscription,
  ResponseCostPayment,
  ResponseCurrentPayment,
  ResponseMyPayments,
  ResponseSubscription,
} from './subscriptions.types'

const { POST } = METHOD

const {
  GET_MY_PAYMENTS,
  GET_SUBSCRIPTIONS_COST_PAYMENT,
  GET_SUBSCRIPTIONS_CURRENT_PAYMENT,
  POST_SUBSCRIPTIONS,
  POST_SUBSCRIPTIONS_CANCEL_AUTO_RENEWAL,
} = API_URLS.SUBSCRIPTIONS

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCostPayment: builder.query<ResponseCostPayment, void>({
      providesTags: ['Subscriptions'],
      query: () => GET_SUBSCRIPTIONS_COST_PAYMENT,
    }),
    getCurrentPayment: builder.query<ResponseCurrentPayment, void>({
      providesTags: ['Subscriptions'],
      query: () => GET_SUBSCRIPTIONS_CURRENT_PAYMENT,
    }),

    getMyPayments: builder.query<ResponseMyPayments, void>({
      providesTags: ['Subscriptions'],
      query: () => GET_MY_PAYMENTS,
    }),

    postCancelAutoRenewal: builder.mutation<void, void>({
      invalidatesTags: ['Subscriptions'],
      query: () => ({
        method: POST,
        url: POST_SUBSCRIPTIONS_CANCEL_AUTO_RENEWAL,
      }),
    }),

    postSubscription: builder.mutation<ResponseSubscription, RequestSubscription>({
      invalidatesTags: ['Subscriptions'],
      query: params => ({
        body: params,
        method: POST,
        url: POST_SUBSCRIPTIONS,
      }),
    }),
  }),
})

export const {
  useGetCostPaymentQuery,
  useGetCurrentPaymentQuery,
  useGetMyPaymentsQuery,
  usePostCancelAutoRenewalMutation,
  usePostSubscriptionMutation,
} = subscriptionsApi
