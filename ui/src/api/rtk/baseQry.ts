import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

export const baseQry = () => fetchBaseQuery(
    {
      baseUrl: "http://localhost:8082/v1/", //"https://fiya.in/api/public/v1/" 
      prepareHeaders: (headers, { getState }) => {
          const token = (getState() as RootState).token.token;
      
          // If we have a token set in state, let's assume that we should be passing it.
          if (token) {
            headers.set('authorization', `${token?.token_type} ${token?.access_token}`);
          }
      
          return headers
        },
       
  }
  );

  