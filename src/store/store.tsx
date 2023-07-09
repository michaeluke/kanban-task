import { configureStore } from '@reduxjs/toolkit'
import  ThemeReducer  from './boards/ThemeSlice'
import BoardReducer from './boards/BoardSlice'
export const store = configureStore({
  reducer: {
    Theme: ThemeReducer,
    Boards: BoardReducer,
  },
  devTools: process.env.NODE_ENV !== 'production'
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch