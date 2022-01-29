import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQry } from "./baseQry";

// Create your service using a base URL and expected endpoints
export const SettingApi = createApi({
  reducerPath: "SettingApi",
  baseQuery: baseQry(),
  tagTypes:["Settings", "Banners"],
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => ({
          url: `settings`,
        //   headers: {
        //     'content-type': 'text/plain',
        //  },

      }) ,
      providesTags: ["Settings"],
     
    }),
    banners: builder.query({
      query: () => ({
          url: `banners`,
        //   headers: {
        //     'content-type': 'text/plain',
        //  },

      }) ,
      providesTags: ["Banners"],
     
    }),
    saveSetting: builder.mutation({
      query: (setting) => {
        console.log(setting);
        const formData = new FormData();
        setting.value && formData.append("value", setting.value); 
        setting.id && formData.append("id", setting.id);                 
        return {            
            url: `settings/${setting.id }`,
            method: 'POST',
            body: formData
            //   headers: {
            //     'content-type': 'text/plain',
            //  },

        }
      },    
        invalidatesTags: ["Settings", "Banners"],       
    })   
  })
});


export const { useGetSettingsQuery, useSaveSettingMutation, useBannersQuery } = SettingApi;

