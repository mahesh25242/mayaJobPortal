import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQry } from "./baseQry";

// Create your service using a base URL and expected endpoints
export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: baseQry(),
  tagTypes:["LoggedUser"],
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (user) => ({
          url: `changePassword/`,
          method: 'PUT',
          body: user
          //   headers: {
          //     'content-type': 'text/plain',
          //  },

      }) ,  

    }),
    loggedUser: builder.query({
      query: () => ({
          url: `user`,
        //   headers: {
        //     'content-type': 'text/plain',
        //  },

      }) , 
      
      providesTags: ["LoggedUser"],     
      // invalidatesTags: ["LoggedUser"],
    }),
    setNewPassword: builder.mutation({
      query: (user) => ({
          url: `seNewPassword/`,
          method: 'PUT',
          body: user
          //   headers: {
          //     'content-type': 'text/plain',
          //  },

      }) ,  

    }),   
  })
});


export const { useChangePasswordMutation, useLoggedUserQuery, useSetNewPasswordMutation } = UserApi;

