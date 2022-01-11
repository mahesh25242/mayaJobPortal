import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQry } from "./baseQry";

// Create your service using a base URL and expected endpoints
export const employerApi = createApi({
  reducerPath: "employerApi",
  baseQuery: baseQry(),
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
            url: `v1/employer/register/${employer?.id ?? 0 }`,
            method: 'POST',
            body: employer
            //   headers: {
            //     'content-type': 'text/plain',
            //  },

        }) ,     
    }),
    deleteEmployer: builder.mutation({
      query: (employer) => ({
          url: `v1/employer/${employer.id }`,
          method: 'DELETE',
          body: employer
          //   headers: {
          //     'content-type': 'text/plain',
          //  },

      }) ,     
    }),    
  })
});


export const { useGetEmployersQuery, useSaveEmployerMutation, useDeleteEmployerMutation } = employerApi;

