import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQry } from "./baseQry";

// Create your service using a base URL and expected endpoints
export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: baseQry(),
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (user) => ({
          url: `v1/changePassword/`,
          method: 'PUT',
          body: user
          //   headers: {
          //     'content-type': 'text/plain',
          //  },

      }) ,     
    })   
  })
});


export const { useChangePasswordMutation } = UserApi;

