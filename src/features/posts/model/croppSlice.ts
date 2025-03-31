import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImageData } from '@/widgets'

const initialState = {
  photos: [] as string[],
  cropp: [] as ImageData[],
  filter: [] as ImageData[],
  publication: [] as ImageData[],
}

export const croppSlice = createSlice({
  name: 'croppSlice',
  initialState,
  reducers: {
    setPhotosSlice: (state, action: PayloadAction<string | string[]>) => {
      if (typeof action.payload === 'string') {
        state.photos = [...state.photos, action.payload]
      } else {
        state.photos = [...state.photos, ...action.payload]
      }
    },
    setInitState: (state, action: PayloadAction<string[]>) => {
      state.cropp = action.payload.map(image => ({
        aspectRatio: { label: 'Original', value: null },
        crop: { height: 100, unit: '%', width: 100, x: 0, y: 0 },
        src: image,
        zoom: 1,
      }))
    },
    setFilterState: () => {
      /*      state.filter = action.payload.images*/
    },
  },
  selectors: {
    initState: sliceState => sliceState.cropp,
    photosArrString: sliceState => sliceState.photos,
  },
})

export const { setInitState, setFilterState, setPhotosSlice } = croppSlice.actions
export const { initState, photosArrString } = croppSlice.selectors
