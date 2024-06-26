import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://alamin-api.onrender.com/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    //send the refresh token to get new accessToken
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const usernum = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, usernum }));
      // retry the baseQuery with the new accessToken
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.originalStatus === 403) {
        refreshResult.error.data.message = "Your login expired";
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Student", "Result"],
  endpoints: (builder) => ({}),
});
