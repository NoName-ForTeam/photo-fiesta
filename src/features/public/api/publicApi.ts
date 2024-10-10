import {baseApi} from '@/app/api'
import {API_URLS} from '@/shared/config'

import {GetCountUsers} from "./public.types";

const {
GET_TOTAL_COUNT_USERS
} = API_URLS.PUBLIC_USERS


/**
 * publicApi - API object for handling public API requests, specifically for
 * retrieving the total number of registered users.
 *
 * This API is integrated using the `baseApi` object and provides a query to fetch
 * the total user count.
 */
export const publicApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        /**
         * Fetches the total number of registered users from the API.
         */
        getCountUsers: builder.query<GetCountUsers, void>({
            query: () => GET_TOTAL_COUNT_USERS,
        })
    }),
})

export const {
 useGetCountUsersQuery
} = publicApi
