import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import instance from '../axios/Axios';

export interface AuthenticationState {
  token: any,
  loading?: boolean | null,
  error?: any
}

const initialState: AuthenticationState = {
    token: null,
    loading: null,
    error: null
}


export const checkLogin = createAsyncThunk(
  "user/checkLogin", async (postData:any = null, thunkAPI) => {    
     try {
        //const response = await fetch(`url`); //where you want to fetch data
        //Your Axios code part.
        let response;
        if(postData){
          instance.defaults.headers.common['Authorization'] = '';
          response = await instance.post(`checkLogin`, postData);//where you want to fetch data
          return await response.data;
        }else{
          let token:any = localStorage.getItem('token');
          token = JSON.parse(token);
          const postData = {
            'grant_type' : 'refresh_token',
            'refresh_token' : `${token.refresh_token}`,
          }
          response = await instance.post(`refreshToken`, postData);//where you want to fetch data
          return await response.data;
        }
        
        
      } catch (error:any) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});


export const AuthenticationSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {        
  },
  extraReducers: (builder) => {
    builder.addCase(checkLogin.pending, (state) => {
      state.token = null;      
      state.loading = true;
    });
    builder.addCase(checkLogin.fulfilled, (state, { payload }) => {
      localStorage.setItem('token', JSON.stringify(payload));
      state.token = payload;
      state.loading = false;
    });
    builder.addCase(checkLogin.rejected,(state, action) => {      
      state.loading = false;
      state.error = action.error.message;
    });
 }

})

export const getAuth = createSelector(
  (state:any) => {
       
    return {
      token: state.token,
      loading: state.loading,
     };
  }, (state) =>  state
);
export default AuthenticationSlice.reducer;

