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


export const triggerRegister = createAsyncThunk(
  "user/register", async (data:any, thunkAPI) => {   
    console.log(data) 
     try {
        //const response = await fetch(`url`); //where you want to fetch data
        //Your Axios code part.
        const response = await instance.post(`${data.page}/register/${data.user_id ?? null}`, data);//where you want to fetch data
        return await response;
      } catch (error:any) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});


export const RegistartionSlice = createSlice({
  name: 'mayaRegistration',
  initialState,
  reducers: {        
  },
  extraReducers: (builder) => {
    builder.addCase(triggerRegister.pending, (state) => {
      state.success = '';      
      state.loading = true;
    });
    builder.addCase(triggerRegister.fulfilled, (state, { payload }) => {
      state.success = 'sucess';      
      state.loading = false;
    });
    builder.addCase(triggerRegister.rejected,(state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
 }

})

export const setRegistration = createSelector(
  (state:any) => ({
    register: state.register,
    loading: state.loading,
  }), (state) =>  state
);
export default RegistartionSlice.reducer;

