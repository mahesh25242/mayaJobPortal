import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQry } from "./baseQry";

// Create your service using a base URL and expected endpoints
export const jobSeekerApi = createApi({
  reducerPath: "jobSeekerApi",
  baseQuery: baseQry(),
  tagTypes:["Seekers"],
  endpoints: (builder) => ({
    getSeekers: builder.query({
      query: () => ({
          url: `seeker/?page=1&per_page=20`,
        //   headers: {
        //     'content-type': 'text/plain',
        //  },

      }) ,  
      providesTags: ["Seekers"],        
    }),
    saveSeeker: builder.mutation({
        query: (employer) => ({
            url: `seeker/register/${employer?.user_id ?? 0 }`,
            method: 'POST',
            body: employer
            //   headers: {
            //     'content-type': 'text/plain',
            //  },

        }) ,  
        invalidatesTags: ["Seekers"],          
    }),
    deleteSeeker: builder.mutation({
      query: (employer) => ({
          url: `seeker/delete/${employer.user_id }`,
          method: 'DELETE',
          body: employer
          //   headers: {
          //     'content-type': 'text/plain',
          //  },

      }) ,    
      invalidatesTags: ["Seekers"],          
    })    
  })
});


export const { useGetSeekersQuery, useSaveSeekerMutation, useDeleteSeekerMutation } = jobSeekerApi;

