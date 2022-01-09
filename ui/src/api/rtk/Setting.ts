import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQry } from "./baseQry";

// Create your service using a base URL and expected endpoints
export const SettingApi = createApi({
  reducerPath: "SettingApi",
  baseQuery: baseQry(),
  tagTypes:["Settings"],
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => ({
          url: `v1/settings`,
        //   headers: {
        //     'content-type': 'text/plain',
        //  },

      }) ,
      providesTags: ["Settings"],
     
    }),
    saveSetting: builder.mutation({
        query: (setting) => ({
            url: `v1/settings/${setting.id }`,
            method: 'PUT',
            body: setting
            //   headers: {
            //     'content-type': 'text/plain',
            //  },

        }) ,  
        invalidatesTags: ["Settings"],       
    })   
  })
});


export const { useGetSettingsQuery, useSaveSettingMutation } = SettingApi;

