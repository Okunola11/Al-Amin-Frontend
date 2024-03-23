import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials, logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    studentLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/student",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setTimeout(() => {
            dispatch(logOut());
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useUserLoginMutation,
  useStudentLoginMutation,
  useRefreshMutation,
  useSendLogoutMutation,
} = authApiSlice;
