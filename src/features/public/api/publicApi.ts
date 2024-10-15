import {baseApi} from '@/app/api'
import {API_URLS} from '@/shared/config'

import {GetCountUsers} from "./public.types";

const {
GET_TOTAL_COUNT_USERS
} = API_URLS.PUBLIC_USERS


/**
 * API service for public-page endpoints.
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
