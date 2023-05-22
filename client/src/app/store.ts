import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "./slices/authSlice"
import {apiSlice} from "./slices/apiSlice"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true,
})








// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
