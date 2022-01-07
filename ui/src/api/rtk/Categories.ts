import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

// Create your service using a base URL and expected endpoints
export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery(
      {
        baseUrl: "http://localhost:8000/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).token.token;
        
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
              headers.set('authorization', `${token?.token_type} ${token?.access_token}`);
            }
        
            return headers
          },
         
    }
      ),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (name: string) => ({
          url: `v1/${name}`,
        //   headers: {
        //     'content-type': 'text/plain',
        //  },

      }) ,     
    }),
    saveCategory: builder.mutation({
        query: (category) => ({
            url: `v1/categories/${category.id }`,
            method: 'POST',
            body: category
            //   headers: {
            //     'content-type': 'text/plain',
            //  },

        }) ,     
    }),
    deleteCategory: builder.mutation({
      query: (category) => ({
          url: `v1/categories/${category.id }`,
          method: 'DELETE',
          body: category
          //   headers: {
          //     'content-type': 'text/plain',
          //  },

      }) ,     
    })
  })
});


export const { useGetCategoriesQuery, useSaveCategoryMutation, useDeleteCategoryMutation } = categoriesApi;

