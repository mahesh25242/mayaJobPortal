import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import instance from '../axios/Axios';

export interface CategorySliceState {
  categories?: any,  
  loading?: boolean,
  error?: any
}

const initialState: CategorySliceState = {
    categories: null,    
    loading: false,
    error: null
}


export const fetchCategories = createAsyncThunk(
  "category/fetchAll", async (_, thunkAPI) => {    
     try {
        //const response = await fetch(`url`); //where you want to fetch data
        //Your Axios code part.
        const response = await instance.get(`categories`);//where you want to fetch data
        return await response;
      } catch (error:any) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
});


export const CategorySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {        
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categories = [];      
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
      state.loading = false;
    });
    builder.addCase(fetchCategories.rejected,(state, action) => {      
      state.loading = false;
      state.error = action.error.message;
    });
 }

})

export const categoryFetch = createSelector(
  (state:any) => ({
    categories: state.categories,    
    loading: state.loading,
  }), (state) =>  state
);
export default CategorySlice.reducer;

