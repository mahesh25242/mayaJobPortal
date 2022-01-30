import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQry } from "./baseQry";

// Create your service using a base URL and expected endpoints
export const employerApi = createApi({
  reducerPath: "employerApi",
  baseQuery: baseQry(),
  tagTypes:["Employers"],
  endpoints: (builder) => ({
    getEmployers: builder.query({
      query: (filters:any = null) => {
        const params = {...{page: 1, per_page: 20},...filters}
        const queryString = new URLSearchParams(params).toString();
        
        return {
            url: `employer?${queryString}`,
          //   headers: {
          //     'content-type': 'text/plain',
          //  },

        };
      } ,
      providesTags: ["Employers"],     
    }),
    saveEmployer: builder.mutation({
        query: (employer) => ({
            url: `employer/register/${employer?.id ?? 0 }`,
            method: 'POST',
            body: employer
            //   headers: {
            //     'content-type': 'text/plain',
            //  },

        }) ,  
        invalidatesTags: ["Employers"],        
    }),
    deleteEmployer: builder.mutation({
      query: (employer) => ({
          url: `employer/delete/${employer.user_id }`,
          method: 'DELETE',
          body: employer
          //   headers: {
          //     'content-type': 'text/plain',
          //  },

      }) ,   
      invalidatesTags: ["Employers"],      
    }),    
  })
});


export const { useGetEmployersQuery, useSaveEmployerMutation, useDeleteEmployerMutation } = employerApi;

