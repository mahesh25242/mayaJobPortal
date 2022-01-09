import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQry } from "./baseQry";

// Create your service using a base URL and expected endpoints
export const jobSeekerApi = createApi({
  reducerPath: "jobSeekerApi",
  baseQuery: baseQry(),
  endpoints: (builder) => ({
    getSeekers: builder.query({
      query: () => ({
          url: `v1/seeker`,
        //   headers: {
        //     'content-type': 'text/plain',
        //  },

      }) ,     
    }),
    saveSeeker: builder.mutation({
        query: (employer) => ({
            url: `v1/seeker/${employer.id }`,
            method: 'POST',
            body: employer
            //   headers: {
            //     'content-type': 'text/plain',
            //  },

        }) ,     
    }),
    deleteSeeker: builder.mutation({
      query: (employer) => ({
          url: `v1/seeker/${employer.id }`,
          method: 'DELETE',
          body: employer
          //   headers: {
          //     'content-type': 'text/plain',
          //  },

      }) ,     
    })    
  })
});


export const { useGetSeekersQuery, useSaveSeekerMutation, useDeleteSeekerMutation } = jobSeekerApi;

