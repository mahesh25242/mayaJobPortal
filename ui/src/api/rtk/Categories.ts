import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQry } from './baseQry';

// Create your service using a base URL and expected endpoints
export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQry(),
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

