import { configureStore } from '@reduxjs/toolkit'
import OtpMobileSlice from '../components/registration/OtpMobileSlice';
import registerFormSlice from '../components/registration/registerFormSlice';

export const store = configureStore({
  reducer: {
    otpMobile: OtpMobileSlice,
    registerForm: registerFormSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch