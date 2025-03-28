import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImageData } from '@/widgets'

const initialState = {
  cropp: [{}] as ImageData[],
  filter: [{}] as ImageData[],
  publication: [{}] as ImageData[],
}

export const croppSlice = createSlice({
  name: 'croppSlice',
  initialState,
  reducers: {
    setInitState: (state, action: PayloadAction<string[]>) => {
      console.log('setInitState зашел в редьюсор', action.payload)
      state.cropp = action.payload.map(image => ({
        aspectRatio: { label: 'Original', value: null },
        crop: { height: 100, unit: '%', width: 100, x: 0, y: 0 },
        src: image,
        zoom: 1,
      }))
    },
  },
  selectors: {
    initState: sliceState => sliceState.cropp,
  },
})
