import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import instance from '../axios/Axios';

export interface AuthenticationState {
  user: any,
  loading?: boolean,
  error?: any
}

const initialState: AuthenticationState = {
    user: null,
    loading: false,
    error: null
}


export const checkLogin = createAsyncThunk(
  "user/checkLogin", async (postData:any, thunkAPI) => {    
     try {
        //const response = await fetch(`url`); //where you want to fetch data
        //Your Axios code part.
        const response = await instance.post(`checkLogin`, postData);//where you want to fetch data
        return await response;
      } catch (error:any) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});


export const AuthenticationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {        
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogin.pending, (state) => {
      state.user = [];      
      state.loading = true;
    });
    builder.addCase(checkLogin.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    });
    builder.addCase(checkLogin.rejected,(state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
 }

})

export const getAuth = createSelector(
  (state:any) => ({
    user: state.user,
    loading: state.loading,
  }), (state) =>  state
);
export default AuthenticationSlice.reducer;

