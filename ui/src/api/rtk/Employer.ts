import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

// Create your service using a base URL and expected endpoints
export const employerApi = createApi({
  reducerPath: "employerApi",
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
    getEmployers: builder.query({
      query: () => ({
          url: `v1/employer`,
        //   headers: {
        //     'content-type': 'text/plain',
        //  },

      }) ,     
    }),
    saveEmployer: builder.mutation({
        query: (employer) => ({
            url: `v1/employer/${employer.id }`,
            method: 'POST',
            body: employer
            //   headers: {
            //     'content-type': 'text/plain',
            //  },

        }) ,     
    }),
    deleteEmployer: builder.mutation({
      query: (employer) => ({
          url: `v1/categories/${employer.id }`,
          method: 'DELETE',
          body: employer
          //   headers: {
          //     'content-type': 'text/plain',
          //  },

      }) ,     
    })
  })
});


export const { useGetEmployersQuery, useSaveEmployerMutation, useDeleteEmployerMutation } = employerApi;

