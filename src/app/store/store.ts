import { baseApi } from '@/app/api'
import { croppSlice } from '@/features/posts/model/croppSlice'
import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

/**
 * Creates and configures the Redux store.
 *
 * This function sets up the Redux store by configuring it with:
 * - Middleware: Combines default middleware with additional middleware from `baseApi`.
 * - Reducers: Combines slices using the `combineSlices` function and adds the `baseApi` reducer.
 *
 * @returns {EnhancedStore} The configured Redux store.
 */

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  croppSlice: croppSlice.reducer,
}

const makeStore = (): EnhancedStore =>
  configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  })

// export an assembled wrapper
export const wrapper = createWrapper<AppStore>(makeStore)

export type AppStore = ReturnType<typeof makeStore>
