import { configureStore } from '@reduxjs/toolkit'
import OtpMobileSlice from '../components/mobileOtp/OtpMobileSlice';
import registerFormSlice from '../components/registration/registerFormSlice';
import  AuthenticationSlice from '../api/users/AuthenticationSlice';
import  RegistartionSlice from '../api/users/RegistartionSlice';
import  CategorySlice from '../api/catgories/CategorySlice';


export const store = configureStore({
  reducer: {
    otpMobile: OtpMobileSlice,
    registerForm: registerFormSlice,
    auth: AuthenticationSlice,
    register: RegistartionSlice,
    categories: CategorySlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch