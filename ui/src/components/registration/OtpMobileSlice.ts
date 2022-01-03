import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  mobile: string
}

const initialState: CounterState = {
    mobile: '',
}

export const counterSlice = createSlice({
  name: 'otpMobile',
  initialState,
  reducers: {
    setOtpPhone: (state, mobile) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.mobile = mobile.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setOtpPhone } = counterSlice.actions

export default counterSlice.reducer