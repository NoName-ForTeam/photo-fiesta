import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImageData } from '@/widgets'

const initialState = {
  photos: [] as string[],
  photosForPublish: [] as string[],
  cropp: [] as ImageData[],
  filter: [] as ImageData[],
  publication: [] as ImageData[],
}

export const croppSlice = createSlice({
  name: 'croppSlice',
  initialState,
  reducers: {
    setArrBase64: (state, action: PayloadAction<string | string[]>) => {
      if (typeof action.payload === 'string') {
        state.photos = [...state.photos, action.payload]
      } else {
        state.photos = [...state.photos, ...action.payload]
      }
    },
    setPublishPhotos: (state, action: PayloadAction<string[]>) => {
      state.photos = action.payload
    },
    setFilterState: (state, action: PayloadAction<ImageData[]>) => {
      state.filter = action.payload
    },
    resetCropState: () => initialState,
  },
  selectors: {
    initState: sliceState => sliceState.cropp,
    photosArrString: sliceState => sliceState.photos,
    selectFilterState: sliceState => sliceState.filter,
    selectPhotoForPublish: sliceState => sliceState.photosForPublish,
  },
})

export const { setFilterState, setArrBase64, setPublishPhotos, resetCropState } = croppSlice.actions
export const { photosArrString, selectFilterState } = croppSlice.selectors
