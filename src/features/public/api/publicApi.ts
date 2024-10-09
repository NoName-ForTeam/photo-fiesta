import {baseApi} from '@/app/api'
import {API_URLS} from '@/shared/config'

import {GetCountUsers} from "./public.types";

const {
TOTAL_COUNT_USERS
} = API_URLS.PUBLIC_USERS

export const publicApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getCountUsers: builder.query<GetCountUsers, void>({
            query: () => TOTAL_COUNT_USERS,
        })
    }),
})

export const {
 useGetCountUsersQuery
} = publicApi
