import { configureStore } from '@reduxjs/toolkit'
import OtpMobileSlice from '../components/mobileOtp/OtpMobileSlice';
import registerFormSlice from '../components/registration/registerFormSlice';
import  AuthenticationSlice from '../api/users/AuthenticationSlice';
import  RegistartionSlice from '../api/users/RegistartionSlice';

import { useDispatch } from 'react-redux';

import { categoriesApi } from '../api/rtk/Categories';
import { employerApi } from '../api/rtk/Employer';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    otpMobile: OtpMobileSlice,
    registerForm: registerFormSlice,
    token: AuthenticationSlice,
    register: RegistartionSlice,    
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [employerApi.reducerPath]: employerApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(categoriesApi.middleware,employerApi.middleware),
})




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>() 
setupListeners(store.dispatch)