import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQry } from "./baseQry";

// Create your service using a base URL and expected endpoints
export const SettingApi = createApi({
  reducerPath: "SettingApi",
  baseQuery: baseQry(),
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => ({
          url: `v1/settings`,
        //   headers: {
        //     'content-type': 'text/plain',
        //  },

      }) ,     
    }),
    saveSetting: builder.mutation({
        query: (setting) => ({
            url: `v1/settings/${setting.id }`,
            method: 'POST',
            body: setting
            //   headers: {
            //     'content-type': 'text/plain',
            //  },

        }) ,     
    })   
  })
});


export const { useGetSettingsQuery, useSaveSettingMutation } = SettingApi;

