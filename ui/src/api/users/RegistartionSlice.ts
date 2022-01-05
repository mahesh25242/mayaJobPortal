import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import instance from '../axios/Axios';

export interface RegisterationState {
  success: any,
  loading?: boolean,
  error?: any
}

const initialState: RegisterationState = {
    success: null,
    loading: false,
    error: null
}


export const register = createAsyncThunk(
  "user/register", async (postData:any, thunkAPI) => {    
     try {
        //const response = await fetch(`url`); //where you want to fetch data
        //Your Axios code part.
        const response = await instance.post(`register`, postData);//where you want to fetch data
        return await response;
      } catch (error:any) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});


export const RegistartionSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {        
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.success = '';      
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.success = 'sucess';      
      state.loading = false;
    });
    builder.addCase(register.rejected,(state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
 }

})

export const setRegistration = createSelector(
  (state:any) => ({
    user: state.user,
    loading: state.loading,
  }), (state) =>  state
);
export default RegistartionSlice.reducer;

