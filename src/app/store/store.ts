import { baseApi } from '@/app/api'
import { EnhancedStore, combineSlices, configureStore } from '@reduxjs/toolkit'
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

const makeStore = (): EnhancedStore =>
  configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: combineSlices(baseApi),
  })

// export an assembled wrapper
export const wrapper = createWrapper<AppStore>(makeStore)

export type AppStore = ReturnType<typeof makeStore>
