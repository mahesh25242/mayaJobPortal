import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface registerFormState {
  employer?: any;
  seeker?: any;
}

const initialState: registerFormState = {
  
}

export const RegisterFormSlice = createSlice({
  name: 'registerForm',
  initialState,
  reducers: {
    setRegisterForm: (state, regForm) => {      
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.mobile = mobile.payload      
      return {...state, ...regForm.payload}      
    },
    
  },
})

export const getRegForm = createSelector(
  (state:any) => {       
    return {
      registerForm: state.registerForm,      
     };
  }, (state) =>  state
);


// Action creators are generated for each case reducer function
export const { setRegisterForm } = RegisterFormSlice.actions

export default RegisterFormSlice.reducer