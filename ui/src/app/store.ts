import { configureStore } from '@reduxjs/toolkit'
import OtpMobileSlice from '../components/registration/OtpMobileSlice';
import registerFormSlice from '../components/registration/registerFormSlice';
import  AuthenticationSlice from '../api/users/AuthenticationSlice';


export const store = configureStore({
  reducer: {
    otpMobile: OtpMobileSlice,
    registerForm: registerFormSlice,
    auth: AuthenticationSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch