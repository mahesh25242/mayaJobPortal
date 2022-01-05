import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface OtpMobileState {
  mobile: string,
  page: string,
}

const initialState: OtpMobileState = {
    mobile: '',
    page: '',
}

export const otpMobileSlice = createSlice({
  name: 'otpMobile',
  initialState,
  reducers: {
    setOtpPhone: (state, mobile) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {...state, ...mobile.payload}      
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setOtpPhone } = otpMobileSlice.actions

export default otpMobileSlice.reducer