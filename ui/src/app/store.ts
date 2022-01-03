import { configureStore } from '@reduxjs/toolkit'
import OtpMobileSlice from '../components/registration/OtpMobileSlice';
export const store = configureStore({
  reducer: {
    otpMobile: OtpMobileSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch