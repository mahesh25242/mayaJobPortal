import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQry } from './baseQry';

// Create your service using a base URL and expected endpoints
export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQry(),
  tagTypes:["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (name: string) => ({
          url: `${name}`,
        //   headers: {
        //     'content-type': 'text/plain',
        //  },

      }) ,
      providesTags: ["Categories"],     
    }),
    saveCategory: builder.mutation({
        query: (category) => ({
            url: `categories/${category.id }`,
            method: 'POST',
            body: category
            //   headers: {
            //     'content-type': 'text/plain',
            //  },

        }) ,  
        invalidatesTags: ["Categories"],   
    }),
    deleteCategory: builder.mutation({
      query: (category) => ({
          url: `categories/${category.id }`,
          method: 'DELETE',
          body: category
          //   headers: {
          //     'content-type': 'text/plain',
          //  },

      }) , 
      invalidatesTags: ["Categories"],    
    })
  })
});


export const { useGetCategoriesQuery, useSaveCategoryMutation, useDeleteCategoryMutation } = categoriesApi;

