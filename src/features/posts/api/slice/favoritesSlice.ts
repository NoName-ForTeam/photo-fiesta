import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type FavoritePost = {
  postId: number
}

type FavoritesState = {
  favoritePosts: FavoritePost[]
}

const loadFavoritesFromStorage = (): FavoritesState => {
  if (typeof window === 'undefined') {
    return { favoritePosts: [] }
  }

  const savedFavorites = localStorage.getItem('favoritePosts')

  return savedFavorites ? { favoritePosts: JSON.parse(savedFavorites) } : { favoritePosts: [] }
}

const initialState: FavoritesState = loadFavoritesFromStorage()

const favoritesSlice = createSlice({
  initialState,
  name: 'favorites',
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoritePost>) => {
      const { postId } = action.payload
      const index = state.favoritePosts.findIndex(fav => fav.postId === postId)

      if (index !== -1) {
        // Если пост уже в избранном — удалить его
        state.favoritePosts.splice(index, 1)
      } else {
        // Если поста нет — добавить
        state.favoritePosts.push({ postId })
      }
      localStorage.setItem('favoritePosts', JSON.stringify(state.favoritePosts))
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
