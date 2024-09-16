import { baseApi } from '@/shared/api'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
  configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: combineSlices(baseApi),
  })

// export an assembled wrapper
export const wrapper = createWrapper<AppStore>(makeStore)

export type AppStore = ReturnType<typeof makeStore>
